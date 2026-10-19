// =================================================================================
// MÓDULO DE HISTÓRICO GRANULAR & GRÁFICOS (OPÇÃO C)
// =================================================================================

let priceHistory = { alchemy: {}, jewelcrafting: {}, enchanting: {}, inscription: {} };
let histSelectedProf = "alchemy";
let histSelectedItemId = 1;
let histTimeRange = "all";   // '1d', '7d', '30d', '90d', '180d', '365d', 'all'
let histGrouping = "raw";    // 'raw', 'day', 'week', 'month', 'quarter', 'semester', 'year'
let chartVisibility = {
  ahPrice: true,
  craftingCost: true,
  profitCraft: true,
  goldPerConc: true
};
let historyChartInstance = null;

function round2(n) {
  return Math.round((Number(n) || 0) * 100) / 100;
}

function loadPriceHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      for (const k in priceHistory) {
        if (parsed[k]) priceHistory[k] = parsed[k];
      }
    }
  } catch (e) {
    console.warn("Erro ao carregar histórico:", e);
  }
  ensureInitialHistorySnapshots();
}

function savePriceHistory() {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(priceHistory));
  } catch (e) {
    console.warn("Erro ao salvar histórico:", e);
  }
}

function ensureInitialHistorySnapshots() {
  let changed = false;
  for (const prof in state) {
    if (!priceHistory[prof]) priceHistory[prof] = {};
    const s = profSettings[prof];
    const resDec = (s.res || 0) / 100, mcDec = (s.mc || 0) / 100, ingDec = (s.ing || 0) / 100, refundDec = (s.refund || 70) / 100;
    state[prof].forEach(item => {
      if (!Array.isArray(priceHistory[prof][item.id]) || priceHistory[prof][item.id].length === 0) {
        const c = calcItem(item, resDec, mcDec, ingDec, refundDec);
        priceHistory[prof][item.id] = [{
          ts: Date.now(),
          source: "Inicial",
          ahPrice: round2(c.ahPrice),
          craftingCost: round2(c.craftingCost),
          profitCraft: round2(c.profitCraft),
          roiPct: round2(c.roiPct),
          goldPerConc: c.goldPerConc !== null ? round2(c.goldPerConc) : 0
        }];
        changed = true;
      }
    });
  }
  if (changed) savePriceHistory();
}

function recordHistoryEntry(prof, item, sourceLabel = "Edição", force = false) {
  if (!priceHistory[prof]) priceHistory[prof] = {};
  if (!Array.isArray(priceHistory[prof][item.id])) priceHistory[prof][item.id] = [];

  const s = profSettings[prof];
  const resDec = (s.res || 0) / 100, mcDec = (s.mc || 0) / 100, ingDec = (s.ing || 0) / 100, refundDec = (s.refund || 70) / 100;
  const c = calcItem(item, resDec, mcDec, ingDec, refundDec);

  const newPoint = {
    ts: Date.now(),
    source: sourceLabel,
    ahPrice: round2(c.ahPrice),
    craftingCost: round2(c.craftingCost),
    profitCraft: round2(c.profitCraft),
    roiPct: round2(c.roiPct),
    goldPerConc: c.goldPerConc !== null ? round2(c.goldPerConc) : 0
  };

  const arr = priceHistory[prof][item.id];
  const last = arr[arr.length - 1];

  if (!force && last &&
      Math.abs(last.ahPrice - newPoint.ahPrice) < 0.01 &&
      Math.abs(last.craftingCost - newPoint.craftingCost) < 0.05 &&
      Math.abs((last.goldPerConc || 0) - (newPoint.goldPerConc || 0)) < 0.01) {
    return false;
  }

  arr.push(newPoint);
  if (arr.length > MAX_HISTORY_POINTS) {
    arr.splice(0, arr.length - MAX_HISTORY_POINTS);
  }
  return true;
}

