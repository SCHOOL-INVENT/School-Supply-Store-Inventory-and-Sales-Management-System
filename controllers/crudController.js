function makeCrud({data, label, validate}) {
  return {
    list(req,res){return res.status(200).json({status:200,data:data.findAll(),error:null});},
    get(req,res){const item=data.findById(req.params.id);if(!item)return res.status(404).json({status:404,data:null,error:`${label} not found`,field:"id"});return res.status(200).json({status:200,data:item,error:null});},
    create(req,res){const item=data.save(req.validatedBody||req.body);return res.status(201).json({status:201,data:item,error:null});},
    update(req,res){const item=data.updateById(req.params.id,req.validatedBody||req.body);if(!item)return res.status(404).json({status:404,data:null,error:`${label} not found`,field:"id"});return res.status(200).json({status:200,data:item,error:null});},
    remove(req,res){const item=data.deleteById(req.params.id);if(!item)return res.status(404).json({status:404,data:null,error:`${label} not found`,field:"id"});return res.status(200).json({status:200,data:{message:`${label} deleted successfully`,item},error:null});}
  };
}
module.exports=makeCrud;
