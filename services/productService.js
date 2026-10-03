function statusFor(quantity) {
  if (quantity === 0) return "out-of-stock";
  if (quantity <= 10) return "low-stock";
  return "in-stock";
}

function prepareForCreate(input) {
  return { ...input, status: statusFor(input.quantity) };
}

function prepareForUpdate(current, changes) {
  const merged = { ...current, ...changes };
  return { ...merged, status: statusFor(merged.quantity) };
}

module.exports = { statusFor, prepareForCreate, prepareForUpdate };
