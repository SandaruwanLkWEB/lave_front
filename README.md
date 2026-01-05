# DSI Leave System — Enterprise UI

## Configure Backend URL
This UI is static (HTML/CSS/JS). You can set the API base URL at runtime:

- Default: `https://lavebackend-production.up.railway.app`
- Override (recommended):
  - Open browser console and run:
    - `localStorage.setItem('BASE_URL','http://localhost:8080');`
  - Refresh the page.

Config file: `assets/js/config.js`

## Language
- Default: Sinhala (සිංහල)
- Toggle: Top bar language switch (සිංහල / English)
  - Stored in `localStorage` key `lang`.

## Reports (HR / ADMIN)
- Filters: Department, Employee, Status, Unregistered
- Daily pagination
- CSV download (UTF-8 BOM for Sinhala Excel compatibility)
