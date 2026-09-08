function fail(res, field, message) { return res.status(422).json({ status: 422, data: null, error: message, field }); }
const allowedSupplyFields = ["name", "category", "quantity", "unitPrice", "status", "supplierId"];
function validateSupply(body, res, partial) {
  const data = body && typeof body === "object" && !Array.isArray(body) ? body : null;
  if (!data) return fail(res, "body", "Request body must be a JSON object");
  const unknown = Object.keys(data).find(k => !allowedSupplyFields.includes(k)); if (unknown) return fail(res, unknown, `Unknown field: ${unknown}`);
  if (!partial) for (const f of ["name","category","quantity","unitPrice","status"]) if (data[f] === undefined || data[f] === null || data[f] === "") return fail(res, f, `${f} is required`);
  if (partial && Object.keys(data).length === 0) return fail(res, "body", "At least one field is required for update");
  if (data.name !== undefined && (typeof data.name !== "string" || data.name.trim().length < 2 || data.name.trim().length > 100)) return fail(res,"name","name must be a string from 2 to 100 characters");
  if (data.category !== undefined && (typeof data.category !== "string" || data.category.trim().length < 2 || data.category.trim().length > 50)) return fail(res,"category","category must be a string from 2 to 50 characters");
  if (data.quantity !== undefined && (!Number.isInteger(data.quantity) || data.quantity < 0 || data.quantity > 9999)) return fail(res,"quantity","quantity must be an integer from 0 to 9999");
  if (data.unitPrice !== undefined && (typeof data.unitPrice !== "number" || !Number.isFinite(data.unitPrice) || data.unitPrice < 0 || Math.round(data.unitPrice*100)!==data.unitPrice*100)) return fail(res,"unitPrice","unitPrice must be a non-negative number with up to 2 decimals");
  if (data.status !== undefined && !["in-stock","low-stock","out-of-stock"].includes(data.status)) return fail(res,"status","status must be in-stock, low-stock, or out-of-stock");
  if (data.supplierId !== undefined && (!Number.isInteger(data.supplierId) || data.supplierId < 1)) return fail(res,"supplierId","supplierId must be a positive integer");
  return null;
}
function validateCreateSupply(req,res,next){const e=validateSupply(req.body,res,false);if(e)return e;req.validatedBody=req.body;next();}
function validateUpdateSupply(req,res,next){const e=validateSupply(req.body,res,true);if(e)return e;req.validatedBody=req.body;next();}
function validateCustomer(req,res,next){const b=req.body;if(!b||typeof b!=="object"||Array.isArray(b))return fail(res,"body","Request body must be a JSON object");for(const f of ["name","contact"])if(typeof b[f]!=="string"||!b[f].trim())return fail(res,f,`${f} is required`);req.validatedBody=b;next();}
function validateSupplier(req,res,next){const b=req.body;if(!b||typeof b!=="object"||Array.isArray(b))return fail(res,"body","Request body must be a JSON object");for(const f of ["name","contact"])if(typeof b[f]!=="string"||!b[f].trim())return fail(res,f,`${f} is required`);req.validatedBody=b;next();}
function validateSale(req,res,next){const b=req.body;if(!b||typeof b!=="object"||Array.isArray(b))return fail(res,"body","Request body must be a JSON object");if(!Array.isArray(b.items)||b.items.length===0)return fail(res,"items","At least one sale item is required");for(let i=0;i<b.items.length;i++){const x=b.items[i];if(!Number.isInteger(x.productId)||x.productId<1)return fail(res,`items[${i}].productId`,`items[${i}].productId must be a positive integer`);if(!Number.isInteger(x.quantity)||x.quantity<1)return fail(res,`items[${i}].quantity`,`items[${i}].quantity must be a positive integer`);}if(b.customerId!==undefined&&(!Number.isInteger(b.customerId)||b.customerId<1))return fail(res,"customerId","customerId must be a positive integer");req.validatedBody=b;next();}
module.exports={validateCreateSupply,validateUpdateSupply,validateCustomer,validateSupplier,validateSale};
