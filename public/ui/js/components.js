function layout(title,body,active){
  var names=["Dashboard","Products","Suppliers","Customers","Sales","Stock"];
  var nav=names.map(function(x){
    var href=x==="Dashboard"?"/ui/":"/ui/"+x.toLowerCase()+".html";
    return "<a href=\"" + href + "\" class=\"" + (x===active?"active":"") + "\">" + x + "</a>";
  }).join("");
  nav += "<a href=\"/ui/login.html\">Sign in</a>";
  document.body.innerHTML="<div class=\"app\"><aside class=\"sidebar\"><h1>School Supply Store</h1><nav class=\"nav\">"+nav+"</nav></aside><main class=\"main\"><div class=\"topbar\"><h2>"+title+"</h2><span id=\"session-user\" class=\"muted\"></span></div>"+body+"</main></div>";
  var user=localStorage.getItem("schoolSupplyUser");
  var target=document.getElementById("session-user");
  if(target&&user){try{var u=JSON.parse(user);target.textContent="Signed in: "+u.username+" ("+u.role+")";}catch(_){target.textContent="Signed in";}}
}
