(function(){
  function box(el,text,type){if(!el)return;el.textContent=text||"";el.className="form-message "+(type||"");}
  window.UIFeedback={
    show:box,
    loading:function(el,text){box(el,text||"Loading...","loading");},
    success:function(el,text){box(el,text||"Saved successfully.","success");},
    error:function(el,text){box(el,text||"We couldn't complete that action. Try again.","error");},
    humanError:function(res,json){
      if(res.status===422)return json&&json.error?json.error:"Please check the highlighted fields.";
      if(res.status===404)return "We couldn't find that record. It may have been removed.";
      if(res.status===401)return "Please sign in before performing this action.";
      if(res.status===403)return "You don't have permission to perform this action.";
      if(res.status===409)return json&&json.error?json.error:"This record cannot be deleted because it is still in use.";
      if(res.status>=500)return "The server encountered a problem. Please try again.";
      return json&&json.error?json.error:"We couldn't complete that action. Please try again.";
    },
    confirmDelete:function(name,onConfirm){
      const modal=document.getElementById("modal-backdrop");
      if(!modal){if(confirm("Delete "+name+"?"))onConfirm();return;}
      modal.innerHTML="<div class='modal' role='dialog' aria-modal='true' aria-labelledby='delete-title'><div class='modal-icon'>"+icon("trash")+"</div><h3 id='delete-title'>Delete record?</h3><p>This will permanently remove <strong>"+String(name).replace(/</g,"&lt;")+"</strong>. This action cannot be undone.</p><div class='modal-actions'><button class='button secondary' id='cancel-delete'>Cancel</button><button class='button danger' id='confirm-delete'>Delete</button></div></div>";
      modal.classList.add("open");
      document.getElementById("cancel-delete").onclick=function(){modal.classList.remove("open");};
      document.getElementById("confirm-delete").onclick=function(){modal.classList.remove("open");onConfirm();};
      modal.onclick=function(e){if(e.target===modal)modal.classList.remove("open");};
    },
    toast:function(text,type){
      const stack=document.getElementById("toast-stack"); if(!stack)return;
      const item=document.createElement("div"); item.className="toast "+(type||""); item.textContent=text; stack.appendChild(item);
      setTimeout(function(){item.remove();},3200);
    }
  };
})();