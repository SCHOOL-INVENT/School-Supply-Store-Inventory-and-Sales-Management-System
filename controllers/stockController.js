const { withTransaction, pool, initDatabase, statusFor } = require("../data/database");

function httpError(status, message, field = null) {
  const error = new Error(message);
  error.statusCode = status;
  error.field = field;
  return error;
}

async function changeStock(req, res, type) {
  const productId = Number(req.body?.productId);
  const quantity = Number(req.body?.quantity);
  const reference = req.body?.reference ? String(req.body.reference).trim().slice(0, 255) : null;

  if (!Number.isInteger(productId) || productId < 1) {
    return res.status(422).json({status:422,data:null,error:"productId must be a positive integer",field:"productId"});
  }
  if (!Number.isInteger(quantity) || quantity < 1) {
    return res.status(422).json({status:422,data:null,error:"quantity must be a positive integer",field:"quantity"});
  }

  try {
    const result = await withTransaction(async connection => {
      const [rows] = await connection.execute(
        "SELECT id,name,quantity FROM products WHERE id=? FOR UPDATE",
        [productId]
      );
      const product = rows[0];
      if (!product) throw httpError(404, "Product not found", "productId");

      let next = Number(product.quantity);
      if (type === "OUT") {
        if (next < quantity) throw httpError(422, "Insufficient stock for " + product.name, "quantity");
        next -= quantity;
      } else {
        next += quantity;
        if (next > 9999) throw httpError(422, "Resulting quantity cannot exceed 9999", "quantity");
      }

      await connection.execute(
        "UPDATE products SET quantity=?,status=? WHERE id=?",
        [next, statusFor(next), productId]
      );
      const [tx] = await connection.execute(
        "INSERT INTO stock_transactions(product_id,user_id,type,quantity,reference) VALUES(?,?,?,?,?)",
        [productId, req.user?.id || null, type, quantity, reference]
      );
      const [updated] = await connection.execute(
        "SELECT id,name,category,quantity,unit_price unitPrice,status,supplier_id supplierId FROM products WHERE id=?",
        [productId]
      );
      return {product: updated[0], transactionId: Number(tx.insertId)};
    });

    return res.status(200).json({status:200,data:result,error:null});
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        status:error.statusCode,data:null,error:error.message,field:error.field||null
      });
    }
    throw error;
  }
}

async function stockIn(req,res){ return changeStock(req,res,"IN"); }
async function stockOut(req,res){ return changeStock(req,res,"OUT"); }

async function listTransactions(req,res) {
  await initDatabase();
  const rawLimit = Number(req.query.limit || 50);
  const limit = Number.isInteger(rawLimit) ? Math.min(Math.max(rawLimit,1),200) : 50;
  const [rows] = await pool.execute(
    "SELECT st.id,st.product_id productId,p.name productName,st.user_id userId,st.type,st.quantity,st.reference,st.created_at createdAt FROM stock_transactions st JOIN products p ON p.id=st.product_id ORDER BY st.id DESC LIMIT " + limit
  );
  return res.status(200).json({status:200,data:rows,error:null});
}

module.exports={stockIn,stockOut,listTransactions};
