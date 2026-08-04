// ============================================================================
// GOOGLE SHEETS BACKEND (free) — one-time setup, ~5 minutes:
// 1. Go to sheets.google.com → create a new blank spreadsheet (name it anything).
// 2. Extensions → Apps Script. Delete the placeholder code and paste the script
//    from the "google-apps-script.gs" file provided alongside this app.
// 3. Click Deploy → New deployment → type "Web app".
//    - Execute as: Me
//    - Who has access: Anyone
// 4. Click Deploy, authorize the permissions Google asks for.
// 5. Copy the Web app URL (it ends in /exec) and paste it below, replacing
//    the placeholder string. Save this file — that's it, data now persists.
// Until you paste a real URL, the app runs normally on local memory only
// (nothing breaks — cloud sync is simply skipped).
// ============================================================================
export const SHEETS_API_URL = "PASTE_YOUR_WEB_APP_URL_HERE";
export const CLOUD_SYNC_ENABLED = SHEETS_API_URL.indexOf("PASTE_YOUR") === -1;
