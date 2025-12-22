const BASE_URL = "https://lavebackend-production.up.railway.app"; // change if needed

function getToken(){ return localStorage.getItem("token") || ""; }
function getUser(){ try { return JSON.parse(localStorage.getItem("user") || "null"); } catch { return null; } }
function setAuth(token, user){ localStorage.setItem("token", token); localStorage.setItem("user", JSON.stringify(user)); }
function clearAuth(){ localStorage.removeItem("token"); localStorage.removeItem("user"); }

function requireAuth(){
  const token = getToken();
  const path = (location.pathname || "").toLowerCase();
  const isLogin = path.endsWith("/index.html") || path === "/" || path.endsWith("/");
  if (!token && !isLogin) location.href = "index.html";
}

async function apiFetch(path, opts = {}){
  const headers = Object.assign({ "Content-Type": "application/json" }, opts.headers || {});
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${BASE_URL}${path}`, { ...opts, headers });
  const text = await res.text();
  let json;
  try { json = text ? JSON.parse(text) : null; } catch { json = { raw: text }; }
  if (!res.ok){
    const msg = (json && (json.error || json.message)) ? (json.error || json.message) : `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return json;
}

function escapeHtml(str){
  return String(str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
}

function showToast(message, type="info"){
  const id = "t" + Math.random().toString(16).slice(2);
  const container = document.getElementById("toastContainer");
  if (!container) return alert(message);
  const bg = type === "success" ? "text-bg-success" :
             type === "danger" ? "text-bg-danger" :
             type === "warning" ? "text-bg-warning" : "text-bg-primary";
  container.insertAdjacentHTML("beforeend", `
    <div id="${id}" class="toast align-items-center ${bg} border-0 mb-2" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">${escapeHtml(message)}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    </div>
  `);
  const el = document.getElementById(id);
  const toast = new bootstrap.Toast(el, { delay: 3500 });
  toast.show();
  el.addEventListener("hidden.bs.toast", () => el.remove());
}

/**
 * Home routing:
 * - EMPLOYEE -> My Leaves
 * - SECURITY -> Security OUT/IN
 * - Others -> Dashboard
 */
function roleHome(role){
  const r = String(role||"").toUpperCase();
  if (!r) return "index.html";
  if (r === "EMPLOYEE") return "my-leaves.html";
  if (r === "SECURITY") return "security.html";
  return "dashboard.html";
}
