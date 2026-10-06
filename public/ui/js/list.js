(function(){
const cfg={
  products:{api:"/products",columns:[["name","Product"],["category","Category"],["quantity","Qty"],["unitPrice","Unit Price"],["status","Status"]],edit:"products-edit.html",create:"products-create.html",label:"Product"},
  suppliers:{api:"/suppliers",columns:[["name","Supplier"],["contact","Contact"],["email","Email"]],edit:"suppliers-edit.html",create:"suppliers-create.html",label:"Supplier"},
  customers:{api:"/customers",columns:[["name","Customer"],["contact","Contact"],["email","Email"]],edit:"customers-edit.html",create:"customers-create.html",label:"Customer"},
  sales:{api:"/sales",columns:[["id","Transaction"],["customerId","Customer"],["total","Total"],["transactionDate","Date"]],edit:"sales-edit.html",create:"sales-create.html",label:"Sale"}
};
const key=location.pathname.split("/").pop().replace(".html",""),c=cfg[key];
if(!c)return;
const root=document.querySelector("[data-list]"),states=document.querySelector("[data-states]");
const search=document.querySelector("[data-search]");
let cache=[];

function cell(v,k,row){
  let value;
  if(k==="unitPrice"||k==="total")value="₱"+Number(v||0).toFixed(2);
  else if(k==="quantity")value=Number(v||0).toLocaleString();
  else if(k==="transactionDate")value=v?new Date(v).toLocaleString():"—";
  else if(k==="customerId")value=v==null?"Walk-in":"#"+v;
  else value=v==null||v===""?"—":String(v);
  if(k==="status"){
    const status=String(v||"").replace(/[^a-z-]/g,"");
    const label=status.replace(/-/g," ");
    return "<span class='badge "+escapeHtml(status)+"'>"+escapeHtml(label)+"</span>";
  }
  return escapeHtml(value);
}
function escapeHtml(v){return String(v??"").replace(/[&<>"]/g,function(ch){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[ch];});}
function render(rows){
  if(!rows.length){
    root.innerHTML="<div class='empty'><div class='empty-icon'>"+icon("box")+"</div><strong>No "+c.label.toLowerCase()+" records found</strong><p>Try another search or create a new "+c.label.toLowerCase()+".</p></div>";
    return;
  }
  root.innerHTML="<div class='table-wrap'><table class='table'><thead><tr>"+c.columns.map(x=>"<th>"+x[1]+"</th>").join("")+"<th>Actions</th></tr></thead><tbody>"+
    rows.map(function(r){
      const name=escapeHtml(r.name||("#"+r.id+" "+c.label));
      return "<tr>"+c.columns.map(x=>"<td>"+cell(r[x[0]],x[0],r)+"</td>").join("")+
      "<td><div class='actions-cell'>"+
        "<a class='icon-button edit' href='"+c.edit+"?id="+encodeURIComponent(r.id)+"' title='Edit "+name+"' aria-label='Edit "+name+"'>"+icon("pencil")+"</a>"+
        "<a class='icon-button' href='"+key+"-detail.html?id="+encodeURIComponent(r.id)+"' title='View details' aria-label='View details'>"+icon("box")+"</a>"+
        "<button class='icon-button delete' type='button' data-delete='"+encodeURIComponent(r.id)+"' data-name='"+name+"' title='Delete "+name+"' aria-label='Delete "+name+"'>"+icon("trash")+"</button>"+
      "</div></td></tr>";
    }).join("")+
    "</tbody></table></div>";
  root.querySelectorAll("[data-delete]").forEach(function(btn){
    btn.addEventListener("click",function(){UIFeedback.confirmDelete(btn.dataset.name,function(){remove(btn.dataset.delete,btn.dataset.name);});});
  });
}
function show(kind,text){
  states.className="state "+kind;
  states.innerHTML=text;
}
async function load(){
  show("loading","Loading "+c.label.toLowerCase()+" records...");
  try{
    const res=await fetch(c.api);
    const json=await res.json();
    if(!res.ok)throw new Error(UIFeedback.humanError(res,json));
    cache=json.data||[];
    filter();
  }catch(e){show("error",e.message||"Unable to load records.");root.innerHTML="<div class='empty'><button class='button' id='retry'>Try again</button></div>";document.getElementById("retry").onclick=load;}
}
function filter(){
  const term=(search?search.value:"").trim().toLowerCase();
  const rows=!term?cache:cache.filter(function(r){return Object.keys(r).some(function(k){return String(r[k]??"").toLowerCase().includes(term);});});
  states.className="state hidden";
  render(rows);
}
async function remove(id,name){
  show("loading","Deleting "+name+"...");
  try{
    const token=localStorage.getItem("schoolSupplyToken");
    const headers=token?{"Authorization":"Bearer "+token}:{};
    const res=await fetch(c.api+"/"+encodeURIComponent(id),{method:"DELETE",headers});
    let json={};try{json=await res.json();}catch(_){}
    if(!res.ok){show("error",UIFeedback.humanError(res,json));return;}
    UIFeedback.toast(name+" deleted successfully.","success");
    await load();
  }catch(e){show("error","We could not reach the server. Check your connection and try again.");}
}
if(search)search.addEventListener("input",filter);
load();
})();