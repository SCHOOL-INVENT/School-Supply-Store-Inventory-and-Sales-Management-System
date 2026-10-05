function makeCrud({ data, label }) {
  return {
    async list(req, res) {
      return res.status(200).json({ status: 200, data: await data.findAll(), error: null });
    },
    async get(req, res) {
      const item = await data.findById(req.params.id);
      if (!item) return res.status(404).json({ status: 404, data: null, error: label + " not found", field: "id" });
      return res.status(200).json({ status: 200, data: item, error: null });
    },
    async create(req, res) {
      const item = await data.save(req.validatedBody || req.body);
      return res.status(201).json({ status: 201, data: item, error: null });
    },
    async update(req, res) {
      const existing = await data.findById(req.params.id);
      if (!existing) return res.status(404).json({ status: 404, data: null, error: label + " not found", field: "id" });
      const item = await data.updateById(req.params.id, req.validatedBody || req.body);
      return res.status(200).json({ status: 200, data: item, error: null });
    },
    async remove(req, res) {
      try {
        const item = await data.deleteById(req.params.id);
        if (!item) return res.status(404).json({ status: 404, data: null, error: label + " not found", field: "id" });
        return res.status(200).json({ status: 200, data: { message: label + " deleted successfully", item }, error: null });
      } catch (error) {
        if (error && ["ER_ROW_IS_REFERENCED_2","ER_ROW_IS_REFERENCED"].includes(error.code)) {
          return res.status(409).json({ status: 409, data: null, error: label + " cannot be deleted because it is referenced by existing transaction records", field: "id" });
        }
        throw error;
      }
    }
  };
}
module.exports = makeCrud;
