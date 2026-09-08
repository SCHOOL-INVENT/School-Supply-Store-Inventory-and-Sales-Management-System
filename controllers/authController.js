const {login}=require("../middleware/auth");
function loginUser(req,res){const {username,password}=req.body||{};if(typeof username!=="string"||typeof password!=="string")return res.status(422).json({status:422,data:null,error:"username and password are required",field:"username"});const result=login(username,password);if(!result)return res.status(401).json({status:401,data:null,error:"Invalid username or password",field:"credentials"});return res.status(200).json({status:200,data:result,error:null});}
module.exports={loginUser};