function setHistRange(rangeKey) {
  histTimeRange = rangeKey;
  ["1d", "7d", "30d", "90d", "180d", "365d", "all"].forEach(k => {
    const el = document.getElementById("range-" + k);
    if (el) el.classList.toggle("active", k === rangeKey);
  });
  renderHistoryView();
}

function setHistGrouping(groupKey) {
  histGrouping = groupKey;
  ["raw", "day", "week", "month", "quarter", "semester", "year"].forEach(k => {
    const el = document.getElementById("group-" + k);
    if (el) el.classList.toggle("active", k === groupKey);
  });
  renderHistoryView();
}

function filterLogsByRange(logs) {
  if (histTimeRange === "all") return logs;
  const now = Date.now();
  const daysMap = { "1d": 1, "7d": 7, "30d": 30, "90d": 90, "180d": 180, "365d": 365 };
  const days = daysMap[histTimeRange] || 365;
  const cutoff = now - days * 24 * 60 * 60 * 1000;
  return logs.filter(l => l.ts >= cutoff);
}

function getBucketKeyAndLabel(ts, mode) {
  const d = new Date(ts);
  const pad = n => String(n).padStart(2, "0");
  const year = d.getFullYear();
  const month = d.getMonth();
  const day = d.getDate();
  const monthsPt = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

  if (mode === "day") {
    return {
      key: `${year}-${pad(month + 1)}-${pad(day)}`,
      label: `${pad(day)}/${pad(month + 1)}/${String(year).slice(-2)}`
    };
  }
  if (mode === "week") {
    const temp = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const dayOfWeek = (temp.getDay() + 6) % 7;
    temp.setDate(temp.getDate() - dayOfWeek);
    const wy = temp.getFullYear();
    const wm = temp.getMonth() + 1;
    const wd = temp.getDate();
    return {
      key: `${wy}-W-${pad(wm)}-${pad(wd)}`,
      label: `Sem ${pad(wd)}/${pad(wm)}/${String(wy).slice(-2)}`
    };
  }
  if (mode === "month") {
    return {
      key: `${year}-${pad(month + 1)}`,
      label: `${monthsPt[month]}/${year}`
    };
  }
  if (mode === "quarter") {
    const q = Math.floor(month / 3) + 1;
    return {
      key: `${year}-Q${q}`,
      label: `${q}º Trim/${year}`
    };
  }
  if (mode === "semester") {
    const sem = month < 6 ? 1 : 2;
    return {
      key: `${year}-S${sem}`,
      label: `${sem}º Sem/${year}`
    };
  }
  if (mode === "year") {
    return {
      key: `${year}`,
      label: `Ano ${year}`
    };
  }
  return {
    key: String(ts),
    label: formatDateTime(ts)
  };
}

function aggregateLogs(logs, mode) {
  if (mode === "raw") {
    return logs.map(l => ({
      label: formatDateTime(l.ts),
      source: l.source || "Auto",
      count: 1,
      ahPrice: l.ahPrice,
      minAh: l.ahPrice,
      maxAh: l.ahPrice,
      craftingCost: l.craftingCost,
      profitCraft: l.profitCraft,
      roiPct: l.roiPct,
      goldPerConc: l.goldPerConc || 0
    }));
  }

  const bucketsMap = new Map();
  logs.forEach(l => {
    const { key, label } = getBucketKeyAndLabel(l.ts, mode);
    if (!bucketsMap.has(key)) {
      bucketsMap.set(key, { key, label, items: [] });
    }
    bucketsMap.get(key).items.push(l);
  });

  const avg = arr => arr.reduce((a, b) => a + b, 0) / (arr.length || 1);

  return Array.from(bucketsMap.values()).map(b => {
    const ahs = b.items.map(x => x.ahPrice);
    return {
      label: b.label,
      source: `${b.items.length} leituras`,
      count: b.items.length,
      ahPrice: round2(avg(ahs)),
      minAh: round2(Math.min(...ahs)),
      maxAh: round2(Math.max(...ahs)),
      craftingCost: round2(avg(b.items.map(x => x.craftingCost))),
      profitCraft: round2(avg(b.items.map(x => x.profitCraft))),
      roiPct: round2(avg(b.items.map(x => x.roiPct))),
      goldPerConc: round2(avg(b.items.map(x => x.goldPerConc || 0)))
    };
  });
}

