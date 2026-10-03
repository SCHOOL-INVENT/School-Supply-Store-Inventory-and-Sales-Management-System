(function(){
const cfg={products:{api:"/products",columns:[["name","Name"],["category","Category"],["quantity","Qty"],["unitPrice","Unit Price"],["status","Status"]],edit:"products-edit.html"},suppliers:{api:"/suppliers",columns:[["name","Name"],["contact","Contact"],["email","Email"]],edit:"suppliers-edit.html"},customers:{api:"/customers",columns:[["name","Name"],["contact","Contact"],["email","Email"]],edit:"customers-edit.html"},sales:{api:"/sales",columns:[["id","Transaction"],["customerId","Customer ID"],["total","Total"],["transactionDate","Date"]],edit:"sales-edit.html"}};
const key=location.pathname.split("/").pop().replace(".html","");
const c=cfg[key];if(!c)return;
const root=document.querySelector("[data-list]"),states=document.querySelector("[data-states]");
function show(kind,text){states.className="state "+kind;states.textContent=text}
function cell(v,k){return k==="unitPrice"||k==="total"?"₱"+Number(v||0).toFixed(2):(v==null?"":String(v))}
async function load(){
 show("loading","Loading records...");
 try{
  const res=await fetch(c.api),json=await res.json();
  if(!res.ok){show("error",json.error||"Unable to load records.");return}
  const rows=json.data||[];
  if(!rows.length){show("","No records yet. Create the first record.");root.innerHTML="";return}
  states.className="state hidden";
  root.innerHTML="<table class=\"table\"><thead><tr>"+c.columns.map(function(x){return "<th>"+x[1]+"</th>"}).join("")+"<th>Action</th></tr></thead><tbody>"+rows.map(function(r){return "<tr>"+c.columns.map(function(x){return "<td>"+cell(r[x[0]],x[0])+"</td>"}).join("")+"<td><a href=\""+c.edit+"?id="+encodeURIComponent(r.id)+"\">Edit</a> &nbsp; <a href=\""+key+"-detail.html?id="+encodeURIComponent(r.id)+"\">View</a></td></tr>"}).join("")+"</tbody></table>";
 }catch(e){show("error","Network error. The server may be unavailable.")}
}
load();
})();