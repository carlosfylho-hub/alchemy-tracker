# 🧪 Alchemy Tracker

Um web app de rastreamento de concentrações para **World of Warcraft** que sincroniza em tempo real com uma Google Sheet, mantém histórico local, e faz backup na nuvem.

**🔗 [Acessar o app](https://carlosfylho-hub.github.io/alchemy-tracker/)**

---

## 📋 O que é este projeto?

Este é um **aplicativo single-page (SPA)** que ajuda players a rastrear:
- **Custos de concentração** (Alchemy, Jewelcrafting, Enchanting, Inscription)
- **Preços da Auction House (AH)**
- **Lucro/Prejuízo** por item
- **Histórico de preços** e tendências
- **Sincronização com Google Sheets** para análise em tempo real

### ⚙️ Como funciona?

```
┌─────────────────┐
│  index.html     │  ← Single file app (Tailwind + Chart.js)
└────────┬────────┘
         │
    ┌────┴────┬────────────────────┐
    │          │                    │
    ▼          ▼                    ▼
localStorage  Google Sheets API  Google Apps Script
  (local)     (sync)              (cloud backup)
```

**Fluxo:**
1. App lê dados do `localStorage`
2. Sincroniza com Google Sheets via gviz API (`/gviz/tq`)
3. Calcula lucro usando fórmulas específicas
4. Faz backup automático no Google Apps Script
5. Mantém histórico de preços e tendências

---

## 🚀 Como usar

### 1️⃣ Acesso rápido
Abra em qualquer navegador:
```
https://carlosfylho-hub.github.io/alchemy-tracker/
```

### 2️⃣ Sincronizar com Google Sheets
Clique no botão **"🔄 Sincronizar Planilha"** para:
- Carregar custos de produção
- Atualizar preços da AH
- Recalcular lucro

### 3️⃣ Filtrar itens
Use a barra de filtros:
- **Apenas Lucrativos** - Mostra só items com lucro > 0
- **Apenas com Conc** - Mostra itens que precisam de concentração
- **Buscar** - Filtra por nome do item

### 4️⃣ Ver histórico
Clique na aba **"📊 Histórico"** para:
- Gráfico de tendência de preços
- Tabela com todos os pontos registrados
- Deletar pontos zerados com um clique

---

## 📊 Google Sheet conectada

**URL:** [Alchemy Tracker - Planilha](https://docs.google.com/spreadsheets/d/1V5Yxez_-nuPsvmtJLstYL61WhXU_sPNnPh8zxrnVE5k/edit?usp=sharing)

### Estrutura das abas:

| Aba | Conteúdo | Itens |
|-----|----------|-------|
| **Alchemy Conc** | Poções e extratos | 19 |
| **Jewelcrafting Conc** | Gemas e lentes | 25 |
| **Enchanting Conc** | Encantamentos | 39 |
| **Inscription Conc** | Tinteiros e runas | 26 |

**Total:** 129 itens rastreados

### Como é a planilha?

Cada aba segue este padrão:
```
Nome do Item        | Tier 2 | Crafting Cost | AH Price | Lucro
───────────────────┼────────┼───────────────┼──────────┼───────
Silvermoon Health  | Tier 2 | 45.5          | 120      | ✅
Lightfused Mana    | Tier 2 | 32.2          | 28       | ❌
```

---

## 💾 Armazenamento de dados

### localStorage (seu navegador)
```javascript
// Dados principais
localStorage.kaychak_conc_complete_v8_cloud_backup

// Backup anterior (para migração)
localStorage.kaychak_conc_complete_v8_cloud_backup_prev

// Histórico de preços
localStorage.kaychak_price_history_v1
```

### Google Apps Script (nuvem)
- **POST** → Salva dados na nuvem
- **GET** → Restaura dados quando volta ao app

---

## 🧮 Fórmulas usadas

### Custo Efetivo de Concentração
```
effectiveConcCost = concCost × (1 - ingDec × refundDec)

Onde:
  concCost = custo da concentração
  ingDec = diminuição de ingredientes (%)
  refundDec = refund da concentração (70% padrão)
```

### Custo de Crafting
```
baseCost × (1 - res × 0.30)

Onde:
  baseCost = custo de produção
  res = resistência (%)
```

### Lucro
```
lucro = preçoAH - custoTotal
custoTotal = crafting + concentração
```

---

## 🔧 Desenvolvimento

### Estrutura do arquivo

```
index.html (8000+ linhas)
├── HTML (interface com Tailwind CSS)
├── CSS (estilos personalizados)
├── JavaScript
│   ├── Configurações (URLs, chaves)
│   ├── Funções de sync (Google Sheets)
│   ├── Funções de cálculo
│   ├── Gerenciamento de histórico
│   ├── Renderização de UI
│   └── Event listeners
└── Bibliotecas externas
    ├── Tailwind CSS (CDN)
    └── Chart.js (CDN)
```

### Variáveis globais importantes

```javascript
SCRIPT_URL // Google Apps Script URL (backup)
priceData // Dados principais {profissão: [items]}
priceHistory // Histórico de preços
selectedProfession // Profissão atual
refund // Refund % da concentração (padrão: 70)
ingredientDecrease // Diminuição de ingredientes (%)
```

### Funções críticas

| Função | Propósito |
|--------|-----------|
| `syncWithGoogleSheets()` | Sincroniza com as 4 abas |
| `recordHistoryEntry(item)` | Registra ponto no histórico |
| `calculateProfit(item)` | Calcula lucro/prejuízo |
| `renderAll()` | Renderiza tabela com filtros |
| `saveToCloud()` | Backup no Google Apps Script |
| `restoreFromCloud()` | Restaura dados da nuvem |

---

## ⚠️ IMPORTANTE: Como submeter mudanças

**LEIA ANTES DE FAZER QUALQUER ALTERAÇÃO:** 📄 [GEMINI_INSTRUCTIONS.pdf](./GEMINI_INSTRUCTIONS.pdf)

### Protocolo de desenvolvimento:

1. **LEIA o código antigo** antes de fazer mudanças
2. **PERGUNTE** qual é exatamente a mudança desejada
3. **FAÇA CIRURGIA, NÃO AMPUTAÇÃO** - modifique apenas o necessário
4. **PRESERVE tudo crítico:**
   - localStorage com mesmos nomes
   - URLs de API (Google Sheets, Apps Script)
   - Fórmulas de cálculo
   - Nomes de variáveis globais
5. **TESTE contra dados reais** antes de entregar
6. **VERIFIQUE DevTools** - não deve ter erros

### Erro fatal anterior

O Gemini gerou um novo `index.html` completo e:
- ❌ Mudou chaves de localStorage (`v8` → `v5`)
- ❌ Removeu Google Apps Script
- ❌ Removeu campo "Refund"
- ❌ Alterou fórmula de concentração
- ❌ Removeu funcionalidades (links, filtros, histórico)

**Resultado:** Histórico perdido, app quebrado.

**Solução:** Claude restaurou a versão funcional (19/10) e criou migração de dados.

---

## 🐛 Troubleshooting

### "Os dados não carregam"
1. Abra DevTools (F12)
2. Verifique console para erros
3. Confirme que a Google Sheet está acessível
4. Tente "🔄 Sincronizar Planilha"

### "O histórico desapareceu"
1. Clique "⚙️ Restaurar da Nuvem"
2. Ou verifique localStorage em DevTools → Storage

### "A sincronização não funciona"
1. Verifique sua conexão com internet
2. Confirme que a Google Sheet URL está correta
3. Abra DevTools e procure por erro de CORS

---

## 📱 Compatibilidade

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

**Requisitos:**
- JavaScript ativado
- localStorage ativado
- Acesso à Google Sheets pública

---

## 📜 Commit history

| Data | Commit | Descrição |
|------|--------|-----------|
| 19/10 | d2b1b68 | Enhance top ranking section with ignored items |
| 20/10 | abdcc85 | Restaura versão funcional e corrige regressões |

---

## 🔐 Segurança

- 📌 **Dados locais:** Armazenados em localStorage do navegador (criptografia do browser)
- 📌 **Google Sheet:** Pública, mas ID é específico (segurança por obscuridade)
- 📌 **Google Apps Script:** URL única, token implícito
- ⚠️ **Não armazena:** Senhas, dados financeiros reais, informações pessoais

---

## 📝 Licença

Este projeto é pessoal/privado. Use por sua conta e risco.

---

## 📧 Contato

**Criador:** Carlos
**Quando quebra:** Chama o Claude 🤖

---

## 🚀 Roadmap

- [ ] Exportar dados em CSV/Excel
- [ ] Suporte a múltiplos caracteres/contas
- [ ] Notificações de oportunidades de lucro
- [ ] Integração com addons do WoW
- [ ] Dashboard em tempo real

---

**Última atualização:** 21/10/2026

⭐ Se este projeto te ajuda, considere dar uma star no repositório!
