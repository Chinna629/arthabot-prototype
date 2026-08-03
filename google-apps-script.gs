/**
 * ArthaBot — free Google Sheets backend
 * ======================================
 * SETUP (about 5 minutes):
 * 1. Go to https://sheets.google.com and create a new blank spreadsheet.
 *    Name it anything, e.g. "ArthaBot Data".
 * 2. In the menu, click Extensions -> Apps Script.
 * 3. Delete everything in the editor (the default "myFunction" stub) and
 *    paste this entire file in its place.
 * 4. Click the Save icon (or Ctrl+S).
 * 5. Click Deploy -> New deployment.
 *    - Click the gear icon next to "Select type" and choose "Web app".
 *    - Description: anything, e.g. "ArthaBot backend".
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Click Deploy. Google will ask you to authorize permissions — click
 *    through "Advanced" -> "Go to (project name) (unsafe)" if it warns you
 *    (this warning appears because the app isn't published/verified, which
 *    is expected and fine for a personal/capstone project).
 * 7. Copy the "Web app" URL shown after deployment — it ends in /exec.
 * 8. Paste that URL into arthabot-prototype.html (or .jsx), replacing the
 *    SHEETS_API_URL placeholder near the top of the file. Save. Done —
 *    the app will now save and load data from this spreadsheet.
 *
 * Every registered user gets one row, keyed by their mobile number, with
 * their finances, goals, and transaction history stored as JSON.
 * You can open the spreadsheet at any time to see the raw data.
 */

const SHEET_NAME = "Data";

function doPost(e) {
  const sheet = getOrCreateSheet();
  const data = JSON.parse(e.postData.contents);
  const mobile = String(data.mobile || "");
  if (!mobile) return respond({ error: "mobile is required" });

  const rows = sheet.getDataRange().getValues();
  let rowIndex = -1;
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0]) === mobile) {
      rowIndex = i + 1; // 1-indexed, +1 for header row
      break;
    }
  }

  const rowData = [
    mobile,
    data.name || "",
    JSON.stringify(data.finances || {}),
    JSON.stringify(data.goals || []),
    JSON.stringify(data.transactions || []),
    new Date().toISOString(),
  ];

  if (rowIndex === -1) {
    sheet.appendRow(rowData);
  } else {
    sheet.getRange(rowIndex, 1, 1, rowData.length).setValues([rowData]);
  }

  return respond({ status: "ok" });
}

function doGet(e) {
  const sheet = getOrCreateSheet();
  const mobile = String((e.parameter && e.parameter.mobile) || "");
  if (!mobile) return respond({ finances: {}, goals: [], transactions: [] });

  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0]) === mobile) {
      return respond({
        name: rows[i][1],
        finances: safeParse(rows[i][2], {}),
        goals: safeParse(rows[i][3], []),
        transactions: safeParse(rows[i][4], []),
      });
    }
  }
  return respond({ finances: {}, goals: [], transactions: [] });
}

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(["mobile", "name", "finances", "goals", "transactions", "updatedAt"]);
  }
  return sheet;
}

function safeParse(str, fallback) {
  try {
    return str ? JSON.parse(str) : fallback;
  } catch (err) {
    return fallback;
  }
}

function respond(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
