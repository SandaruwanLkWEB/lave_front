function buildMenu(role){
  const items = [];
  const r = String(role||"").toUpperCase();
  const add = (href, labelKey) => items.push({ href, labelKey });

  // Employees don't need dashboard
  if (r && r !== "EMPLOYEE" && r !== "SECURITY") add("dashboard.html", "menu.dashboard");

  if (r && r !== "SECURITY") add("leave-request.html", "menu.request");
  if (r && r !== "SECURITY") add("my-leaves.html", "menu.myleaves");

  if (r === "HOD") add("approvals.html", "menu.dept_requests");
  if (r === "ADMIN") add("approvals.html", "menu.hod_requests");
  if (r === "HR") add("approvals.html", "menu.final_approvals");

  if (r === "HR") add("hr-unregistered.html", "menu.unregistered");
  if (r === "HR") add("appeals.html", "menu.appeals");
  if (r === "HR" || r === "ADMIN") add("reports.html", "menu.reports");
  if (r === "SECURITY") add("security.html", "menu.security");

  return items;
}

function renderTopbar(activeHref=""){
  const user = getUser();
  const role = user?.role || "";
  const name = user?.full_name || user?.name || "User";
  const items = buildMenu(role);

  const nav = document.getElementById("appTopbar");
  if (!nav) return;

  const links = items.map(it => {
    const isActive = (activeHref && it.href === activeHref) || (!activeHref && location.pathname.endsWith(it.href));
    return `<li class="nav-item"><a class="nav-link ${isActive ? "active" : ""}" href="${it.href}">${escapeHtml(t(it.labelKey) || it.labelKey)}</a></li>`;
  }).join("");

  const lang = getLang();

  nav.innerHTML = `
  <nav class="navbar navbar-expand-lg sticky-top">
    <div class="container-xl">
      <a class="navbar-brand d-flex align-items-center gap-2" href="${roleHome(role)}">
        <span class="badge text-bg-danger" style="border-radius:10px;">DSI</span>
        <span>${escapeHtml(t('brand.name') || 'Leave System')}</span>
      </a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMain">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navMain">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">${links}</ul>

        <div class="d-flex align-items-center gap-2">
          <div class="dropdown">
            <button class="btn btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              ${lang === 'si' ? 'සිංහල' : 'English'}
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><button class="dropdown-item" data-lang="si">සිංහල</button></li>
              <li><button class="dropdown-item" data-lang="en">English</button></li>
            </ul>
          </div>

          <div class="dropdown">
            <button class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              ${escapeHtml(name)} <span class="small-muted">(${escapeHtml(String(role||"GUEST").toUpperCase())})</span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><a class="dropdown-item" href="my-leaves.html">${escapeHtml(t('menu.myleaves') || 'My Leaves')}</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><button class="dropdown-item text-danger" id="btnLogout">Logout</button></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
  `;

  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.addEventListener('click', ()=>{
      const target = btn.getAttribute('data-lang');
      setLang(target);
    });
  });

  const btnLogout = document.getElementById("btnLogout");
  if (btnLogout) btnLogout.addEventListener("click", () => { clearAuth(); location.href="index.html"; });
}
