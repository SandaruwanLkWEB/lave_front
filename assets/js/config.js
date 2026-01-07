// Simple runtime config for static hosting
// You can override BASE_URL by setting localStorage BASE_URL
// Example: localStorage.setItem('BASE_URL','http://localhost:8080');
window.APP_CONFIG = window.APP_CONFIG || {};
window.APP_CONFIG.BASE_URL = window.APP_CONFIG.BASE_URL
  || localStorage.getItem('BASE_URL')
  || "https://lavebackend-production.up.railway.app";
