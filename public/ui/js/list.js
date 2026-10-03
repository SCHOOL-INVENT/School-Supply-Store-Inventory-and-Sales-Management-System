(function(){
const cfg={products:{api:"/products",columns:[["name","Name"],["category","Category"],["quantity","Qty"],["unitPrice","Unit Price"],["status","Status"]],edit:"products-edit.html"},suppliers:{api:"/suppliers",columns:[["name","Name"],["contact","Contact"],["email","Email"]],edit:"suppliers-edit.html"},customers:{api:"/customers",columns:[["name","Name"],["contact","Contact"],["email","Email"]],edit:"customers-edit.html"},sales:{api:"/sales",columns:[["id","Transaction"],["customerId","Customer ID"],["total","Total"],["transactionDate","Date"]],edit:"sales-edit.html"}};
const key=location.pathname.split("/").pop().replace(".html",""),c=cfg[key];
if(!c)return;
const root=document.querySelector("[data-list]"),states=document.querySelector("[data-states]");
function show(kind,text){states.className="state "+kind;states.innerHTML=text}
function cell(v,k){return k==="unitPrice"||k==="total"?"₱"+Number(v||0).toFixed(2):(v==null?"":String(v))}
function authHeaders(){const t=localStorage.getItem("schoolSupplyToken");return t?{"Authorization":"Bearer "+t}:{}}
async function remove(id,name){
 if(!confirm("Are you sure you want to delete "+name+"? This action cannot be undone."))return;
 show("loading","Deleting "+name+"...");
 try{
  const res=await fetch(c.api+"/"+encodeURIComponent(id),{method:"DELETE",headers:authHeaders()});
  let json={};try{json=await res.json()}catch(_){}
  if(!res.ok){show("error",UIFeedback.humanError(res,json)+' <button type="button" class="button secondary" id="retry-delete-list">Try again</button>');document.getElementById("retry-delete-list").onclick=load;return}
  show("","Deleted successfully. Refreshing...");
  await load();
 }catch(e){show("error","We could not reach the server. Check your connection and try again. <button type=\"button\" class=\"button secondary\" id=\"retry-delete-list\">Try again</button>");document.getElementById("retry-delete-list").onclick=load}
}
async function load(){
 show("loading","Loading records...");
 try{
  const res=await fetch(c.api),json=await res.json();
  if(!res.ok){show("error",UIFeedback.humanError(res,json)+' <button type="button" class="button secondary" id="retry-load">Try again</button>');document.getElementById("retry-load").onclick=load;return}
  const rows=json.data||[];
  if(!rows.length){show("","No records yet. Create the first record.");root.innerHTML="";return}
  states.className="state hidden";
  root.innerHTML="<table class=\"table\"><thead><tr>"+c.columns.map(x=>"<th>"+x[1]+"</th>").join("")+"<th>Action</th></tr></thead><tbody>"+rows.map(r=>"<tr>"+c.columns.map(x=>"<td>"+cell(r[x[0]],x[0])+"</td>").join("")+"<td><a href=\""+c.edit+"?id="+encodeURIComponent(r.id)+"\">Edit</a> &nbsp; <a href=\""+key+"-detail.html?id="+encodeURIComponent(r.id)+"\">View</a> &nbsp; <button type=\"button\" class=\"link-button\" data-delete=\""+encodeURIComponent(r.id)+"\" data-name=\""+String(r.name||("record #"+r.id)).replace(/"/g,"&quot;")+"\">Delete</button></td></tr>").join("")+"</tbody></table>";
  root.querySelectorAll("[data-delete]").forEach(function(btn){btn.addEventListener("click",function(){remove(btn.dataset.delete,btn.dataset.name)})});
 }catch(e){show("error","We could not load the records. Check your connection and try again. <button type=\"button\" class=\"button secondary\" id=\"retry-load\">Try again</button>");document.getElementById("retry-load").onclick=load}
}
load();
})();