var META_SHEET_NAME = '① 日次広告実績';
var META_DATE_COL = 1;
var META_SPEND_COL = 2;
var META_IMP_COL = 3;
var META_CLICK_COL = 4;
var META_LPV_COL = 7;
var META_RESULT_COL = 9;
var META_RESULT_COST_COL = 10;
var META_REACH_COL = 11;
var META_FREQUENCY_COL = 12;
var META_CPM_COL = 13;
var META_V2_LEAD_COL = 20; // T: Ver2 Lead数
var META_V2_LEAD_COST_COL = 21; // U: Ver2 Lead単価
var META_MAX_ROWS = 400;
var META_API_VERSION = 'v21.0';
var META_TZ = 'Asia/Tokyo';
var META_BREAKDOWN_SHEET_NAME = 'Meta内訳';
var META_BREAKDOWN_HEADERS = [
  '日付', 'キャンペーンID', 'キャンペーン名', '区分', '広告費', 'Imp', 'リンククリック', 'LPV',
  'Reach(キャンペーン単体)', 'Frequency(キャンペーン単体)', 'CPM', '成果種別', '成果数', '成果単価'
];

function getMetaConfig_() {
  var props = PropertiesService.getScriptProperties();
  var token = props.getProperty('META_ACCESS_TOKEN');
  var accountId = props.getProperty('META_AD_ACCOUNT_ID');
  var resultActionType = props.getProperty('META_RESULT_ACTION_TYPE');
  var campaignIdsRaw = props.getProperty('META_CAMPAIGN_IDS');
  if (accountId && accountId.indexOf('act_') !== 0) accountId = 'act_' + accountId;
  if (!token || !accountId) {
    throw new Error('META_ACCESS_TOKEN or META_AD_ACCOUNT_ID is missing in Script Properties.');
  }
  if (!resultActionType) {
    throw new Error('META_RESULT_ACTION_TYPE is missing in Script Properties.');
  }
  if (!campaignIdsRaw) {
    throw new Error('META_CAMPAIGN_IDS is missing in Script Properties.');
  }
  var campaignIds = campaignIdsRaw.split(',').map(function (s) { return s.trim(); }).filter(function (s) { return s; });
  if (campaignIds.length === 0) {
    throw new Error('META_CAMPAIGN_IDS is empty in Script Properties.');
  }
  return { token: token, accountId: accountId, resultActionType: resultActionType, campaignIds: campaignIds };
}

/**
 * Ver2設定。META_V2_CAMPAIGN_ID が未登録なら null（= 従来どおり旧キャンペーンのみ）。
 * META_V2_RESULT_ACTION_TYPE は inspectV2ActionTypes_ の実際の返却値を確認してから登録する。
 */
function getMetaV2Config_() {
  var props = PropertiesService.getScriptProperties();
  var id = (props.getProperty('META_V2_CAMPAIGN_ID') || '').trim();
  if (!id) return null;
  return {
    campaignId: id,
    actionType: (props.getProperty('META_V2_RESULT_ACTION_TYPE') || '').trim(),
    startDate: (props.getProperty('META_V2_START_DATE') || '').trim()
  };
}

/** 配信開始日以降の日付だけVer2を有効にする（開始日前に実績を作らない）。 */
function getActiveV2_(dateStr) {
  var v2 = getMetaV2Config_();
  if (!v2 || !v2.startDate) return null;
  return dateStr >= v2.startDate ? v2 : null;
}

function verifyAdAccountTimezone_(config) {
  var cache = CacheService.getScriptCache();
  var cached = cache.get('meta_tz_ok');
  if (cached === '1') return;
  var url = 'https://graph.facebook.com/' + META_API_VERSION + '/' + config.accountId + '?fields=timezone_name&access_token=' + encodeURIComponent(config.token);
  var res = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  var body = JSON.parse(res.getContentText());
  if (body.error) {
    throw new Error('Failed to fetch ad account info: ' + body.error.message);
  }
  if (body.timezone_name !== META_TZ) {
    throw new Error('Meta ad account timezone is ' + body.timezone_name + ', not ' + META_TZ + '. Auto sync stopped to prevent date misalignment.');
  }
  cache.put('meta_tz_ok', '1', 21600);
}

