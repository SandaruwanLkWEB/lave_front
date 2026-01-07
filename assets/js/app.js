const BASE_URL = (window.APP_CONFIG && window.APP_CONFIG.BASE_URL) || "https://lavebackend-production.up.railway.app";

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

  let res;
  try{
    res = await fetch(`${BASE_URL}${path}`, { ...opts, headers });
  }catch(e){
    // Network/CORS errors often land here (browser blocks the response)
    throw new Error(`Network error (check BASE_URL / CORS): ${e.message || e}`);
  }

  const text = await res.text();
  let json = null;
  let parsed = false;

  if (text){
    try { json = JSON.parse(text); parsed = true; }
    catch { json = { raw: text }; }
  }

  const looksHtml = typeof text === 'string' && /<!doctype html|<html/i.test(text);

  if (!res.ok){
    let msg = (json && (json.error || json.message)) ? (json.error || json.message) : `HTTP ${res.status}`;

    // If server/proxy returned HTML (common when upstream fails), show a clearer message
    if (!parsed && looksHtml){
      msg = `Server returned HTML instead of JSON (HTTP ${res.status}). Check backend logs, reverse proxy, and CORS.`;
    }

    throw new Error(msg);
  }

  // Successful but non-JSON response is still a bug — surface it clearly
  if (!parsed && text && looksHtml){
    throw new Error('Unexpected HTML response from server. Check BASE_URL and backend routing.');
  }

  return json;
}

function escapeHtml(str){
  return String(str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
}

function showToast(message, type="info"){
  const id = "t" + Math.random().toString(16).slice(2);
  const container = document.getElementById("toastContainer");
  // Fallbacks (important for Android WebView or when Bootstrap JS CDN is blocked)
  if (!container) return alert(message);
  if (!window.bootstrap || !bootstrap.Toast) return alert(message);
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
 * - HOD      -> Approvals queue
 * - HR/ADMIN -> Dashboard
 * - SECURITY -> Security OUT/IN
 */
function roleHome(role){
  const r = String(role||"").toUpperCase();
  if (!r) return "index.html";
  if (r === "EMPLOYEE") return "my-leaves.html";
  if (r === "HOD") return "approvals.html";
  if (r === "SECURITY") return "security.html";
  // HR / ADMIN dashboards
  if (r === "HR" || r === "ADMIN") return "dashboard.html";
  return "index.html";
}
