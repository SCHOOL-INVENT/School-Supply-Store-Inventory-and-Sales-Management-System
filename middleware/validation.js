function fail(res, field, message) {
  return res.status(422).json({
    status: 422,
    data: null,
    error: message,
    field
  });
}

const allowedSupplyFields = ["name", "category", "quantity", "unitPrice", "status", "supplierId"];

function validateSupply(body, res, partial) {
  const data = body && typeof body === "object" && !Array.isArray(body) ? body : null;
  if (!data) return fail(res, "body", "Request body must be a JSON object");

  const unknown = Object.keys(data).find((key) => !allowedSupplyFields.includes(key));
  if (unknown) return fail(res, unknown, `Unknown field: ${unknown}`);

  if (!partial) {
    for (const field of ["name", "category", "quantity", "unitPrice", "status"]) {
      if (data[field] === undefined || data[field] === null || data[field] === "") {
        return fail(res, field, `${field} is required`);
      }
    }
  }

  if (partial && Object.keys(data).length === 0) {
    return fail(res, "body", "At least one field is required for update");
  }

  if (
    data.name !== undefined &&
    (typeof data.name !== "string" || data.name.trim().length < 2 || data.name.trim().length > 100)
  ) {
    return fail(res, "name", "name must be a string from 2 to 100 characters");
  }

  if (
    data.category !== undefined &&
    (typeof data.category !== "string" || data.category.trim().length < 2 || data.category.trim().length > 50)
  ) {
    return fail(res, "category", "category must be a string from 2 to 50 characters");
  }

  if (
    data.quantity !== undefined &&
    (!Number.isInteger(data.quantity) || data.quantity < 0 || data.quantity > 9999)
  ) {
    return fail(res, "quantity", "quantity must be an integer from 0 to 9999");
  }

  if (
    data.unitPrice !== undefined &&
    (
      typeof data.unitPrice !== "number" ||
      !Number.isFinite(data.unitPrice) ||
      data.unitPrice < 0 ||
      Math.round(data.unitPrice * 100) !== data.unitPrice * 100
    )
  ) {
    return fail(res, "unitPrice", "unitPrice must be a non-negative number with up to 2 decimals");
  }

  if (
    data.status !== undefined &&
    !["in-stock", "low-stock", "out-of-stock"].includes(data.status)
  ) {
    return fail(res, "status", "status must be in-stock, low-stock, or out-of-stock");
  }

  if (
    data.supplierId !== undefined &&
    (!Number.isInteger(data.supplierId) || data.supplierId < 1)
  ) {
    return fail(res, "supplierId", "supplierId must be a positive integer");
  }

  return null;
}

function validateCreateSupply(req, res, next) {
  const error = validateSupply(req.body, res, false);
  if (error) return error;
  req.validatedBody = req.body;
  next();
}

function validateUpdateSupply(req, res, next) {
  const error = validateSupply(req.body, res, true);
  if (error) return error;
  req.validatedBody = req.body;
  next();
}

function validateParty(req, res, next, label) {
  const body = req.body;
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return fail(res, "body", "Request body must be a JSON object");
  }

  const allowed = ["name", "contact", "email", "address"];
  const unknown = Object.keys(body).find((key) => !allowed.includes(key));
  if (unknown) return fail(res, unknown, `Unknown field: ${unknown}`);

  for (const field of ["name", "contact"]) {
    if (typeof body[field] !== "string" || !body[field].trim()) {
      return fail(res, field, `${field} is required`);
    }
    if (body[field].trim().length > 100) {
      return fail(res, field, `${field} must not exceed 100 characters`);
    }
  }

  if (
    body.email !== undefined &&
    (typeof body.email !== "string" || body.email.length > 150 || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(body.email.trim()))
  ) {
    return fail(res, "email", "email must be a valid email address");
  }

  if (body.address !== undefined && (typeof body.address !== "string" || body.address.length > 255)) {
    return fail(res, "address", "address must be a string of at most 255 characters");
  }

  req.validatedBody = body;
  next();
}

function validateCustomer(req, res, next) {
  return validateParty(req, res, next, "customer");
}

function validateSupplier(req, res, next) {
  return validateParty(req, res, next, "supplier");
}

function validateSale(req, res, next) {
  const body = req.body;
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return fail(res, "body", "Request body must be a JSON object");
  }

  if (!Array.isArray(body.items) || body.items.length === 0) {
    return fail(res, "items", "At least one sale item is required");
  }

  for (let index = 0; index < body.items.length; index += 1) {
    const item = body.items[index];
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      return fail(res, `items[${index}]`, "Sale item must be an object");
    }

    if (!Number.isInteger(item.productId) || item.productId < 1) {
      return fail(
        res,
        `items[${index}].productId`,
        `items[${index}].productId must be a positive integer`
      );
    }

    if (!Number.isInteger(item.quantity) || item.quantity < 1) {
      return fail(
        res,
        `items[${index}].quantity`,
        `items[${index}].quantity must be a positive integer`
      );
    }
  }

  if (
    body.customerId !== undefined &&
    (!Number.isInteger(body.customerId) || body.customerId < 1)
  ) {
    return fail(res, "customerId", "customerId must be a positive integer");
  }

  req.validatedBody = body;
  next();
}

module.exports = {
  validateCreateSupply,
  validateUpdateSupply,
  validateCustomer,
  validateSupplier,
  validateSale
};