function openItemHistory(prof, itemId) {
  histSelectedProf = prof;
  histSelectedItemId = itemId;
  document.getElementById("histProfSelect").value = prof;
  document.getElementById("histSearchInput").value = "";
  populateHistItemSelect();
  document.getElementById("histItemSelect").value = String(itemId);
  switchTab("history");
}

function onHistProfChange(newProf) {
  histSelectedProf = newProf;
  populateHistItemSelect();
  renderHistoryView();
}

function populateHistItemSelect() {
  const sel = document.getElementById("histItemSelect");
  const q = (document.getElementById("histSearchInput").value || "").toLowerCase().trim();
  const list = (state[histSelectedProf] || []).filter(it => !q || it.name.toLowerCase().includes(q));

  if (list.length === 0) {
    sel.innerHTML = `<option value="">Nenhuma receita encontrada</option>`;
    return;
  }

  const exists = list.some(i => i.id === Number(histSelectedItemId));
  if (!exists) histSelectedItemId = list[0].id;

  sel.innerHTML = list.map(i => `<option value="${i.id}" ${i.id === Number(histSelectedItemId) ? "selected" : ""}>[${i.category}] ${i.name}</option>`).join("");
}

function onHistItemChange(itemIdStr) {
  histSelectedItemId = parseInt(itemIdStr, 10);
  renderHistoryView();
}

function toggleChartSeries(seriesKey) {
  chartVisibility[seriesKey] = !chartVisibility[seriesKey];
  const btn = document.getElementById("toggle-series-" + seriesKey);
  if (btn) btn.classList.toggle("on", chartVisibility[seriesKey]);
  renderHistoryView();
}

function recordCurrentItemSnapshot() {
  const items = state[histSelectedProf] || [];
  const item = items.find(i => i.id === Number(histSelectedItemId));
  if (!item) return;
  recordHistoryEntry(histSelectedProf, item, "Manual", true);
  savePriceHistory();
  scheduleBackup();
  renderHistoryView();
}

function clearCurrentItemHistory() {
  const items = state[histSelectedProf] || [];
  const item = items.find(i => i.id === Number(histSelectedItemId));
  if (!item) return;
  if (!confirm(`Deseja limpar o histórico de "${item.name}" e manter apenas o ponto atual?`)) return;
  priceHistory[histSelectedProf][item.id] = [];
  recordHistoryEntry(histSelectedProf, item, "Reset", true);
  savePriceHistory();
  scheduleBackup();
  renderHistoryView();
}