/** insights取得の共通部分（level と対象キャンペーンIDだけ変えて使う）。 */
function fetchInsightsRows_(config, level, fields, campaignIds, dateStr) {
  var timeRange = JSON.stringify({ since: dateStr, until: dateStr });
  var filtering = JSON.stringify([{ field: 'campaign.id', operator: 'IN', value: campaignIds }]);
  var url = 'https://graph.facebook.com/' + META_API_VERSION + '/' + config.accountId + '/insights?level=' + level + '&fields=' + encodeURIComponent(fields) + '&time_range=' + encodeURIComponent(timeRange) + '&filtering=' + encodeURIComponent(filtering) + '&limit=200&access_token=' + encodeURIComponent(config.token);
  var res = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  var body = JSON.parse(res.getContentText());
  if (body.error) {
    throw new Error('Meta API error: ' + body.error.message);
  }
  return body.data || [];
}

function findActionValue_(list, actionType) {
  if (!list || !actionType) return null;
  for (var i = 0; i < list.length; i++) {
    if (list[i].action_type === actionType) return Number(list[i].value) || 0;
  }
  return null;
}

/**
 * 旧+Ver2 の合算ユニークReach/Frequency を level=account + campaign.id IN で取得する。
 * 取得できない・値が不自然な場合は null を返し、呼び出し側は日次シートのK・L列を更新しない。
 * 妥当性: max(旧Reach, Ver2Reach) <= 合算Reach <= 旧Reach + Ver2Reach（0.5%の丸め誤差を許容）
 */
function fetchCombinedReach_(config, campaignIds, dateStr, oldReach, v2Reach, totalImpressions) {
  var rows = fetchInsightsRows_(config, 'account', 'reach,frequency,impressions', campaignIds, dateStr);
  if (rows.length === 0) return null;
  var reach = Number(rows[0].reach) || 0;
  if (reach <= 0) return null;
  var lower = Math.max(oldReach, v2Reach) * 0.995;
  var upper = (oldReach + v2Reach) * 1.005;
  if (reach < lower || reach > upper) return null;
  var imp = Number(rows[0].impressions) || totalImpressions;
  var frequency = Number(rows[0].frequency) || (imp / reach);
  return { reach: reach, frequency: frequency };
}

/**
 * 日次集計。
 * ・広告費/Imp/クリック/LPV/CPM は 旧+Ver2 の合算
 * ・結果(I/J)は旧キャンペーン行のみ（META_RESULT_ACTION_TYPE）。Ver2のLeadは混ぜない
 * ・Ver2のLeadは values.v2 に分けて返す（T/U列用）。action_type未登録・開始日前は null
 * ・Reach/Frequency: Ver2配信日は合算ユニーク値が取れた場合のみ値を返し、
 *   取れない場合は null（= 日次シートの既存値を更新しない）。Ver2が無い日は従来どおり
 */
