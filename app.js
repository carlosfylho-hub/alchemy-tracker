// =================================================================================
// MOTOR PRINCIPAL DO APLICATIVO (CÁLCULOS, SINCRONIZAÇÃO, TABELAS E BACKUP)
// =================================================================================

let currentTab = "alchemy";
let lastProfTab = "alchemy";
let backupTimeout = null;
let ahTaxRate = 0.05;
let sortConfig = { key: null, dir: 'desc' };
let previousPrices = {};

let profSettings = JSON.parse(JSON.stringify(DEFAULT_PROF_SETTINGS));

let state = {};
for (const k in DEFAULT_DATA) {
  state[k] = JSON.parse(JSON.stringify(DEFAULT_DATA[k]));
}

let userEdits = {};

// ── AUTO BACKUP & RESTAURAÇÃO NA NUVEM ──
function scheduleBackup() {
  if (backupTimeout) clearTimeout(backupTimeout);
  backupTimeout = setTimeout(autoBackup, 5000);
}

function autoBackup() {
  if (SCRIPT_URL === "COLE_AQUI_A_URL_DO_WEB_APP_DO_APPS_SCRIPT") return;
  const statusEl = document.getElementById("syncStatus");
  statusEl.textContent = "Salvando na nuvem...";
  statusEl.className = "text-xs text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full font-medium";

  const payload = { profSettings, userEdits, priceHistory };
  fetch(SCRIPT_URL, { method: "POST", body: JSON.stringify(payload) }).then(() => {
    savePreviousPrices();
    statusEl.textContent = "✓ Salvo na Nuvem";
    statusEl.className = "text-xs text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full font-medium";
    setTimeout(() => {
      statusEl.textContent = "Dados locais";
      statusEl.className = "text-xs text-slate-400 bg-slate-400/10 px-2.5 py-1 rounded-full font-medium";
    }, 3000);
  }).catch(err => console.error("Erro no backup:", err));
}

async function restoreFromCloud() {
  if (SCRIPT_URL === "COLE_AQUI_A_URL_DO_WEB_APP_DO_APPS_SCRIPT") {
    alert("Configure o SCRIPT_URL primeiro!");
    return;
  }
  const statusEl = document.getElementById("syncStatus");
  statusEl.textContent = "Restaurando...";
  statusEl.className = "text-xs text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full font-medium";

  try {
    const resp = await fetch(SCRIPT_URL);
    const json = await resp.json();
    if (json.status === "success" && json.data) {
      const data = json.data;
      if (data.profSettings) {
        for (const prof in DEFAULT_PROF_SETTINGS) {
          if (data.profSettings[prof]) profSettings[prof] = { ...DEFAULT_PROF_SETTINGS[prof], ...data.profSettings[prof] };
        }
      }
      if (data.userEdits) {
        userEdits = data.userEdits;
        for (const k in DEFAULT_DATA) state[k] = JSON.parse(JSON.stringify(DEFAULT_DATA[k]));
        for (const prof in userEdits) {
          if (!state[prof]) continue;
          for (const idStr in userEdits[prof]) {
            const item = state[prof].find(i => i.id === parseInt(idStr));
            if (!item) continue;
            const edits = userEdits[prof][idStr];
            if (edits.ahPrice !== undefined) item.ahPrice = edits.ahPrice;
            if (edits.baseCost !== undefined) item.baseCost = edits.baseCost;
            if (edits.concCost !== undefined) item.concCost = edits.concCost;
          }
        }
      }
      if (data.priceHistory) {
        priceHistory = data.priceHistory;
        savePriceHistory();
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ profSettings, userEdits }));
      updateInputsFromState();
      renderAll();
      alert("Restaurado com sucesso!");
      statusEl.textContent = "✓ Restaurado";
      statusEl.className = "text-xs text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full font-medium";
      setTimeout(() => {
        statusEl.textContent = "Dados locais";
        statusEl.className = "text-xs text-slate-400 bg-slate-400/10 px-2.5 py-1 rounded-full font-medium";
      }, 5000);
    }
  } catch (err) {
    alert("Erro ao restaurar: " + err.message);
    statusEl.textContent = "✗ Erro";
  }
}

