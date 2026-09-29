var ZP_SHEET_ID = '1Oqn6ICNEOiZdXk0Gz0g9t-CnxB4xDcVShAH0qxrEY6g';
var ZP_SHEET_NAME = '日次計測';
var ZP_CAMPAIGN_ID = '52602523544795';
var ZP_START_DATE = '2026-09-28';
var ZP_API_VERSION = 'v21.0';
var ZP_TZ = 'Asia/Tokyo';
var ZP_HEADERS = [
  '日付', 'Meta広告費', 'Meta Imp', 'Meta リンククリック数', 'Meta CTR(リンク)',
  'Meta CPC(リンク)', 'Meta LPV', 'Meta LPV単価', 'Meta 結果', 'Meta 結果単価',
  'Meta Reach', 'Meta Frequency', 'Meta CPM', 'クリック→LPV率', 'LPV→結果率'
];

function zpConfig_() {
  var props = PropertiesService.getScriptProperties();
  var token = props.getProperty('META_ACCESS_TOKEN');
  var accountId = props.getProperty('META_AD_ACCOUNT_ID');
  if (!token || !accountId) {
    throw new Error('META_ACCESS_TOKEN or META_AD_ACCOUNT_ID is missing in Script Properties.');
  }
  if (accountId.indexOf('act_') !== 0) accountId = 'act_' + accountId;
  return {
    token: token,
    accountId: accountId,
    resultActionType: props.getProperty('ZP_RESULT_ACTION_TYPE') || ''
  };
}

function zpFetchInsights_(since, until) {
  var cfg = zpConfig_();
  var params = {
    level: 'campaign',
    time_increment: '1',
    fields: 'campaign_id,spend,impressions,inline_link_clicks,reach,actions',
    time_range: JSON.stringify({ since: since, until: until }),
    filtering: JSON.stringify([{ field: 'campaign.id', operator: 'IN', value: [ZP_CAMPAIGN_ID] }]),
    limit: '100',
    access_token: cfg.token
  };
  var qs = Object.keys(params).map(function (k) {
    return k + '=' + encodeURIComponent(params[k]);
  }).join('&');
  var url = 'https://graph.facebook.com/' + ZP_API_VERSION + '/' + cfg.accountId + '/insights?' + qs;
  var res = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  var body = JSON.parse(res.getContentText());
  if (res.getResponseCode() !== 200 || body.error) {
    var e = body.error || {};
    throw new Error('Meta API error: ' + (e.message || res.getResponseCode()) + ' (code=' + e.code + ')');
  }
  return body.data || [];
}

function zpActionValue_(actions, type) {
  if (!type || !actions) return 0;
  for (var i = 0; i < actions.length; i++) {
    if (actions[i].action_type === type) return Number(actions[i].value) || 0;
  }
  return 0;
}

function zpEnsureSheet_() {
  var ss = SpreadsheetApp.openById(ZP_SHEET_ID);
  var sheet = ss.getSheetByName(ZP_SHEET_NAME);
  if (!sheet) {
    sheet = ss.getSheets()[0];
    sheet.setName(ZP_SHEET_NAME);
  }
  sheet.getRange(1, 1, 1, ZP_HEADERS.length).setValues([ZP_HEADERS])
    .setBackground('#111111').setFontColor('#FFFFFF').setFontWeight('bold')
    .setHorizontalAlignment('center').setVerticalAlignment('middle').setWrap(true);
  sheet.setRowHeight(1, 44);
  sheet.setFrozenRows(1);
  sheet.setFrozenColumns(1);
  sheet.setColumnWidth(1, 96);
  sheet.setColumnWidths(2, ZP_HEADERS.length - 1, 104);
  return sheet;
}

