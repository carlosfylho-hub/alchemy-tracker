# Alchemy Tracker

Web app para rastreamento de concentrações em World of Warcraft. Sincroniza com Google Sheets em tempo real, mantém histórico local e faz backup na nuvem.

**Acesso:** https://carlosfylho-hub.github.io/alchemy-tracker/

---

## O que é

Aplicativo single-page que rastreia:
- Custos de concentração por profissão (Alchemy, Jewelcrafting, Enchanting, Inscription)
- Preços da Auction House
- Lucro/Prejuízo por item
- Histórico de preços com gráficos
- Sincronização com Google Sheets

## Como funciona

```
index.html → localStorage + Google Sheets API + Google Apps Script (backup)
```

1. App lê dados do localStorage
2. Sincroniza com Google Sheets via gviz API
3. Calcula lucro usando fórmulas específicas
4. Faz backup automático no Google Apps Script
5. Mantém histórico de preços

## Como usar

### Sincronizar com Google Sheets
Clique em "🔄 Sincronizar Planilha" para carregar custos de produção e preços da AH.

### Filtrar itens
- **Apenas Lucrativos** - itens com lucro > 0
- **Apenas com Conc** - itens que usam concentração
- **Buscar** - filtra por nome

### Ver histórico
Clique em "📈 Histórico" para:
- Gráfico de tendência de preços
- Tabela de pontos registrados
- Deletar pontos zerados

## Google Sheet

**URL:** https://docs.google.com/spreadsheets/d/1vnEgXCF5t2PhOuhrQRC3rnqNo4qPS_OvIP2OCLnDh3Q/edit

### Estrutura

| Aba | Conteúdo |
|-----|----------|
| Alchemy Conc | Poções e extratos |
| Jewelcrafting Conc | Gemas e lentes |
| Enchanting Conc | Encantamentos |
| Inscription Conc | Tinteiros e runas |

## Armazenamento

### localStorage
```
kaychak_conc_complete_v8_cloud_backup     - dados principais
kaychak_conc_complete_v8_cloud_backup_prev - backup anterior
kaychak_conc_complete_v8_cloud_backup_history - histórico
```

### Google Apps Script
- POST: salva dados na nuvem
- GET: restaura dados

## Fórmulas

### Custo Efetivo de Concentração
```
effectiveConcCost = concCost × (1 - ingDec × refundDec)
```

### Custo de Crafting
```
baseCost × (1 - res × 0.30)
```

### Lucro
```
lucro = preçoAH - custoTotal
```

## Estrutura do código

```
index.html (2000+ linhas)
├── HTML (interface com Tailwind CSS)
├── CSS (estilos)
├── JavaScript
│   ├── Configurações (URLs, chaves)
│   ├── Sync com Google Sheets
│   ├── Cálculos
│   ├── Gerenciamento de histórico
│   ├── Renderização
│   └── Event listeners
└── Bibliotecas
    ├── Tailwind CSS
    └── Chart.js
```

## Variáveis globais

- `SHEET_ID` - ID da Google Sheet
- `SCRIPT_URL` - URL do Google Apps Script
- `currentTab` - profissão selecionada
- `priceHistory` - histórico de preços
- `profSettings` - configurações por profissão

## Funções principais

| Função | Propósito |
|--------|-----------|
| `syncWithGoogleSheets()` | Sincroniza dados da planilha |
| `calculateProfit(item)` | Calcula lucro do item |
| `renderAll()` | Renderiza tabela com filtros |
| `saveToCloud()` | Salva backup na nuvem |
| `restoreFromCloud()` | Restaura backup da nuvem |
| `recordHistoryEntry(item)` | Registra ponto no histórico |

## Troubleshooting

### Dados não carregam
1. Abra DevTools (F12)
2. Verifique console para erros
3. Confirme acesso à Google Sheet
4. Clique em "Sincronizar Planilha"

### Histórico desapareceu
Clique em "☁️ Restaurar da Nuvem"

### Sincronização não funciona
1. Verifique conexão com internet
2. Confirme que Google Sheet está acessível
3. Verifique DevTools para erro de CORS

## Compatibilidade

- Chrome/Chromium
- Firefox
- Safari
- Edge
- Mobile browsers

Requisitos: JavaScript ativado, localStorage ativado, acesso à Google Sheets pública

## Segurança

- Dados locais: localStorage do navegador
- Google Sheet: pública, ID específico
- Google Apps Script: URL única
- Não armazena: senhas, dados financeiros, informações pessoais

---

Última atualização: 22/10/2026