// ── TENDÊNCIAS (SETAS ▲/▼) ──
function savePreviousPrices() {
  const prices = {};
  for (const prof in state) {
    prices[prof] = {};
    state[prof].forEach(item => { prices[prof][item.id] = item.ahPrice; });
  }
  try { localStorage.setItem(PREV_PRICES_KEY, JSON.stringify(prices)); } catch (e) { }
}

function loadPreviousPrices() {
  try {
    const raw = localStorage.getItem(PREV_PRICES_KEY);
    if (raw) previousPrices = JSON.parse(raw);
  } catch (e) { }
}

function getTrendArrow(item) {
  const prof = currentTab === "history" ? histSelectedProf : currentTab;
  const profPrev = previousPrices[prof];
  if (!profPrev) return '';
  const prev = profPrev[item.id];
  if (prev === undefined || prev === null) return '';
  const diff = item.ahPrice - prev;
  if (Math.abs(diff) < 0.1) return '';
  if (diff > 0) return `<span class="trend-up" title="⬆ Subiu ${formatNum(diff, 1)}g">▲</span>`;
  return `<span class="trend-down" title="⬇ Caiu ${formatNum(Math.abs(diff), 1)}g">▼</span>`;
}

// ── ORDENAÇÃO E TAXA AH ──
function sortBy(key) {
  if (sortConfig.key === key) {
    sortConfig.dir = sortConfig.dir === 'desc' ? 'asc' : 'desc';
  } else {
    sortConfig.key = key;
    sortConfig.dir = 'desc';
  }
  renderAll();
}

function sortIndicator(key) {
  if (sortConfig.key !== key) return '';
  return `<span class="sort-indicator">${sortConfig.dir === 'desc' ? '▼' : '▲'}</span>`;
}

function clearSort() {
  sortConfig = { key: null, dir: 'desc' };
  renderAll();
}

function toggleAhTax() {
  ahTaxRate = ahTaxRate > 0 ? 0 : 0.05;
  const btn = document.getElementById('tradeChatToggle');
  if (ahTaxRate === 0) {
    btn.classList.add('direct');
    btn.innerHTML = '🤝 Venda Direta (0%)';
  } else {
    btn.classList.remove('direct');
    btn.innerHTML = '🏪 AH (5% taxa)';
  }
  renderAll();
}

// ── PERSISTÊNCIA LOCAL ──
function loadSavedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) { updateInputsFromState(); return; }
    const saved = JSON.parse(raw);
    if (saved.profSettings) {
      for (const prof in DEFAULT_PROF_SETTINGS) {
        if (saved.profSettings[prof]) profSettings[prof] = { ...DEFAULT_PROF_SETTINGS[prof], ...saved.profSettings[prof] };
      }
    }
    if (saved.userEdits) {
      userEdits = saved.userEdits;
      for (const prof in userEdits) {
        if (!state[prof]) continue;
        for (const idStr in userEdits[prof]) {
          const item = state[prof].find(i => i.id === parseInt(idStr));
          if (!item) continue;
          const edits = userEdits[prof][idStr];
          if (edits.ahPrice !== undefined) item.ahPrice = edits.ahPrice;
          if (edits.baseCost !== undefined) item.baseCost = edits.baseCost;
          if (edits.concCost !== undefined) item.concCost = edits.concCost;
        }
      }
    }
  } catch (e) { }
  updateInputsFromState();
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ profSettings, userEdits }));
    scheduleBackup();
  } catch (e) { }
}

// ── NAVEGAÇÃO ENTRE ABAS ──
function switchTab(tabKey) {
  if (tabKey !== "history") {
    lastProfTab = tabKey;
  }
  currentTab = tabKey;
  document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
  document.getElementById("btn-" + tabKey).classList.add("active");

  const names = {
    alchemy: "Alchemy Conc",
    jewelcrafting: "Jewelcrafting Conc",
    enchanting: "Enchanting Conc",
    inscription: "Inscription Conc"
  };

  const profControls = document.getElementById("profControlsCard");
  const topRanking = document.getElementById("topRankingCard");
  const tabContent = document.getElementById("tabContentContainer");
  const historyContent = document.getElementById("historyTabContainer");

  if (tabKey === "history") {
    profControls.classList.add("hidden");
    topRanking.classList.add("hidden");
    tabContent.classList.add("hidden");
    historyContent.classList.remove("hidden");
    populateHistItemSelect();
    renderHistoryView();
  } else {
    profControls.classList.remove("hidden");
    topRanking.classList.remove("hidden");
    tabContent.classList.remove("hidden");
    historyContent.classList.add("hidden");
    document.getElementById("activeProfLabel").textContent = names[tabKey];
    updateInputsFromState();
    renderAll();
  }
}