function zpUpsertRow_(sheet, dateStr, v) {
  var lastRow = Math.max(sheet.getLastRow(), 1);
  var dates = lastRow > 1 ? sheet.getRange(2, 1, lastRow - 1, 1).getValues() : [];
  var target = dateStr.replace(/-/g, '/');
  var row = 0;
  for (var i = 0; i < dates.length; i++) {
    var cell = dates[i][0];
    var key = cell instanceof Date ? Utilities.formatDate(cell, ZP_TZ, 'yyyy/MM/dd') : String(cell);
    if (key === target) { row = i + 2; break; }
  }
  if (!row) row = lastRow + 1;
  var r = String(row);
  var hasResult = !!zpConfig_().resultActionType;
  sheet.getRange(row, 1).setNumberFormat('yyyy/mm/dd').setValue(new Date(dateStr + 'T00:00:00+09:00'));
  sheet.getRange(row, 2).setValue(v.spend);
  sheet.getRange(row, 3).setValue(v.impressions);
  sheet.getRange(row, 4).setValue(v.clicks);
  sheet.getRange(row, 5).setFormula('=IFERROR(D' + r + '/C' + r + ',"")');
  sheet.getRange(row, 6).setFormula('=IFERROR(B' + r + '/D' + r + ',"")');
  sheet.getRange(row, 7).setValue(v.lpv);
  sheet.getRange(row, 8).setFormula('=IFERROR(B' + r + '/G' + r + ',"")');
  sheet.getRange(row, 9).setValue(hasResult ? v.result : '');
  sheet.getRange(row, 10).setFormula('=IFERROR(B' + r + '/I' + r + ',"")');
  sheet.getRange(row, 11).setValue(v.reach);
  sheet.getRange(row, 12).setFormula('=IFERROR(C' + r + '/K' + r + ',"")');
  sheet.getRange(row, 13).setFormula('=IFERROR(B' + r + '/C' + r + '*1000,"")');
  sheet.getRange(row, 14).setFormula('=IFERROR(G' + r + '/D' + r + ',"")');
  sheet.getRange(row, 15).setFormula('=IFERROR(I' + r + '/G' + r + ',"")');
  sheet.getRange(row, 2).setNumberFormat('¥#,##0');
  sheet.getRange(row, 3).setNumberFormat('#,##0');
  sheet.getRange(row, 4).setNumberFormat('#,##0');
  sheet.getRange(row, 5).setNumberFormat('0.00%');
  sheet.getRange(row, 6).setNumberFormat('¥#,##0');
  sheet.getRange(row, 7).setNumberFormat('#,##0');
  sheet.getRange(row, 8).setNumberFormat('¥#,##0');
  sheet.getRange(row, 9).setNumberFormat('#,##0');
  sheet.getRange(row, 10).setNumberFormat('¥#,##0');
  sheet.getRange(row, 11).setNumberFormat('#,##0');
  sheet.getRange(row, 12).setNumberFormat('0.00');
  sheet.getRange(row, 13).setNumberFormat('¥#,##0');
  sheet.getRange(row, 14).setNumberFormat('0.00%');
  sheet.getRange(row, 15).setNumberFormat('0.00%');
}

function zpSyncRange_(since, until) {
  var sheet = zpEnsureSheet_();
  var cfg = zpConfig_();
  var rows = zpFetchInsights_(since, until);
  rows.forEach(function (d) {
    zpUpsertRow_(sheet, d.date_start, {
      spend: Number(d.spend) || 0,
      impressions: Number(d.impressions) || 0,
      clicks: Number(d.inline_link_clicks) || 0,
      lpv: zpActionValue_(d.actions, 'landing_page_view'),
      result: zpActionValue_(d.actions, cfg.resultActionType),
      reach: Number(d.reach) || 0
    });
  });
  return rows.length;
}

function zpDateStr_(offsetDays) {
  var d = new Date(Date.now() + offsetDays * 86400000);
  return Utilities.formatDate(d, ZP_TZ, 'yyyy-MM-dd');
}

function syncZentuppaDaily() {
  try {
    var n = zpSyncRange_(zpDateStr_(-3), zpDateStr_(0));
    Logger.log('[ZentuppaSync] ok rows=' + n);
  } catch (e) {
    Logger.log('[ZentuppaSync] failed: ' + e.message);
  }
}

function backfillZentuppa() {
  var sh = zpEnsureSheet_();
  if (sh.getLastRow() > 1) sh.getRange(2, 1, sh.getLastRow() - 1, ZP_HEADERS.length).clear();
  var n = zpSyncRange_(ZP_START_DATE, zpDateStr_(0));
  Logger.log('[ZentuppaSync] backfill rows=' + n);
}

function setupZentuppaTrigger() {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'syncZentuppaDaily') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('syncZentuppaDaily').timeBased().everyDays(1).atHour(6).inTimezone(ZP_TZ).create();
}

function diagnoseZentuppaActions() {
  var rows = zpFetchInsights_(ZP_START_DATE, zpDateStr_(0));
  var totals = {};
  rows.forEach(function (d) {
    (d.actions || []).forEach(function (a) {
      totals[a.action_type] = (totals[a.action_type] || 0) + (Number(a.value) || 0);
    });
  });
  Logger.log('[ZentuppaDiag] days=' + rows.length + ' actions=' + JSON.stringify(totals));
}
