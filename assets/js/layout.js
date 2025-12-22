function buildMenu(role){
  const items = [];
  const r = String(role||"").toUpperCase();
  const add = (href, label) => items.push({ href, label });

  // Employees don't need dashboard
  if (r && r !== "EMPLOYEE" && r !== "SECURITY") add("dashboard.html", "Dashboard");

  if (r && r !== "SECURITY") add("leave-request.html", "Request Leave");
  if (r) add("my-leaves.html", "My Leaves");

  if (r === "HOD") add("approvals.html", "Dept Requests");
  if (r === "ADMIN") add("approvals.html", "HOD Requests");
  if (r === "HR") add("approvals.html", "Final Approvals");

  // HR-only internal unregistered module (POST /api/hr/unregistered)
  if (r === "HR") add("hr-unregistered.html", "Unregistered");

  if (r === "HR") add("appeals.html", "Appeals");

  // Reports only HR/ADMIN (backend requiresRole HR,ADMIN)
  if (r === "HR" || r === "ADMIN") add("reports.html", "Reports");

  if (r === "SECURITY") add("security.html", "Security OUT/IN");

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
    return `<li class="nav-item"><a class="nav-link ${isActive ? "active" : ""}" href="${it.href}">${it.label}</a></li>`;
  }).join("");

  nav.innerHTML = `
  <nav class="navbar navbar-expand-lg sticky-top">
    <div class="container-xl">
      <a class="navbar-brand d-flex align-items-center gap-2" href="${roleHome(role)}">
        <span class="badge text-bg-primary" style="border-radius:10px;">DSI</span>
        <span>Leave System</span>
      </a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMain">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navMain">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">${links}</ul>

        <div class="d-flex align-items-center gap-2">
          <div class="dropdown">
            <button class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              ${escapeHtml(name)} <span class="small-muted">(${escapeHtml(String(role||"GUEST").toUpperCase())})</span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><a class="dropdown-item" href="my-leaves.html">My Leaves</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><button class="dropdown-item text-danger" id="btnLogout">Logout</button></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
  `;

  const btnLogout = document.getElementById("btnLogout");
  if (btnLogout) btnLogout.addEventListener("click", () => { clearAuth(); location.href="index.html"; });
}