function updateInputsFromState() {
  const prof = currentTab === "history" ? lastProfTab : currentTab;
  const s = profSettings[prof];
  document.getElementById("resInput").value = s.res;
  document.getElementById("mcInput").value = s.mc;
  document.getElementById("ingInput").value = s.ing;
}

function updateProfAttr(attr, val) {
  const prof = currentTab === "history" ? lastProfTab : currentTab;
  profSettings[prof][attr] = parseFloat(val) || 0;
  saveState();
  updateCalculatedValues();
}

function updateItemField(id, field, val) {
  const prof = currentTab === "history" ? lastProfTab : currentTab;
  const num = parseFloat(val);
  const item = state[prof].find(i => i.id === id);
  if (!item) return;
  item[field] = isNaN(num) ? 0 : num;

  if (!userEdits[prof]) userEdits[prof] = {};
  if (!userEdits[prof][id]) userEdits[prof][id] = {};
  userEdits[prof][id][field] = item[field];

  if (recordHistoryEntry(prof, item, "Edição")) {
    savePriceHistory();
  }

  saveState();
  updateCalculatedValues();
}

function formatNum(val, decimals = 1) {
  if (isNaN(val) || val === null) return "0,0";
  return val.toLocaleString("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

function confirmReset() { document.getElementById("resetDialog").showModal(); }
function doReset() {
  document.getElementById("resetDialog").close();
  profSettings = JSON.parse(JSON.stringify(DEFAULT_PROF_SETTINGS));
  userEdits = {};
  for (const k in DEFAULT_DATA) state[k] = JSON.parse(JSON.stringify(DEFAULT_DATA[k]));
  localStorage.removeItem(STORAGE_KEY);
  updateInputsFromState();
  renderAll();
}

function exportData() {
  const blob = new Blob([JSON.stringify({ profSettings, userEdits, priceHistory }, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "tracker_conc_backup_" + new Date().toISOString().slice(0, 10) + ".json";
  a.click();
  URL.revokeObjectURL(a.href);
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const data = JSON.parse(e.target.result);
      if (data.profSettings) {
        for (const prof in DEFAULT_PROF_SETTINGS) {
          if (data.profSettings[prof]) profSettings[prof] = { ...DEFAULT_PROF_SETTINGS[prof], ...data.profSettings[prof] };
        }
      }
      if (data.userEdits) {
        userEdits = data.userEdits;
        for (const k in DEFAULT_DATA) state[k] = JSON.parse(JSON.stringify(DEFAULT_DATA[k]));
        for (const prof in userEdits) {
          if (!state[prof]) continue;
          for (const idStr in userEdits[prof]) {
            const item = state[prof].find(i => i.id === parseInt(idStr));
            if (!item) continue;
            const edits = userEdits[prof][idStr];
            if (edits.ahPrice !== undefined) item.ahPrice = edits.ahPrice;
            if (edits.baseCost !== undefined) item.baseCost = edits.baseCost;
            if (edits.concCost !== undefined) item.concCost = edits.concCost;
          }
        }
      }
      if (data.priceHistory) {
        priceHistory = data.priceHistory;
        savePriceHistory();
      }
      saveState();
      updateInputsFromState();
      renderAll();
      alert("Importado com sucesso!");
    } catch (err) { alert("Erro ao importar: " + err.message); }
  };
  reader.readAsText(file);
  event.target.value = "";
}

// ── LEITOR JSONP / FETCH PARA GOOGLE SHEETS (SEM BLOQUEIO DE CORS) ──
function fetchSheetData(sheetName) {
  return new Promise((resolve, reject) => {
    const cbName = "__gviz_cb_" + Date.now() + "_" + Math.floor(Math.random() * 10000);
    const script = document.createElement("script");
    let timer = setTimeout(() => {
      cleanup();
      reject(new Error("Tempo limite excedido ao conectar com a planilha"));
    }, 12000);

    function cleanup() {
      clearTimeout(timer);
      delete window[cbName];
      if (script.parentNode) script.parentNode.removeChild(script);
    }

    window[cbName] = function (json) {
      cleanup();
      if (json && json.status === "ok" && json.table) {
        resolve(json);
      } else {
        reject(new Error("Resposta inválida da planilha"));
      }
    };

    script.onerror = function () {
      cleanup();
      const fetchUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}&_=${Date.now()}`;
      fetch(fetchUrl)
        .then(r => r.text())
        .then(text => {
          const s = text.indexOf("{");
          const e = text.lastIndexOf("}");
          if (s === -1 || e === -1) throw new Error("Formato inesperado");
          resolve(JSON.parse(text.substring(s, e + 1)));
        })
        .catch(reject);
    };

    script.src = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=responseHandler:${cbName}&sheet=${encodeURIComponent(sheetName)}&_=${Date.now()}`;
    document.head.appendChild(script);
  });
}

// ── SINCRONIZAÇÃO ROBUSTA COM O GOOGLE SHEETS + GRAVAÇÃO AUTOMÁTICA NO HISTÓRICO ──
async function syncWithGoogleSheets() {
  const targetProf = currentTab === "history" ? histSelectedProf : currentTab;
  const statusEl = document.getElementById("syncStatus");
  statusEl.textContent = "⏳ Sincronizando com a Planilha...";
  statusEl.className = "text-xs text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full font-medium";

  const sheetName = SHEET_TABS[targetProf];
  if (!sheetName) return;

  try {
    savePreviousPrices();

    const json = await fetchSheetData(sheetName);
    const rows = json.table.rows || [];
    let updatedCount = 0;
    let historyRecordedCount = 0;
    const items = state[targetProf];
    const s = profSettings[targetProf];
    const resDec = (s.res || 0) / 100;
    const seenIds = new Set();

    rows.forEach(row => {
      if (!row.c) return;
      for (let i = 0; i < row.c.length; i++) {
        const cell = row.c[i];
        if (!cell || cell.v === null || cell.v === undefined) continue;
        const valStr = String(cell.v).trim();
        if (!valStr.includes("Tier 2")) continue;

        const c1 = row.c[i + 1], c2 = row.c[i + 2], c3 = row.c[i + 3], c4 = row.c[i + 4];
        if (!c1 || typeof c1.v !== "number" || !c2 || typeof c2.v !== "number" || !c3 || typeof c3.v !== "number" || !c4 || typeof c4.v !== "number") {
          continue;
        }

        const cleanVal = valStr.toLowerCase().replace(/\s+/g, " ");
        const item = items.find(it => {
          const itClean = it.name.toLowerCase().replace(/\s+/g, " ");
          return itClean === cleanVal || itClean.replace(" tier 2", "") === cleanVal.replace(" tier 2", "");
        });

        if (!item || seenIds.has(item.id)) continue;
        seenIds.add(item.id);

        const sheetCraftingCost = c1.v;
        const sheetAhPrice = c3.v;

        const factor = 1 - resDec * 0.30;
        item.baseCost = factor > 0 ? (sheetCraftingCost / factor) : sheetCraftingCost;
        item.ahPrice = Math.round(sheetAhPrice * 100) / 100;

        if (!userEdits[targetProf]) userEdits[targetProf] = {};
        if (!userEdits[targetProf][item.id]) userEdits[targetProf][item.id] = {};
        userEdits[targetProf][item.id].ahPrice = item.ahPrice;
        userEdits[targetProf][item.id].baseCost = item.baseCost;

        if (recordHistoryEntry(targetProf, item, "Planilha")) {
          historyRecordedCount++;
        }
        updatedCount++;
      }
    });

    if (updatedCount === 0) {
      throw new Error("Nenhum item correspondente encontrado na aba " + sheetName);
    }

    savePriceHistory();
    saveState();
    if (currentTab === "history") {
      renderHistoryView();
    } else {
      renderAll();
    }

    statusEl.textContent = `✓ ${updatedCount} itens sincronizados (${historyRecordedCount} novos no histórico)!`;
    statusEl.className = "text-xs text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full font-medium";
    setTimeout(() => {
      statusEl.textContent = "Dados locais (Sincronizado)";
      statusEl.className = "text-xs text-slate-400 bg-slate-400/10 px-2.5 py-1 rounded-full font-medium";
    }, 5000);

  } catch (err) {
    console.error("Erro na sincronização:", err);
    statusEl.textContent = "✗ Erro ao sincronizar: " + err.message;
    statusEl.className = "text-xs text-red-400 bg-red-400/10 px-2.5 py-1 rounded-full font-medium";
  }
}

// ── CÁLCULOS E RENDERIZAÇÃO DAS TABELAS ──
function calcItem(item, resDec, mcDec, ingDec, refundDec) {
  const craftingCost = item.baseCost * (1 - resDec * 0.30);
  const expectedItems = item.baseYield * (1 + mcDec * item.mcFactor);
  const avgValueCraft = expectedItems * (item.ahPrice * (1 - ahTaxRate));
  const profitCraft = avgValueCraft - craftingCost;
  const roiPct = craftingCost > 0 ? (profitCraft / craftingCost) * 100 : 0;

  const effectiveConcCost = item.concCost > 0 ? item.concCost * (1 - ingDec * refundDec) : 0;
  const goldPerConc = effectiveConcCost > 0 ? profitCraft / effectiveConcCost : null;
  const profitPer1000Conc = effectiveConcCost > 0 ? (1000 / effectiveConcCost) * profitCraft : null;
  const exactCrafts1000 = effectiveConcCost > 0 ? Math.floor(1000 / effectiveConcCost) : 0;

  return { ...item, craftingCost, avgValueCraft, profitCraft, roiPct, effectiveConcCost, goldPerConc, profitPer1000Conc, exactCrafts1000 };
}

function updateCalculatedValues() {
  const prof = currentTab === "history" ? lastProfTab : currentTab;
  const s = profSettings[prof];
  const resDec = s.res / 100, mcDec = s.mc / 100, ingDec = s.ing / 100, refundDec = (s.refund || 70) / 100;
  const items = state[prof];

  items.forEach(item => {
    const c = calcItem(item, resDec, mcDec, ingDec, refundDec);
    const prefix = "calc-" + item.id + "-";
    const profitClass = c.profitCraft >= 0 ? "positive" : "negative";

    const ccEl = document.getElementById(prefix + "cc");
    const avEl = document.getElementById(prefix + "av");
    const prEl = document.getElementById(prefix + "pr");
    const roEl = document.getElementById(prefix + "roi");
    const gcEl = document.getElementById(prefix + "gc");
    const p1El = document.getElementById(prefix + "p1k");
    const trEl = document.getElementById("trend-" + item.id);

    if (ccEl) ccEl.textContent = formatNum(c.craftingCost, 1);
    if (avEl) avEl.textContent = formatNum(c.avgValueCraft, 1);
    if (prEl) { prEl.textContent = formatNum(c.profitCraft, 1); prEl.className = "py-2.5 px-2 text-right font-mono " + profitClass; }
    if (roEl) { roEl.textContent = formatNum(c.roiPct, 1) + "%"; roEl.className = "py-2.5 px-2 text-right font-mono " + profitClass; }
    if (gcEl) gcEl.textContent = c.goldPerConc !== null && c.goldPerConc > 0 ? formatNum(c.goldPerConc, 2) + " g" : "—";
    if (p1El) p1El.innerHTML = c.profitPer1000Conc !== null && c.profitPer1000Conc > 0
      ? `${formatNum(c.profitPer1000Conc, 0)} g <span class="text-[11px] text-slate-400">(~${c.exactCrafts1000}x)</span>` : "—";
    if (trEl) trEl.innerHTML = getTrendArrow(item);
  });

  renderTop5();
}

function renderTop5() {
  const prof = currentTab === "history" ? lastProfTab : currentTab;
  const s = profSettings[prof];
  const resDec = s.res / 100, mcDec = s.mc / 100, ingDec = s.ing / 100, refundDec = (s.refund || 70) / 100;
  const items = state[prof];

  const calculatedItems = items.map(item => calcItem(item, resDec, mcDec, ingDec, refundDec));
  const topContainer = document.getElementById("topRankingContainer");

  const ranked = calculatedItems
    .filter(i => i.concCost > 0 && i.goldPerConc !== null && i.goldPerConc > 0)
    .sort((a, b) => b.goldPerConc - a.goldPerConc)
    .slice(0, 5);

  if (ranked.length === 0) {
    topContainer.innerHTML = `
      <div class="col-span-5 text-center py-4 text-sm text-slate-400 bg-slate-900/50 rounded-lg border border-slate-800">
        Nenhuma receita com concentração definida (preencha o custo de concentração nas caixas abaixo para ver o ranking).
      </div>`;
  } else {
    topContainer.innerHTML = ranked.map((r, idx) => `
      <div class="bg-slate-900/90 border border-slate-700 p-3 rounded-lg flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span class="font-bold text-amber-400">#${idx + 1} ${r.category}</span>
            <button onclick="openItemHistory('${prof}', ${r.id})" class="text-xs text-sky-400 hover:text-sky-300" title="Ver gráfico de histórico">📊 Gráfico</button>
          </div>
          <div class="font-semibold text-slate-100 text-sm leading-tight">${r.name}</div>
        </div>
        <div class="mt-3 pt-2 border-t border-slate-800 flex justify-between items-baseline">
          <span class="text-xs text-slate-400">Gold/Conc:</span>
          <span class="text-base font-mono gold-conc">${formatNum(r.goldPerConc, 2)}g</span>
        </div>
        <div class="flex justify-between items-baseline text-xs mt-1">
          <span class="text-slate-400">1000 Conc (~${r.exactCrafts1000}x):</span>
          <span class="font-mono text-emerald-400 font-semibold">${formatNum(r.profitPer1000Conc, 0)}g</span>
        </div>
      </div>`).join("");
  }
}

function renderAll() {
  if (currentTab === "history") {
    renderHistoryView();
    return;
  }

  const s = profSettings[currentTab];
  const resDec = s.res / 100, mcDec = s.mc / 100, ingDec = s.ing / 100, refundDec = (s.refund || 70) / 100;
  const items = state[currentTab];
  const calculatedItems = items.map(item => calcItem(item, resDec, mcDec, ingDec, refundDec));

  renderTop5();

  const categories = [...new Set(calculatedItems.map(i => i.category))];
  const container = document.getElementById("tabContentContainer");
  container.innerHTML = "";

  const taxLabel = ahTaxRate > 0 ? 'Taxa AH: 5% inclusa' : '🤝 Venda Direta (0% taxa)';

  categories.forEach(cat => {
    let catItems = calculatedItems.filter(i => i.category === cat);

    if (sortConfig.key) {
      catItems.sort((a, b) => {
        let va = a[sortConfig.key], vb = b[sortConfig.key];
        if (va === null && vb === null) return 0;
        if (va === null) return 1;
        if (vb === null) return -1;
        if (typeof va === 'string') {
          return sortConfig.dir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
        }
        return sortConfig.dir === 'asc' ? va - vb : vb - va;
      });
    }

    let rowsHtml = "";

    catItems.forEach(item => {
      const profitClass = item.profitCraft >= 0 ? "positive" : "negative";
      const goldConcText = item.goldPerConc !== null && item.goldPerConc > 0 ? formatNum(item.goldPerConc, 2) + " g" : "—";
      const profit1000Text = item.profitPer1000Conc !== null && item.profitPer1000Conc > 0
        ? `${formatNum(item.profitPer1000Conc, 0)} g <span class="text-[11px] text-slate-400">(~${item.exactCrafts1000}x)</span>` : "—";

      const searchName = encodeURIComponent(item.name.replace(/ Tier 2$/, ''));
      const whLink = `https://www.wowhead.com/search?q=${searchName}`;
      const trendHtml = getTrendArrow(item);

      rowsHtml += `
        <tr class="hover:bg-slate-800/60 transition">
          <td class="py-2.5 px-3 font-medium text-slate-200 flex items-center justify-between gap-2">
            <a href="${whLink}" target="_blank" rel="noopener" class="wh-link" title="Ver no Wowhead">${item.name}</a>
            <button onclick="openItemHistory('${currentTab}', ${item.id})"
              class="px-1.5 py-0.5 text-xs bg-slate-800 hover:bg-slate-700 text-amber-300 rounded border border-slate-700 transition"
              title="Abrir gráfico de histórico deste item">📊</button>
          </td>
          <td id="calc-${item.id}-cc" class="py-2.5 px-2 text-right font-mono text-slate-300">${formatNum(item.craftingCost, 1)}</td>
          <td id="calc-${item.id}-av" class="py-2.5 px-2 text-right font-mono text-slate-300">${formatNum(item.avgValueCraft, 1)}</td>
          <td class="py-2.5 px-2 text-right">
            <div class="inline-flex items-center gap-1 justify-end">
              <span id="trend-${item.id}" class="w-3">${trendHtml}</span>
              <input type="number" step="0.1" value="${item.ahPrice}" class="w-24 text-sm font-mono"
                onchange="updateItemField(${item.id}, 'ahPrice', this.value)" />
            </div>
          </td>
          <td id="calc-${item.id}-pr" class="py-2.5 px-2 text-right font-mono ${profitClass}">${formatNum(item.profitCraft, 1)}</td>
          <td id="calc-${item.id}-roi" class="py-2.5 px-2 text-right font-mono ${profitClass}">${formatNum(item.roiPct, 1)}%</td>
          <td class="py-2.5 px-2 text-right bg-amber-500/5">
            <input type="number" step="1" min="0" value="${item.concCost || ''}" placeholder="0"
              class="w-20 text-sm font-mono conc-input"
              onchange="updateItemField(${item.id}, 'concCost', this.value)" />
          </td>
          <td id="calc-${item.id}-gc" class="py-2.5 px-2 text-right font-mono gold-conc bg-amber-500/5">${goldConcText}</td>
          <td id="calc-${item.id}-p1k" class="py-2.5 px-3 text-right font-mono text-emerald-400 font-semibold bg-amber-500/5">${profit1000Text}</td>
        </tr>`;
    });

    container.innerHTML += `
      <div class="card overflow-hidden shadow-lg">
        <div class="table-header px-4 py-3 border-b border-slate-700 flex justify-between items-center">
          <h3 class="font-bold text-amber-400 tracking-wide text-sm uppercase">${cat}</h3>
          <div class="flex items-center gap-3">
            ${sortConfig.key ? '<button onclick="clearSort()" class="text-[10px] text-slate-500 hover:text-slate-300 transition" title="Limpar ordenação">✕ Limpar ordem</button>' : ''}
            <span class="text-xs text-slate-400">${taxLabel}</span>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-xs md:text-sm text-left border-collapse">
            <thead>
              <tr class="border-b border-slate-700 text-[11px] uppercase text-slate-400 bg-slate-900/40">
                <th class="py-2.5 px-3 sort-header" onclick="sortBy('name')">Item (Tier 2)${sortIndicator('name')}</th>
                <th class="py-2.5 px-2 text-right sort-header" onclick="sortBy('craftingCost')">Crafting Cost${sortIndicator('craftingCost')}</th>
                <th class="py-2.5 px-2 text-right sort-header" onclick="sortBy('avgValueCraft')">Avg Value${sortIndicator('avgValueCraft')}</th>
                <th class="py-2.5 px-2 text-right sort-header" onclick="sortBy('ahPrice')">AH Price${sortIndicator('ahPrice')}</th>
                <th class="py-2.5 px-2 text-right sort-header" onclick="sortBy('profitCraft')">Profit / Craft${sortIndicator('profitCraft')}</th>
                <th class="py-2.5 px-2 text-right sort-header" onclick="sortBy('roiPct')">ROI %${sortIndicator('roiPct')}</th>
                <th class="py-2.5 px-2 text-right text-amber-400 bg-amber-500/10 sort-header" onclick="sortBy('concCost')">Conc Cost${sortIndicator('concCost')}</th>
                <th class="py-2.5 px-2 text-right text-amber-400 bg-amber-500/10 sort-header" onclick="sortBy('goldPerConc')">Gold / Conc${sortIndicator('goldPerConc')}</th>
                <th class="py-2.5 px-3 text-right text-emerald-400 bg-amber-500/10 sort-header" onclick="sortBy('profitPer1000Conc')">Lucro (1000 Conc)${sortIndicator('profitPer1000Conc')}</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800">${rowsHtml}</tbody>
          </table>
        </div>
      </div>`;
  });

  try { if (typeof $WowheadPower !== 'undefined')$WowheadPower.refreshLinks(); } catch (e) { }
}

// ── INICIALIZAÇÃO ──
loadPreviousPrices();
loadSavedState();
loadPriceHistory();
renderAll();