function fetchMetaDailyInsights_(config, dateStr) {
  var v2 = getActiveV2_(dateStr);
  var ids = v2 ? config.campaignIds.concat([v2.campaignId]) : config.campaignIds;
  var fields = 'campaign_id,campaign_name,spend,impressions,inline_link_clicks,actions,cost_per_action_type,reach,frequency';
  var rows = fetchInsightsRows_(config, 'campaign', fields, ids, dateStr);
  if (rows.length === 0) {
    return { spend: 0, impressions: 0, linkClicks: 0, lpv: 0, result: 0, resultCost: '', reach: 0, frequency: 0, cpm: 0, v2: null, breakdown: [] };
  }
  var totalSpend = 0;
  var totalImpressions = 0;
  var totalReach = 0; // 旧キャンペーン分のみ
  var totalLinkClicks = 0;
  var totalLpv = 0;
  var totalResult = 0;
  var totalResultCost = 0;
  var v2Seen = false;
  var v2Reach = 0;
  var v2Leads = 0;
  var v2LeadCostSum = 0;
  var breakdown = [];
  rows.forEach(function (row) {
    var isV2 = !!v2 && String(row.campaign_id) === v2.campaignId;
    var spend = Number(row.spend) || 0;
    var impressions = Number(row.impressions) || 0;
    var linkClicks = Number(row.inline_link_clicks) || 0;
    var reach = Number(row.reach) || 0;
    totalSpend += spend;
    totalImpressions += impressions;
    totalLinkClicks += linkClicks;
    if (isV2) {
      v2Seen = true;
      v2Reach += reach;
    } else {
      totalReach += reach;
    }
    var lpv = findActionValue_(row.actions, 'landing_page_view') || 0;
    totalLpv += lpv;
    var actionType = isV2 ? v2.actionType : config.resultActionType;
    var result = findActionValue_(row.actions, actionType) || 0;
    var unitCost = '';
    if (result > 0) {
      var foundCost = findActionValue_(row.cost_per_action_type, actionType);
      unitCost = (foundCost !== null) ? foundCost : (spend / result);
    }
    if (isV2) {
      v2Leads += result;
      if (result > 0) v2LeadCostSum += unitCost * result;
    } else {
      totalResult += result;
      if (result > 0) totalResultCost += unitCost * result;
    }
    breakdown.push({
      date: dateStr,
      campaignId: String(row.campaign_id),
      campaignName: row.campaign_name || '',
      kind: isV2 ? 'Ver2' : '旧',
      spend: spend,
      impressions: impressions,
      linkClicks: linkClicks,
      lpv: lpv,
      reach: reach,
      frequency: Number(row.frequency) || 0,
      cpm: impressions > 0 ? ((spend / impressions) * 1000) : 0,
      actionType: actionType || '',
      count: result,
      unitCost: unitCost
    });
  });

  var reachOut = totalReach;
  var frequencyOut = totalReach > 0 ? (totalImpressions / totalReach) : 0;
  if (v2Seen) {
    // 旧+Ver2が同日に配信: 単純合算はユニークReachではない。合算値が取れた時だけ更新する
    var combined = null;
    try {
      combined = fetchCombinedReach_(config, ids, dateStr, totalReach, v2Reach, totalImpressions);
    } catch (e) {
      console.error('[MetaSync ' + dateStr + '] combined reach failed: ' + e.message);
    }
    reachOut = combined ? combined.reach : null;
    frequencyOut = combined ? combined.frequency : null;
  }

  return {
    spend: totalSpend,
    impressions: totalImpressions,
    linkClicks: totalLinkClicks,
    lpv: totalLpv,
    result: totalResult,
    resultCost: totalResult > 0 ? (totalResultCost / totalResult) : '',
    reach: reachOut,
    frequency: frequencyOut,
    cpm: totalImpressions > 0 ? ((totalSpend / totalImpressions) * 1000) : 0,
    v2: (v2 && v2.actionType) ? { leads: v2Leads, leadCost: v2Leads > 0 ? (v2LeadCostSum / v2Leads) : '' } : null,
    breakdown: breakdown
  };
}

function findOrCreateRowForDate_(sheet, dateStr) {
  var lastRow = Math.max(sheet.getLastRow(), 1);
  var numRows = Math.min(META_MAX_ROWS, Math.max(lastRow - 1, 0));
  if (numRows > 0) {
    var dates = sheet.getRange(2, META_DATE_COL, numRows, 1).getValues();
    for (var i = 0; i < dates.length; i++) {
      var v = dates[i][0];
      if (v instanceof Date) {
        var s = Utilities.formatDate(v, META_TZ, 'yyyy-MM-dd');
        if (s === dateStr) return 2 + i;
      }
    }
  }
  for (var r = 2; r <= META_MAX_ROWS + 1; r++) {
    if (!sheet.getRange(r, META_DATE_COL).getValue()) {
      var d = Utilities.parseDate(dateStr, META_TZ, 'yyyy-MM-dd');
      sheet.getRange(r, META_DATE_COL).setValue(d);
      return r;
    }
  }
  throw new Error('No empty row available (limit ' + META_MAX_ROWS + ' rows reached).');
}

function upsertDailyRow_(sheet, dateStr, values) {
  var row = findOrCreateRowForDate_(sheet, dateStr);
  sheet.getRange(row, META_SPEND_COL).setValue(values.spend);
  sheet.getRange(row, META_IMP_COL).setValue(values.impressions);
  sheet.getRange(row, META_CLICK_COL).setValue(values.linkClicks);
  sheet.getRange(row, META_LPV_COL).setValue(values.lpv);
  sheet.getRange(row, META_RESULT_COL).setValue(values.result);
  sheet.getRange(row, META_RESULT_COST_COL).setValue(values.resultCost);
  // Reach/Frequency が null（合算値を取得できなかった日）は既存値を空欄で上書きしない
  if (values.reach !== null) sheet.getRange(row, META_REACH_COL).setValue(values.reach);
  if (values.frequency !== null) sheet.getRange(row, META_FREQUENCY_COL).setValue(values.frequency);
  sheet.getRange(row, META_CPM_COL).setValue(values.cpm);
  // Ver2が無効（未登録・開始日前・action_type未登録）の日は T/U に書き込まない
  if (values.v2) {
    sheet.getRange(row, META_V2_LEAD_COL).setValue(values.v2.leads);
    sheet.getRange(row, META_V2_LEAD_COST_COL).setValue(values.v2.leadCost);
  }
  return row;
}

