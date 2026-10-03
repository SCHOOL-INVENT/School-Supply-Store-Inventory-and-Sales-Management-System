(function(){
window.UIFeedback={
 show:function(el,text,type){if(!el)return;el.textContent=text;el.className="form-message "+(type||"");},
 loading:function(el,text){this.show(el,text||"Loading...","loading");},
 success:function(el,text){this.show(el,text||"Saved successfully.","success");},
 error:function(el,text){this.show(el,text||"We couldn't complete that action. Try again.","error");},
 humanError:function(res,json){
  if(res.status===422)return json&&json.error?json.error:"Please check the highlighted fields.";
  if(res.status===404)return "We couldn't find that record. It may have been removed.";
  if(res.status===401)return "Please sign in before performing this action.";
  if(res.status===403)return "You don't have permission to perform this action.";
  if(res.status>=500)return "We couldn't complete that action because the server had a problem. Try again.";
  return json&&json.error?json.error:"We couldn't complete that action. Try again.";
 },
 retry:function(container,handler){
  container.innerHTML='<button type="button" class="button secondary">Try again</button>';
  container.querySelector("button").addEventListener("click",handler);
 }
};
})();