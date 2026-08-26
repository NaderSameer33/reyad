// ══════════════════════════════════════════════════════════════
// Google Apps Script — لازم يتحط في Google Apps Script Editor
// ──────────────────────────────────────────────────────────────
// 1. افتح Google Sheet اللي عندك
// 2. Extensions → Apps Script
// 3. امسح الكود القديم والصق الكود ده
// 4. Deploy → New Deployment → Web App
//    - Execute as: Me
//    - Who has access: Anyone
// 5. انسخ الرابط واستخدمه (اللي انت حاطه بالفعل)
// ══════════════════════════════════════════════════════════════

// رقم الواتساب اللي هيستقبل الإشعارات (بالصيغة الدولية)
var WHATSAPP_NUMBER = "966501884483";

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // ─── 1. حفظ البيانات في الشيت ───
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // لو الشيت فاضي، أضف العناوين
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "التاريخ والوقت",
        "الاسم",
        "رقم الجوال",
        "الحي",
        "الخدمة",
        "ملاحظات"
      ]);
    }

    // أضف صف البيانات
    sheet.appendRow([
      new Date().toLocaleString("ar-SA"),
      data.name || "",
      data.phone || "",
      data.district || "",
      data.service || "",
      data.notes || ""
    ]);

    // ─── 2. إرسال إشعار واتساب عبر CallMeBot (مجاني) ───
    // ⚠️ لازم تفعّل CallMeBot الأول:
    //    ابعت الرسالة دي من رقمك على واتساب للرقم +34 644 52 74 88:
    //    "I allow callmebot to send me messages"
    //    هيرد عليك بـ API Key — حطها تحت
    var CALLMEBOT_API_KEY = "YOUR_CALLMEBOT_API_KEY"; // ← حط الـ API Key هنا

    if (CALLMEBOT_API_KEY !== "YOUR_CALLMEBOT_API_KEY") {
      var message = "🔔 *طلب معاينة جديد*\n"
        + "━━━━━━━━━━━━━━\n"
        + "👤 الاسم: " + (data.name || "-") + "\n"
        + "📱 الجوال: " + (data.phone || "-") + "\n"
        + "📍 الحي: " + (data.district || "-") + "\n"
        + "🔧 الخدمة: " + (data.service || "-") + "\n"
        + (data.notes ? "📝 ملاحظات: " + data.notes + "\n" : "")
        + "━━━━━━━━━━━━━━\n"
        + "⏰ " + new Date().toLocaleString("ar-SA");

      var waUrl = "https://api.callmebot.com/whatsapp.php"
        + "?phone=" + WHATSAPP_NUMBER
        + "&text=" + encodeURIComponent(message)
        + "&apikey=" + CALLMEBOT_API_KEY;

      UrlFetchApp.fetch(waUrl, { muteHttpExceptions: true });
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok", message: "Reyad Contact API is running" }))
    .setMimeType(ContentService.MimeType.JSON);
}