/**
 * 「Meta内訳」へ 日付×キャンペーンID で上書き（重複させない）。
 * シートが無い場合は何もしない（作成は setupVer2Sheets_ で明示的に行う）。
 */
function upsertBreakdownRows_(ss, items) {
  var sheet = ss.getSheetByName(META_BREAKDOWN_SHEET_NAME);
  if (!sheet || items.length === 0) return;
  var lastRow = Math.max(sheet.getLastRow(), 1);
  var existing = lastRow > 1 ? sheet.getRange(2, 1, lastRow - 1, 2).getValues() : [];
  items.forEach(function (it) {
    var target = 0;
    for (var i = 0; i < existing.length; i++) {
      var d = existing[i][0] instanceof Date ? Utilities.formatDate(existing[i][0], META_TZ, 'yyyy-MM-dd') : String(existing[i][0]);
      if (d === it.date && String(existing[i][1]) === it.campaignId) {
        target = 2 + i;
        break;
      }
    }
    var dateValue = Utilities.parseDate(it.date, META_TZ, 'yyyy-MM-dd');
    if (!target) {
      target = lastRow + 1;
      lastRow = target;
      existing.push([dateValue, it.campaignId]);
    }
    sheet.getRange(target, 1, 1, META_BREAKDOWN_HEADERS.length).setValues([[
      dateValue, it.campaignId, it.campaignName, it.kind,
      it.spend, it.impressions, it.linkClicks, it.lpv, it.reach, it.frequency, it.cpm,
      it.actionType, it.count, it.unitCost
    ]]);
  });
}

function syncMetaInsightsForDate_(dateStr) {
  var logPrefix = '[MetaSync ' + dateStr + '] ';
  try {
    var config = getMetaConfig_();
    verifyAdAccountTimezone_(config);
    var values = fetchMetaDailyInsights_(config, dateStr);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(META_SHEET_NAME);
    if (!sheet) throw new Error('Sheet not found: ' + META_SHEET_NAME);
    var row = upsertDailyRow_(sheet, dateStr, values);
    try {
      // 内訳の失敗で日次シートの更新結果を巻き戻さない
      upsertBreakdownRows_(ss, values.breakdown || []);
    } catch (be) {
      console.error(logPrefix + 'breakdown failed: ' + be.message);
    }
    console.log(logPrefix + 'success row=' + row + ' spend=' + values.spend + ' imp=' + values.impressions + ' link_clicks=' + values.linkClicks + ' lpv=' + values.lpv + ' result=' + values.result + ' result_cost=' + values.resultCost + ' reach=' + values.reach + ' v2_leads=' + (values.v2 ? values.v2.leads : '-'));
    return { ok: true, row: row, values: values };
  } catch (e) {
    console.error(logPrefix + 'failed: ' + e.message);
    return { ok: false, error: e.message };
  }
}

function dailyFetchToday() {
  var dateStr = Utilities.formatDate(new Date(), META_TZ, 'yyyy-MM-dd');
  syncMetaInsightsForDate_(dateStr);
}

function dailyCorrectYesterday() {
  var yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  var dateStr = Utilities.formatDate(yesterday, META_TZ, 'yyyy-MM-dd');
  syncMetaInsightsForDate_(dateStr);
}

function manualRefetchDate(dateStr) {
  var result = syncMetaInsightsForDate_(dateStr);
  if (!result.ok) {
    throw new Error(result.error);
  }
  return result;
}

function onOpen() {
  SpreadsheetApp.getUi().createMenu('Meta連携').addItem('指定日を再取得...', 'promptManualRefetch_').addToUi();
}

function promptManualRefetch_() {
  var ui = SpreadsheetApp.getUi();
  var resp = ui.prompt('指定日を再取得', '再取得する日付を入力してください（例: 2026-09-05）', ui.ButtonSet.OK_CANCEL);
  if (resp.getSelectedButton() !== ui.Button.OK) return;
  var dateStr = resp.getResponseText().trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    ui.alert('日付は YYYY-MM-DD 形式で入力してください。');
    return;
  }
  var result = syncMetaInsightsForDate_(dateStr);
  if (result.ok) {
    ui.alert('取得成功: ' + dateStr + ' の行を更新しました（行番号 ' + result.row + '）。');
  } else {
    ui.alert('取得失敗: ' + result.error);
  }
}