function formatDateTime(ts) {
  const d = new Date(ts);
  const pad = n => String(n).padStart(2, "0");
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function renderHistoryView() {
  const items = state[histSelectedProf] || [];
  const item = items.find(i => i.id === Number(histSelectedItemId)) || items[0];
  if (!item) return;

  const rawLogs = (priceHistory[histSelectedProf] && priceHistory[histSelectedProf][item.id]) || [];
  const filteredLogs = filterLogsByRange(rawLogs);
  const groupedLogs = aggregateLogs(filteredLogs, histGrouping);

  const groupNames = {
    raw: "Leituras Brutas",
    day: "Agrupado por Dia",
    week: "Agrupado por Semana",
    month: "Agrupado por Mês",
    quarter: "Agrupado por Trimestre",
    semester: "Agrupado por Semestre",
    year: "Agrupado por Ano"
  };

  document.getElementById("histCountBadge").textContent =
    `${groupedLogs.length} período(s) exibido(s) · (${filteredLogs.length} leituras no intervalo)`;
  document.getElementById("histTableTitle").textContent =
    `📋 Histórico — ${groupNames[histGrouping] || "Registros"}`;

  const ahVals = filteredLogs.map(l => l.ahPrice);
  const minAh = ahVals.length ? Math.min(...ahVals) : 0;
  const maxAh = ahVals.length ? Math.max(...ahVals) : 0;
  const avgAh = ahVals.length ? ahVals.reduce((a, b) => a + b, 0) / ahVals.length : 0;
  const firstAh = ahVals.length ? ahVals[0] : 0;
  const lastAh = ahVals.length ? ahVals[ahVals.length - 1] : 0;
  const deltaPct = firstAh > 0 ? ((lastAh - firstAh) / firstAh) * 100 : 0;
  const deltaColor = deltaPct > 0.05 ? "text-emerald-400" : (deltaPct < -0.05 ? "text-rose-400" : "text-slate-300");
  const deltaSign = deltaPct > 0 ? "+" : "";

  const lastLog = filteredLogs[filteredLogs.length - 1] || { profitCraft: 0, goldPerConc: 0 };

  document.getElementById("histSummaryCards").innerHTML = `
    <div class="bg-slate-900/90 border border-slate-700 p-3.5 rounded-lg">
      <div class="text-[11px] uppercase text-slate-400 font-semibold">Preço AH Atual</div>
      <div class="text-xl font-bold text-sky-400 font-mono mt-1">${formatNum(lastAh, 2)} g</div>
    </div>
    <div class="bg-slate-900/90 border border-slate-700 p-3.5 rounded-lg">
      <div class="text-[11px] uppercase text-slate-400 font-semibold">Mínima / Máxima no Período</div>
      <div class="text-sm font-bold text-slate-200 font-mono mt-1.5">${formatNum(minAh, 2)}g <span class="text-slate-500">→</span> ${formatNum(maxAh, 2)}g</div>
    </div>
    <div class="bg-slate-900/90 border border-slate-700 p-3.5 rounded-lg">
      <div class="text-[11px] uppercase text-slate-400 font-semibold">Preço Médio no Período</div>
      <div class="text-xl font-bold text-slate-200 font-mono mt-1">${formatNum(avgAh, 2)} g</div>
    </div>
    <div class="bg-slate-900/90 border border-slate-700 p-3.5 rounded-lg">
      <div class="text-[11px] uppercase text-slate-400 font-semibold">Variação no Período</div>
      <div class="text-xl font-bold ${deltaColor} font-mono mt-1">${deltaSign}${formatNum(deltaPct, 1)}%</div>
    </div>
    <div class="bg-slate-900/90 border border-amber-500/30 p-3.5 rounded-lg">
      <div class="text-[11px] uppercase text-amber-400 font-semibold">Gold / Conc Atual</div>
      <div class="text-xl font-bold text-amber-400 font-mono mt-1">${lastLog.goldPerConc > 0 ? formatNum(lastLog.goldPerConc, 2) + " g" : "—"}</div>
    </div>
  `;

  const ctx = document.getElementById("historyChartCanvas").getContext("2d");
  if (historyChartInstance) {
    historyChartInstance.destroy();
  }

  const labels = groupedLogs.map(l => l.label);
  const datasets = [];

  if (chartVisibility.ahPrice) {
    datasets.push({
      label: histGrouping === "raw" ? "Preço AH (g)" : "Preço AH Médio (g)",
      data: groupedLogs.map(l => l.ahPrice),
      borderColor: "#38bdf8",
      backgroundColor: "rgba(56, 189, 248, 0.12)",
      borderWidth: 2.5,
      pointRadius: 4,
      tension: 0.25,
      yAxisID: "y"
    });
  }

  if (chartVisibility.craftingCost) {
    datasets.push({
      label: "Custo de Craft (g)",
      data: groupedLogs.map(l => l.craftingCost),
      borderColor: "#fb7185",
      backgroundColor: "rgba(251, 113, 133, 0.1)",
      borderDash: [5, 5],
      borderWidth: 2,
      pointRadius: 3,
      tension: 0.25,
      yAxisID: "y"
    });
  }

  if (chartVisibility.profitCraft) {
    datasets.push({
      label: "Lucro / Craft (g)",
      data: groupedLogs.map(l => l.profitCraft),
      borderColor: "#4ade80",
      backgroundColor: "rgba(74, 222, 128, 0.1)",
      borderWidth: 2.5,
      pointRadius: 4,
      tension: 0.25,
      yAxisID: "y"
    });
  }

  if (chartVisibility.goldPerConc) {
    datasets.push({
      label: "Gold / Concentração (g/conc)",
      data: groupedLogs.map(l => l.goldPerConc),
      borderColor: "#fbbf24",
      backgroundColor: "rgba(251, 191, 36, 0.15)",
      borderWidth: 2.5,
      pointRadius: 4,
      tension: 0.25,
      yAxisID: "y1"
    });
  }

  historyChartInstance = new Chart(ctx, {
    type: "line",
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: {
          labels: { color: "#cbd5e1", font: { size: 12, weight: "600" } }
        },
        tooltip: {
          backgroundColor: "#0f172a",
          borderColor: "#334155",
          borderWidth: 1,
          titleColor: "#f8fafc",
          bodyColor: "#e2e8f0",
          callbacks: {
            afterBody: function(context) {
              const idx = context[0]?.dataIndex;
              const g = groupedLogs[idx];
              if (g && g.count > 1) {
                return [`Amostras no período: ${g.count}`, `Mín AH: ${formatNum(g.minAh, 2)}g | Máx AH: ${formatNum(g.maxAh, 2)}g`];
              }
              return [];
            }
          }
        }
      },
      scales: {
        x: {
          ticks: { color: "#94a3b8", font: { size: 11 } },
          grid: { color: "rgba(51, 65, 85, 0.35)" }
        },
        y: {
          type: "linear",
          display: true,
          position: "left",
          title: { display: true, text: "Gold (g)", color: "#94a3b8", font: { size: 11 } },
          ticks: { color: "#cbd5e1" },
          grid: { color: "rgba(51, 65, 85, 0.35)" }
        },
        y1: {
          type: "linear",
          display: chartVisibility.goldPerConc,
          position: "right",
          title: { display: true, text: "Gold / Conc", color: "#fbbf24", font: { size: 11 } },
          ticks: { color: "#fbbf24" },
          grid: { drawOnChartArea: false }
        }
      }
    }
  });

  const tbody = document.getElementById("histLogTableBody");
  tbody.innerHTML = [...groupedLogs].reverse().map(l => {
    const pClass = l.profitCraft >= 0 ? "positive" : "negative";
    const minMaxText = l.count > 1 ? `${formatNum(l.minAh, 2)}g / ${formatNum(l.maxAh, 2)}g` : "—";
    return `
      <tr class="hover:bg-slate-800/50 transition">
        <td class="py-2 px-3 font-mono text-slate-200 font-semibold">${l.label}</td>
        <td class="py-2 px-2">
          <span class="px-2 py-0.5 text-[10px] rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-semibold">${l.source}</span>
        </td>
        <td class="py-2 px-2 text-right font-mono text-sky-400 font-semibold">${formatNum(l.ahPrice, 2)} g</td>
        <td class="py-2 px-2 text-right font-mono text-slate-400 text-xs">${minMaxText}</td>
        <td class="py-2 px-2 text-right font-mono text-slate-300">${formatNum(l.craftingCost, 1)} g</td>
        <td class="py-2 px-2 text-right font-mono ${pClass}">${formatNum(l.profitCraft, 1)} g</td>
        <td class="py-2 px-2 text-right font-mono ${pClass}">${formatNum(l.roiPct, 1)}%</td>
        <td class="py-2 px-3 text-right font-mono gold-conc">${l.goldPerConc > 0 ? formatNum(l.goldPerConc, 2) + " g" : "—"}</td>
      </tr>
    `;
  }).join("");
}
