(function(){
const API={Products:"/products",Suppliers:"/suppliers",Customers:"/customers",Sales:"/sales"};
const names={Products:"Product",Suppliers:"Supplier",Customers:"Customer",Sales:"Sale"};
const form=document.querySelector("[data-api-form]");
if(!form)return;
const entity=form.dataset.entity;
const mode=form.dataset.mode||"create";
const id=new URLSearchParams(location.search).get("id");
const statusBox=document.querySelector("#form-status");
const button=form.querySelector("button[type=submit]");
function message(text,type){statusBox.textContent=text;statusBox.className="form-message "+(type||"");}
function setBusy(busy){button.disabled=busy;button.textContent=busy?(mode==="update"?"Updating...":"Saving..."):(mode==="update"?"Update "+names[entity]:"Save "+names[entity]);}
function field(name){return form.querySelector("[name='"+name+"']");}
function showError(err){message(err.error||"Unable to save. Please check your input.","error");var target=err.field&&field(err.field);if(target){target.classList.add("invalid");target.focus();}}
function clearInvalid(){form.querySelectorAll(".invalid").forEach(function(x){x.classList.remove("invalid")});}
async function populateSelect(selectName,url,labelKey){
 const select=field(selectName);if(!select)return;
 try{const res=await fetch(url);const json=await res.json();if(!res.ok)return;
  (json.data||[]).forEach(function(item){var o=document.createElement("option");o.value=item.id;o.textContent=item[labelKey]||("Record #"+item.id);select.appendChild(o)});
 }catch(e){}
}
async function loadOptions(){
 if(entity==="Products")await populateSelect("supplierId","/suppliers","name");
 if(entity==="Sales"){await populateSelect("customerId","/customers","name");await populateSelect("productId","/products","name");}
}

async function loadEdit(){
 if(mode!=="update")return;
 if(!id){message("Missing record ID. Open this page from an Edit link.","error");button.disabled=true;return;}
 setBusy(true);message("Loading record...","loading");
 try{
  const res=await fetch(API[entity]+"/"+encodeURIComponent(id));
  const json=await res.json();
  if(!res.ok){showError(json);return;}
  const d=json.data;
  if(entity==="Products"){field("name").value=d.name||"";field("category").value=d.category||"";field("quantity").value=d.quantity??"";field("unitPrice").value=d.unitPrice??"";field("supplierId").value=d.supplierId??"";}
  if(entity==="Suppliers"||entity==="Customers"){["name","contact","email","address"].forEach(function(k){if(field(k))field(k).value=d[k]||""});}
  if(entity==="Sales"){field("customerId").value=d.customerId||"";if(d.items&&d.items[0]){field("productId").value=d.items[0].productId||"";field("quantity").value=d.items[0].quantity||1;}}
  message("Record loaded.","success");
 }catch(e){message("Network error while loading the record.","error")}
 finally{setBusy(false)}
}
async function submit(e){
 e.preventDefault();clearInvalid();setBusy(true);message("Saving...","loading");
 let data;
 if(entity==="Products"){data={name:field("name").value,category:field("category").value,quantity:Number(field("quantity").value),unitPrice:Number(field("unitPrice").value),status:field("status")?field("status").value:"in-stock"};if(field("supplierId").value)data.supplierId=Number(field("supplierId").value)}
 if(entity==="Suppliers"||entity==="Customers"){data={name:field("name").value,contact:field("contact").value};if(field("email").value)data.email=field("email").value;if(field("address").value)data.address=field("address").value}
 if(entity==="Sales"){data={items:[{productId:Number(field("productId").value),quantity:Number(field("quantity").value)}]};if(field("customerId").value)data.customerId=Number(field("customerId").value)}
 const url=mode==="update"?API[entity]+"/"+encodeURIComponent(id):API[entity];
 try{
  const res=await fetch(url,{method:mode==="update"?"PUT":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
  const json=await res.json();
  if(res.ok){
   message("Saved successfully. Updating the list...","success");
   setTimeout(function(){location.href="/ui/"+entity.toLowerCase()+".html"},300);
  }else{showError(json);setBusy(false)}
 }catch(e){message("Network/server error. Please try again.","error");setBusy(false)}
}
form.addEventListener("submit",submit);loadOptions().then(loadEdit);
})();