function installMetaSyncTriggers_() {
  var triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(function (t) {
    var fn = t.getHandlerFunction();
    if (fn === 'dailyFetchToday' || fn === 'dailyCorrectYesterday') {
      ScriptApp.deleteTrigger(t);
    }
  });
  ScriptApp.newTrigger('dailyFetchToday').timeBased().everyDays(1).atHour(22).nearMinute(0).inTimezone(META_TZ).create();
  ScriptApp.newTrigger('dailyCorrectYesterday').timeBased().everyDays(1).atHour(9).nearMinute(0).inTimezone(META_TZ).create();
}

/**
 * Ver2公開後に1回だけ手動実行する初期設定（冪等。既に設定済みの部分は触らない）。
 *  1. 日次広告実績の T1「Ver2 Lead数」/ U1「Ver2 Lead単価」ヘッダーと書式（I・J列と同じ見た目）
 *  2. T・U列を、既存の「自動計算列は編集しないでください」保護の対象外にする（入力列と同じ扱い）
 *  3. 「Meta内訳」シートの作成
 * 既存セル・数式・日次データ・トリガーには書き込まない。
 */
function setupVer2Sheets_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(META_SHEET_NAME);
  if (!sheet) throw new Error('Sheet not found: ' + META_SHEET_NAME);

  if (sheet.getMaxColumns() < META_V2_LEAD_COST_COL) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), META_V2_LEAD_COST_COL - sheet.getMaxColumns());
  }
  var pairs = [
    { col: META_V2_LEAD_COL, srcCol: META_RESULT_COL, title: 'Ver2 Lead数' },
    { col: META_V2_LEAD_COST_COL, srcCol: META_RESULT_COST_COL, title: 'Ver2 Lead単価' }
  ];
  pairs.forEach(function (p) {
    var header = sheet.getRange(1, p.col);
    if (header.getValue() === '') {
      sheet.getRange(1, p.srcCol, META_MAX_ROWS + 1, 1)
        .copyTo(sheet.getRange(1, p.col, META_MAX_ROWS + 1, 1), SpreadsheetApp.CopyPasteType.PASTE_FORMAT, false);
      sheet.setColumnWidth(p.col, sheet.getColumnWidth(p.srcCol));
      header.setValue(p.title);
    }
  });

  var protections = sheet.getProtections(SpreadsheetApp.ProtectionType.SHEET);
  if (protections.length > 0 && protections[0].canEdit()) {
    var protection = protections[0];
    var unprotected = protection.getUnprotectedRanges();
    var covered = unprotected.some(function (r) {
      return r.getRow() <= 2 && r.getColumn() <= META_V2_LEAD_COL && r.getLastColumn() >= META_V2_LEAD_COST_COL;
    });
    if (!covered) {
      unprotected.push(sheet.getRange(2, META_V2_LEAD_COL, META_MAX_ROWS, 2));
      protection.setUnprotectedRanges(unprotected);
    }
  }

  var breakdown = ss.getSheetByName(META_BREAKDOWN_SHEET_NAME);
  if (!breakdown) {
    breakdown = ss.insertSheet(META_BREAKDOWN_SHEET_NAME);
    breakdown.getRange(1, 1, 1, META_BREAKDOWN_HEADERS.length).setValues([META_BREAKDOWN_HEADERS]);
    breakdown.getRange(2, 1, META_MAX_ROWS * 4, 1).setNumberFormat('yyyy/mm/dd');
    breakdown.getRange(2, 2, META_MAX_ROWS * 4, 1).setNumberFormat('@'); // キャンペーンIDは文字列
    breakdown.setFrozenRows(1);
  }
}

/**
 * 公開後の確認用（読み取り専用。シートには書かない）。
 * Ver2の actions / cost_per_action_type に実際に返る action_type と、
 * 旧+Ver2 の合算Reach が account レベルで取得できるかをログに出す。
 * 例: inspectV2ActionTypes_('2026-xx-xx')
 */
function inspectV2ActionTypes_(dateStr) {
  var config = getMetaConfig_();
  var v2 = getMetaV2Config_();
  if (!v2) throw new Error('META_V2_CAMPAIGN_ID is missing in Script Properties.');
  var rows = fetchInsightsRows_(config, 'campaign', 'campaign_id,campaign_name,spend,impressions,actions,cost_per_action_type,reach,frequency', [v2.campaignId], dateStr);
  console.log('Ver2 campaign rows: ' + JSON.stringify(rows, null, 2));
  var combined = fetchInsightsRows_(config, 'account', 'reach,frequency,impressions', config.campaignIds.concat([v2.campaignId]), dateStr);
  console.log('combined account-level (旧+Ver2): ' + JSON.stringify(combined));
}
