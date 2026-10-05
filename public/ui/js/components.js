function icon(name){
  const icons={
    dashboard:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
    products:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7.5 12 3l9 4.5L12 12 3 7.5Z"/><path d="M3 7.5V17l9 4 9-4V7.5"/><path d="M12 12v9"/></svg>',
    suppliers:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21V7l9-4 9 4v14"/><path d="M7 21v-7h10v7"/><path d="M7 10h10"/></svg>',
    customers:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c.8-3.1 3.1-5 7-5s6.2 1.9 7 5"/></svg>',
    sales:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2h12l2 5H4l2-5Z"/><path d="M4 7h16v13H4z"/><path d="M8 11h8M8 15h5"/></svg>',
    stock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 5h16v14H4z"/><path d="M8 3v4M16 3v4M7 11h10M7 15h6"/></svg>',
    login:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 17l5-5-5-5"/><path d="M15 12H3"/><path d="M21 19V5"/></svg>',
    menu:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
    pencil:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m4 16-1 5 5-1L19 9l-4-4L4 16Z"/><path d="m14 6 4 4"/></svg>',
    trash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13"/><path d="M10 11v5M14 11v5"/></svg>',
    search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="6"/><path d="m16 16 5 5"/></svg>',
    plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>',
    box:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7.5 12 3l8 4.5L12 12 4 7.5Z"/><path d="M4 7.5V17l8 4 8-4V7.5"/></svg>'
  };
  return icons[name]||icons.box;
}

function layout(title,body,active,subtitle){
  const names=[
    ["Dashboard","/ui/dashboard.html","dashboard"],
    ["Products","/ui/products.html","products"],
    ["Suppliers","/ui/suppliers.html","suppliers"],
    ["Customers","/ui/customers.html","customers"],
    ["Sales","/ui/sales.html","sales"],
    ["Stock","/ui/stock.html","stock"]
  ];
  const nav=names.map(function(item){
    return "<a href='"+item[1]+"' class='"+(item[0]===active?"active":"")+"'><span class='nav-icon'>"+icon(item[2])+"</span><span>"+item[0]+"</span></a>";
  }).join("");
  var authToken=localStorage.getItem("schoolSupplyToken");
  var authLink=authToken
    ? "<a href='#' id='logout-link'><span class='nav-icon'>"+icon("login")+"</span><span>Log out</span></a>"
    : "<a href='/ui/login.html'><span class='nav-icon'>"+icon("login")+"</span><span>Sign in</span></a>";
  document.body.innerHTML=
    "<div class='app'>"+
      "<aside id='sidebar' class='sidebar'>"+
        "<div class='brand'><div class='brand-mark'>S</div><div class='brand-text'><strong>School Supply Store</strong><span>Inventory & Sales</span></div></div>"+
        "<nav class='nav'>"+nav+authLink+"</nav>"+
        "<div class='sidebar-footer'>MySQL-powered management system</div>"+
      "</aside>"+
      "<main class='main'>"+
        "<div class='topbar'><div style='display:flex;gap:12px;align-items:flex-start'><button class='mobile-menu' id='mobile-menu' aria-label='Open menu'>"+icon("menu")+"</button><div><h2>"+title+"</h2>"+(subtitle?"<p class='page-intro'>"+subtitle+"</p>":"")+"</div></div></div>"+
        body+
      "</main>"+
      "<div id='modal-backdrop' class='modal-backdrop'></div>"+
      "<div id='toast-stack' class='toast-stack'></div>"+
    "</div>";
  const menu=document.getElementById("mobile-menu");
  const sidebar=document.getElementById("sidebar");
  if(menu)menu.addEventListener("click",function(){sidebar.classList.toggle("open");});
  sidebar.querySelectorAll("a").forEach(function(a){a.addEventListener("click",function(){sidebar.classList.remove("open");});});
  var logout=document.getElementById("logout-link");
  if(logout)logout.addEventListener("click",function(e){
    e.preventDefault();
    localStorage.removeItem("schoolSupplyToken");
    localStorage.removeItem("schoolSupplyUser");
    location.replace("/ui/login.html");
  });
}
