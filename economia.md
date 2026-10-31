# MIDNIGHT · Economia e Mercado — painel do dia

> **Gerado em:** 31/10/2026 14:04 · **Config:** rev 92 · **Unidade:** gold (g)
> **Fonte:** `MIDNIGHT_Economia_Config.json` (cofre Obsidian) + screener + TSM Accounting.
> **Este arquivo é reescrito no mesmo caminho.** No NotebookLM use *atualizar fonte* — não suba arquivo novo.

---

# Parte 1 — Caixa e projeção (o seu ouro)

## 0. Resumo

| Indicador | Valor |
|---|---|
| Saldo do caixa agora | **2.209.345 g** (R$ 434) |
| Fechamento projetado (Dez/2027) | **42,65M g** (R$ 8,4k) |
| Menor saldo projetado | **1,39M g** em 13/10 |
| Colchão mínimo (piso) | 1,00M g · **0 semana(s)** abaixo |
| Ritmo líquido real | **110k g/semana** (3 semana(s) lançada(s)) |
| Estimativa pelo ritmo real (fim do plano) | **8,91M g** |

## 1. Real × plano

- Última semana lançada: **Ter 27/10 → Seg 02/11** (semana 3 de 64)
- Saldo real: **2.209.345 g** · plano na mesma semana: 2.780.000 g · desvio **−570.655 g (−20,5%)**
- Ganhos reais lançados (janela do plano, desde 13/10/2026): **+6.546.272 g** · gastos: **−6.216.957 g** · líquido **+329.315 g**
- Histórico completo de lançamentos: +50.680.550 g de ganhos / −36.513.125 g de gastos (líquido +14.167.425 g)
- Saldo do jogo (Syndicator, `saldoReal`): **2.209.345 g** · saldo base do plano: 2.800.000 g · diferença **−590.655 g**
- Reancoragem no real: **ligada**

## 2. Projeção do plano (64 semanas)

- Período: **Ter 13/10 → Seg 19/10** até **Ter 28/12 → Seg 03/01**
- Farm: 100.000 g/dia até 01/02/2027, depois 150.000 g/dia (Season 3)
- Farm total previsto: **61,60M g** · gastos previstos: **21,18M g**
- ✅ A projeção nunca fica abaixo do piso de 1,00M g.

## 3. Compras planejadas

| Mês | Item | Custo | Status | Falta hoje | 1ª semana que cobre |
|---|---|---|---|---|---|
| out/26 | Boost IO 3600 (S2) | 2,12M g | ✅ feito | — | — |
| fev/27 | Montaria 7M | 7,00M g | ⏳ pendente | 4,79M g | Ter 29/12 → Seg 04/01 |
| jun/27 | Boost IO 3600 (S3) | 2,50M g | ⏳ pendente | 291k g | Ter 20/10 → Seg 26/10 |
| jun/27 | Montaria Raide (S3) | 2,00M g | ⏳ pendente | — | Ter 20/10 → Seg 26/10 |

## 4. Token

- Preço atual: **280k g** · alvo ≤ 270k g → ⏳ 10k g acima do alvo
- Cotação usada para R$: 55 BNet por token.

## 5. Oportunidades do screener (top 10 por g/conc)

Screener gerado em **2026-10-31T15:46:09Z** · 115 receitas · 55 insumos.

| # | Receita | Prof | g/conc | lucro/craft | custo | venda | flags |
|---|---|---|---|---|---|---|---|
| 1 | Potion of Devoured Dreams Tier 2 | alchemy | 4,59 | 1k g | 100 g | 169 g | demanda_so_propria, liquidez_parada |
| 2 | Liquid Luster Tier 2 | alchemy | 4,15 | 1k g | 58 g | 149 g | demanda_so_propria |
| 3 | Potion of Recklessness Tier 2 | alchemy | 3,66 | 491 g | 152 g | 87 g | demanda_so_propria |
| 4 | Light's Preservation Tier 2 | alchemy | 3,50 | 881 g | 113 g | 134 g | demanda_so_propria |
| 5 | Concentrated Silvermoon Health Potion Tier 2 | alchemy | 3,15 | 792 g | 103 g | 121 g | demanda_so_propria |
| 6 | Lightfused Mana Potion Tier 2 | alchemy | 2,59 | 650 g | 82 g | 99 g | demanda_so_propria |
| 7 | Light's Potential Tier 2 | alchemy | 2,43 | 612 g | 132 g | 100 g | demanda_so_propria |
| 8 | Refreshing Serum Tier 2 | alchemy | 2,36 | 260 g | 32 g | 40 g | demanda_so_propria |
| 9 | Flask of the Blood Knights Tier 2 | alchemy | 2,33 | 786 g | 286 g | 362 g | sem_demanda_regional |
| 10 | Haranir Phial of Ingenuity Tier 2 | alchemy | 2,28 | 769 g | 83 g | 145 g | sem_demanda_regional |

---

# Parte 2 — Mercado (preço, g/conc, insumos, estoque)

Origem do bloco de mercado: **ao vivo (Apps Script, série de 7 dias)**.

```text
<!-- MERCADO:INICIO -->
================================================================================
SNAPSHOT DO MERCADO - WoW Midnight - Azralon
Gerado em: 2026-10-31 17:04 UTC | Serie: ultimos 7 dias
g/ponto: Alquimia usa valor oficial da planilha; demais = lucro/craft / concCost
================================================================================

ATRIBUTOS ATUAIS POR PROFISSAO
--------------------------------------------------------------------------------
  (Res%/MC% das abas *Conc = fonte de verdade; Ing/Refund do navegador)
  ALQUIMIA       Res 15%  MC 36.4%  Ing 28.9%  Refund 50%
  JOALHERIA      Res 17.8%  MC 33.4%  Ing 21.6%  Refund 50%
  ENCANTAMENTO   Res 14.7%  MC 0%  Ing 38.5%  Refund 100%
  INSCRICAO      Res 12.2%  MC 22.7%  Ing 11.6%  Refund 50%

================================================================================
ALQUIMIA  (22 receitas)
================================================================================
  [OPORTUNID.] Liquid Luster Tier 2
      AH   154.00g | media   167.87g | estavel | lucro/craft  1090.93g | g/ponto  4.34
  [OPORTUNID.] Light's Preservation Tier 2
      AH   134.33g | media    77.22g | QUEDA -38% | lucro/craft   920.32g | g/ponto  3.66
  [OPORTUNID.] Refreshing Serum Tier 2
      AH    54.97g | media    37.89g | ALTA  +13% | lucro/craft   378.97g | g/ponto  3.43
  [OPORTUNID.] Concentrated Silvermoon Health Potion Tier 2
      AH   120.88g | media   140.61g | QUEDA -3% | lucro/craft   796.93g | g/ponto  3.17
  [OPORTUNID.] Potion of Recklessness Tier 2
      AH    69.97g | media    75.44g | estavel | lucro/craft   419.75g | g/ponto  3.13
  [OPORTUNID.] Haranir Phial of Finesse Tier 2
      AH   183.94g | media   176.72g | ALTA  +9% | lucro/craft   993.65g | g/ponto  2.95
  [OPORTUNID.] Draught of Rampant Abandon Tier 2
      AH    96.33g | media    93.90g | ALTA  +14% | lucro/craft   678.75g | g/ponto  2.70
  [OPORTUNID.] Void-Shrouded Tincture Tier 2
      AH    93.22g | media    96.13g | QUEDA -4% | lucro/craft   660.90g | g/ponto  2.63
  [OPORTUNID.] Potion of Devoured Dreams Tier 2
      AH    92.97g | media    94.18g | estavel | lucro/craft   654.50g | g/ponto  2.60
  [OPORTUNID.] Light's Potential Tier 2
      AH    99.99g | media   103.44g | estavel | lucro/craft   652.00g | g/ponto  2.59
  [OPORTUNID.] Lightfused Mana Potion Tier 2
      AH    91.99g | media   100.72g | QUEDA -7% | lucro/craft   650.05g | g/ponto  2.58
  [OPORTUNID.] Haranir Phial of Ingenuity Tier 2
      AH   150.00g | media   122.18g | ALTA  +11% | lucro/craft   849.10g | g/ponto  2.52
  [OPORTUNID.] Flask of the Blood Knights Tier 2
      AH   361.89g | media   386.31g | estavel | lucro/craft   812.12g | g/ponto  2.41
  [OPORTUNID.] Flask of Thalassian Resistance Tier 2
      AH   376.96g | media   372.75g | estavel | lucro/craft   763.77g | g/ponto  2.27
  [OPORTUNID.] Haranir Phial of Perception Tier 2
      AH   150.00g | media   195.71g | estavel | lucro/craft   742.01g | g/ponto  2.20
  [OPORTUNID.] Flask of the Magisters Tier 2
      AH   328.99g | media   345.70g | QUEDA -6% | lucro/craft   726.97g | g/ponto  2.16
  [OPORTUNID.] Flask of the Shattered Sun Tier 2
      AH   370.99g | media   402.12g | estavel | lucro/craft   706.46g | g/ponto  2.10
  [OPORTUNID.] Amani Extract Tier 2
      AH    74.99g | media    78.79g | QUEDA -10% | lucro/craft   475.69g | g/ponto  1.89
  [OPORTUNID.] Silvermoon Health Potion Tier 2
      AH    67.01g | media    76.66g | ALTA  +48% | lucro/craft   473.04g | g/ponto  1.88
  [OPORTUNID.] Potion of Zealotry Tier 2
      AH    90.43g | media    84.77g | ALTA  +137% | lucro/craft   465.53g | g/ponto  1.85
  [OPORTUNID.] Enlightenment Tonic Tier 2
      AH    29.39g | media    14.63g | ALTA  +34% | lucro/craft   199.46g | g/ponto  1.81
  [OPORTUNID.] Alluring Nostrum Tier 2
      AH    60.00g | media    85.30g | QUEDA -29% | lucro/craft   392.39g | g/ponto  1.56

================================================================================
JOALHERIA  (25 receitas)
================================================================================
  [OPORTUNID.] Stabilizing Gemstone Bandolier Tier 2
      AH   697.98g | media   632.96g | ALTA  +41% | lucro/craft   882.76g | g/ponto  2.45
  [OPORTUNID.] Kaleidoscopic Prism Tier 2
      AH   700.99g | media   674.40g | ALTA  +17% | lucro/craft   613.09g | g/ponto  2.12
  [OPORTUNID.] Flawless Deadly Garnet Tier 2
      AH   569.99g | media   521.67g | ALTA  +16% | lucro/craft   643.03g | g/ponto  1.78
  [OPORTUNID.] Flawless Deadly Peridot Tier 2
      AH   575.00g | media   551.63g | ALTA  +18% | lucro/craft   640.99g | g/ponto  1.78
  [OPORTUNID.] Flawless Quick Garnet Tier 2
      AH   570.00g | media   549.22g | ALTA  +16% | lucro/craft   643.04g | g/ponto  1.78
  [OPORTUNID.] Flawless Quick Peridot Tier 2
      AH   574.99g | media   544.32g | ALTA  +19% | lucro/craft   640.97g | g/ponto  1.78
  [OPORTUNID.] Flawless Versatile Garnet Tier 2
      AH   570.00g | media   511.84g | ALTA  +32% | lucro/craft   643.04g | g/ponto  1.78
  [OPORTUNID.] Flawless Quick Amethyst Tier 2
      AH   570.00g | media   522.90g | ALTA  +23% | lucro/craft   636.64g | g/ponto  1.77
  [OPORTUNID.] Flawless Deadly Lapis Tier 2
      AH   569.99g | media   517.90g | ALTA  +24% | lucro/craft   635.59g | g/ponto  1.76
  [OPORTUNID.] Flawless Masterful Peridot Tier 2
      AH   570.00g | media   545.40g | ALTA  +20% | lucro/craft   633.04g | g/ponto  1.76
  [OPORTUNID.] Flawless Quick Lapis Tier 2
      AH   570.00g | media   541.37g | ALTA  +31% | lucro/craft   635.61g | g/ponto  1.76
  [OPORTUNID.] Flawless Versatile Amethyst Tier 2
      AH   565.00g | media   526.03g | ALTA  +14% | lucro/craft   628.69g | g/ponto  1.74
  [OPORTUNID.] Flawless Masterful Garnet Tier 2
      AH   550.00g | media   536.60g | ALTA  +21% | lucro/craft   611.27g | g/ponto  1.70
  [OPORTUNID.] Flawless Masterful Lapis Tier 2
      AH   550.00g | media   520.94g | ALTA  +28% | lucro/craft   603.84g | g/ponto  1.68
  [OPORTUNID.] Flawless Deadly Amethyst Tier 2
      AH   548.80g | media   520.65g | ALTA  +20% | lucro/craft   602.95g | g/ponto  1.67
  [OPORTUNID.] Flawless Versatile Peridot Tier 2
      AH   549.79g | media   547.52g | ALTA  +15% | lucro/craft   600.93g | g/ponto  1.67
  [OPORTUNID.] Flawless Masterful Amethyst Tier 2
      AH   545.00g | media   532.72g | ALTA  +18% | lucro/craft   596.92g | g/ponto  1.66
  [OPORTUNID.] Indecipherable Eversong Diamond Tier 2
      AH   650.00g | media   616.69g | ALTA  +27% | lucro/craft   577.42g | g/ponto  1.60
  [OPORTUNID.] Flawless Versatile Lapis Tier 2
      AH   525.00g | media   481.13g | ALTA  +32% | lucro/craft   564.12g | g/ponto  1.57
  [ATENCAO   ] Powerful Eversong Diamond Tier 2
      AH   625.35g | media   623.63g | ALTA  +7% | lucro/craft   538.26g | g/ponto  1.49
  [ATENCAO   ] Stoic Eversong Diamond Tier 2
      AH   580.00g | media   536.52g | ALTA  +29% | lucro/craft   466.21g | g/ponto  1.29
  [ATENCAO   ] Prismatic Focusing Iris Tier 2
      AH   395.40g | media   442.98g | QUEDA -19% | lucro/craft   449.15g | g/ponto  1.25
  [ATENCAO   ] Sunglass Vial Tier 2
      AH   252.00g | media   264.65g | QUEDA -5% | lucro/craft   356.17g | g/ponto  1.23
  [ATENCAO   ] Telluric Eversong Diamond Tier 2
      AH   530.11g | media   556.14g | QUEDA -5% | lucro/craft   386.95g | g/ponto  1.07
  [ATENCAO   ] Sin'dorei Lens Tier 2
      AH   203.88g | media   215.65g | estavel | lucro/craft   262.85g | g/ponto  0.91

================================================================================
ENCANTAMENTO  (40 receitas)
================================================================================
  [OPORTUNID.] Enchant Tool - Sin'dorei Deftness Tier 2
      AH  1100.00g | media   905.28g | QUEDA -23% | lucro/craft   512.94g | g/ponto  2.32
  [OPORTUNID.] Enchant Shoulders - Akil'zon's Swiftness Tier 2
      AH   694.00g | media   538.49g | estavel | lucro/craft   495.67g | g/ponto  2.24
  [OPORTUNID.] Enchant Boots - Shaladrassil's Roots Tier 2
      AH  1021.96g | media  1029.60g | ALTA  +3% | lucro/craft   440.18g | g/ponto  1.99
  [OPORTUNID.] Enchant Shoulders - Amirdrassil's Grace Tier 2
      AH   699.87g | media   668.86g | QUEDA -4% | lucro/craft   389.29g | g/ponto  1.76
  [OPORTUNID.] Enchant Helm - Empowered Blessing of Speed Tier 2
      AH   674.50g | media   558.68g | estavel | lucro/craft   363.92g | g/ponto  1.64
  [OPORTUNID.] Enchant Weapon - Acuity of the Ren'dorei Tier 2
      AH   874.99g | media   827.07g | ALTA  +4% | lucro/craft   349.05g | g/ponto  1.58
  [OPORTUNID.] Enchant Chest - Mark of the Rootwarden Tier 2
      AH   854.00g | media   756.91g | QUEDA -8% | lucro/craft   343.52g | g/ponto  1.55
  [OPORTUNID.] Enchant Helm - Empowered Hex of Leeching Tier 2
      AH   644.99g | media   613.41g | ALTA  +13% | lucro/craft   333.01g | g/ponto  1.50
  [ATENCAO   ] Enchant Weapon - Rite of the Hash'ey Tier 2
      AH   820.60g | media   848.91g | estavel | lucro/craft   318.77g | g/ponto  1.44
  [ATENCAO   ] Enchant Tool - Haranir Multicrafting Tier 2
      AH   899.00g | media   871.74g | estavel | lucro/craft   311.15g | g/ponto  1.41
  [ATENCAO   ] Enchant Weapon - Worldsoul Tenacity Tier 2
      AH   758.40g | media   741.17g | ALTA  +34% | lucro/craft   300.13g | g/ponto  1.36
  [ATENCAO   ] Enchant Tool - Ren'dorei Ingenuity Tier 2
      AH   860.83g | media   865.46g | ALTA  +10% | lucro/craft   272.20g | g/ponto  1.23
  [ATENCAO   ] Enchant Helm - Empowered Rune of Avoidance Tier 2
      AH   549.09g | media   637.29g | QUEDA -9% | lucro/craft   239.31g | g/ponto  1.08
  [ATENCAO   ] Enchant Tool - Amani Resourcefulness Tier 2
      AH   664.93g | media   651.09g | estavel | lucro/craft   237.36g | g/ponto  1.07
  [ATENCAO   ] Enchant Weapon - Berserker's Rage Tier 2
      AH   685.91g | media   711.66g | QUEDA -5% | lucro/craft   230.28g | g/ponto  1.04
  [ATENCAO   ] Enchant Shoulders - Silvermoon's Mending Tier 2
      AH   421.96g | media   421.48g | ALTA  +7% | lucro/craft   225.82g | g/ponto  1.02
  [ATENCAO   ] Enchant Chest - Mark of Nalorakk Tier 2
      AH   566.88g | media   608.58g | ALTA  +20% | lucro/craft   206.49g | g/ponto  0.93
  [ATENCAO   ] Enchant Tool - Amani Perception Tier 2
      AH   625.59g | media   934.67g | QUEDA -34% | lucro/craft   198.02g | g/ponto  0.89
  [ATENCAO   ] Enchant Chest - Mark of the Magister Tier 2
      AH   580.00g | media   664.18g | QUEDA -4% | lucro/craft   189.03g | g/ponto  0.85
  [ATENCAO   ] Enchant Weapon - Arcane Mastery Tier 2
      AH   692.00g | media   705.74g | ALTA  +18% | lucro/craft   171.67g | g/ponto  0.78
  [ATENCAO   ] Enchant Ring - Silvermoon's Alacrity Tier 2
      AH   376.90g | media   367.61g | ALTA  +5% | lucro/craft   162.09g | g/ponto  0.73
  [ATENCAO   ] Enchant Boots - Farstrider's Hunt Tier 2
      AH   455.00g | media   546.46g | QUEDA -8% | lucro/craft   145.71g | g/ponto  0.66
  [ATENCAO   ] Enchant Weapon - Worldsoul Cradle Tier 2
      AH   600.74g | media   654.77g | estavel | lucro/craft   142.47g | g/ponto  0.64
  [ATENCAO   ] Enchant Ring - Zul'jin's Mastery Tier 2
      AH   343.94g | media   366.89g | estavel | lucro/craft   127.49g | g/ponto  0.58
  [ATENCAO   ] Enchant Boots - Lynx's Dexterity Tier 2
      AH   329.99g | media   377.60g | estavel | lucro/craft   116.50g | g/ponto  0.53
  [ATENCAO   ] Enchant Ring - Eyes of the Eagle Tier 2
      AH   418.00g | media   464.08g | QUEDA -4% | lucro/craft   112.92g | g/ponto  0.51
  [MARGEM BX ] Enchant Ring - Nature's Fury Tier 2
      AH   324.99g | media   359.93g | estavel | lucro/craft   109.58g | g/ponto  0.49
  [MARGEM BX ] Enchant Ring - Silvermoon's Tenacity Tier 2
      AH   310.95g | media   377.68g | estavel | lucro/craft    96.14g | g/ponto  0.43
  [MARGEM BX ] Enchant Chest - Mark of the Worldsoul Tier 2
      AH  2161.89g | media  2045.49g | ALTA  +8% | lucro/craft    86.64g | g/ponto  0.39
  [MARGEM BX ] Enchant Weapon - Flames of the Sin'Dorei Tier 2
      AH   724.50g | media   804.28g | QUEDA -15% | lucro/craft    60.31g | g/ponto  0.27
  [MARGEM BX ] Enchant Weapon - Jan'alai's Precision Tier 2
      AH   676.00g | media   792.31g | ALTA  +9% | lucro/craft    57.76g | g/ponto  0.26
  [MARGEM BX ] Enchant Weapon - Strength of Halazzi Tier 2
      AH   524.95g | media   591.87g | ALTA  +3% | lucro/craft    57.14g | g/ponto  0.26
  [EVITAR    ] Enchant Helm - Blessing of Speed Tier 2
      AH    18.76g | media    24.79g | QUEDA -27% | lucro/craft    -2.03g | g/ponto  s/dado
  [EVITAR    ] Enchant Helm - Hex of Leeching Tier 2
      AH    20.00g | media    25.35g | QUEDA -8% | lucro/craft    -0.79g | g/ponto  s/dado
  [EVITAR    ] Enchant Helm - Rune of Avoidance Tier 2
      AH    19.99g | media    35.31g | QUEDA -38% | lucro/craft    -0.80g | g/ponto  s/dado
  [EVITAR    ] Enchant Shoulders - Flight of the Eagle Tier 2
      AH    18.58g | media    53.34g | QUEDA -74% | lucro/craft    -2.21g | g/ponto  s/dado
  [EVITAR    ] Enchant Shoulders - Nature's Grace Tier 2
      AH    13.55g | media    13.26g | estavel | lucro/craft    -7.24g | g/ponto  s/dado
  [EVITAR    ] Enchant Shoulders - Thalassian Recovery Tier 2
      AH    19.88g | media    17.29g | ALTA  +4% | lucro/craft    -0.91g | g/ponto  s/dado
  [EVITAR    ] Enchant Tool - Haranir Finesse Tier 2
      AH   294.01g | media   554.03g | QUEDA -37% | lucro/craft  -132.17g | g/ponto  s/dado
  [EVITAR    ] Enchant Weapon - Worldsoul Aegis Tier 2
      AH   400.00g | media   469.20g | ALTA  +7% | lucro/craft   -58.27g | g/ponto  s/dado

================================================================================
INSCRICAO  (28 receitas)
================================================================================
  [OPORTUNID.] Thalassian Missive of Deftness Tier 2
      AH   750.00g | media   178.07g | QUEDA -8% | lucro/craft  1085.33g | g/ponto  3.56
  [ATENCAO   ] Darkmoon Sigil: Void Tier 2
      AH   348.41g | media   399.40g | QUEDA -16% | lucro/craft   384.28g | g/ponto  1.19
  [ATENCAO   ] Darkmoon Sigil: Blood Tier 2
      AH   349.00g | media   362.04g | estavel | lucro/craft   374.81g | g/ponto  1.16
  [ATENCAO   ] Darkmoon Sigil: Hunt Tier 2
      AH   359.10g | media   401.88g | QUEDA -16% | lucro/craft   367.96g | g/ponto  1.14
  [ATENCAO   ] Thalassian Missive of Multicraft Tier 2
      AH   202.48g | media   227.43g | QUEDA -17% | lucro/craft   253.46g | g/ponto  0.83
  [ATENCAO   ] Darkmoon Sigil: Rot Tier 2
      AH   290.00g | media   322.94g | ALTA  +16% | lucro/craft   263.58g | g/ponto  0.82
  [ATENCAO   ] Thalassian Missive of Ingenuity Tier 2
      AH   198.98g | media   251.56g | QUEDA -35% | lucro/craft   248.14g | g/ponto  0.81
  [ATENCAO   ] Thalassian Missive of the Aurora Tier 2
      AH   189.75g | media   204.27g | ALTA  +10% | lucro/craft   234.07g | g/ponto  0.77
  [ATENCAO   ] Thalassian Missive of the Peerless Tier 2
      AH   189.99g | media   226.83g | QUEDA -13% | lucro/craft   234.72g | g/ponto  0.77
  [ATENCAO   ] Thalassian Missive of the Harmonious Tier 2
      AH   188.55g | media   195.54g | QUEDA -5% | lucro/craft   232.53g | g/ponto  0.76
  [ATENCAO   ] Thalassian Missive of the Fireflash Tier 2
      AH   181.50g | media   226.26g | ALTA  +14% | lucro/craft   221.54g | g/ponto  0.73
  [ATENCAO   ] Thalassian Missive of the Feverflare Tier 2
      AH   180.58g | media   222.31g | ALTA  +15% | lucro/craft   220.14g | g/ponto  0.72
  [ATENCAO   ] Sienna Ink Tier 2
      AH    88.89g | media    89.24g | QUEDA -3% | lucro/craft   203.71g | g/ponto  0.66
  [ATENCAO   ] Thalassian Missive of Resourcefulness Tier 2
      AH   165.85g | media   230.28g | QUEDA -22% | lucro/craft   197.80g | g/ponto  0.65
  [ATENCAO   ] Munsell Ink Tier 2
      AH    73.96g | media    74.25g | estavel | lucro/craft   182.07g | g/ponto  0.59
  [ATENCAO   ] Thalassian Missive of Perception Tier 2
      AH   153.45g | media   233.02g | QUEDA -50% | lucro/craft   178.96g | g/ponto  0.59
  [ATENCAO   ] Thalassian Missive of the Quickblade Tier 2
      AH   149.00g | media   188.85g | estavel | lucro/craft   172.43g | g/ponto  0.56
  [ATENCAO   ] Thalassian Missive of Finesse Tier 2
      AH   144.40g | media   155.24g | QUEDA -9% | lucro/craft   165.10g | g/ponto  0.54
  [ATENCAO   ] Contract: The Singularity Tier 2
      AH   155.00g | media   160.04g | ALTA  +167% | lucro/craft   207.73g | g/ponto  0.51
  [ATENCAO   ] Thalassian Missive of Crafting Speed Tier 2
      AH   138.04g | media   207.30g | QUEDA -47% | lucro/craft   155.43g | g/ponto  0.51
  [ATENCAO   ] Codified Azeroot Tier 2
      AH   202.90g | media   211.64g | QUEDA -15% | lucro/craft   153.72g | g/ponto  0.50
  [MARGEM BX ] Soul Cipher Tier 2
      AH    64.00g | media    66.83g | QUEDA -4% | lucro/craft   113.68g | g/ponto  0.37
  [MARGEM BX ] Vantus Rune: Tides Tier 2
      AH   298.94g | media   250.24g | ALTA  +13% | lucro/craft   282.99g | g/ponto  0.33
  [MARGEM BX ] Contract: The Hara'ti Tier 2
      AH   103.49g | media    84.30g | ALTA  +110% | lucro/craft   128.63g | g/ponto  0.32
  [MARGEM BX ] Contract: Zul'jarra's Forces Tier 2
      AH   124.00g | media   122.76g | ALTA  +78% | lucro/craft   132.26g | g/ponto  0.32
  [MARGEM BX ] Contract: The Amani Tribe Tier 2
      AH   100.47g | media   105.48g | ALTA  +44% | lucro/craft   124.16g | g/ponto  0.31
  [MARGEM BX ] Vantus Rune: Radiant Tier 2
      AH   237.65g | media   159.46g | QUEDA -6% | lucro/craft   239.61g | g/ponto  0.28
  [MARGEM BX ] Contract: The Silvermoon Court Tier 2
      AH    74.00g | media    91.11g | QUEDA -12% | lucro/craft    83.62g | g/ponto  0.21

================================================================================
TOP 20 OPORTUNIDADES (por g/ponto de concentracao)
================================================================================
   1. Liquid Luster Tier 2                          ALQUIM g/pt  4.34  lucro/craft  1090.93g  estavel
   2. Light's Preservation Tier 2                   ALQUIM g/pt  3.66  lucro/craft   920.32g  QUEDA -38%
   3. Thalassian Missive of Deftness Tier 2         INSCRI g/pt  3.56  lucro/craft  1085.33g  QUEDA -8%
   4. Refreshing Serum Tier 2                       ALQUIM g/pt  3.43  lucro/craft   378.97g  ALTA  +13%
   5. Concentrated Silvermoon Health Potion Tier 2  ALQUIM g/pt  3.17  lucro/craft   796.93g  QUEDA -3%
   6. Potion of Recklessness Tier 2                 ALQUIM g/pt  3.13  lucro/craft   419.75g  estavel
   7. Haranir Phial of Finesse Tier 2               ALQUIM g/pt  2.95  lucro/craft   993.65g  ALTA  +9%
   8. Draught of Rampant Abandon Tier 2             ALQUIM g/pt  2.70  lucro/craft   678.75g  ALTA  +14%
   9. Void-Shrouded Tincture Tier 2                 ALQUIM g/pt  2.63  lucro/craft   660.90g  QUEDA -4%
  10. Potion of Devoured Dreams Tier 2              ALQUIM g/pt  2.60  lucro/craft   654.50g  estavel
  11. Light's Potential Tier 2                      ALQUIM g/pt  2.59  lucro/craft   652.00g  estavel
  12. Lightfused Mana Potion Tier 2                 ALQUIM g/pt  2.58  lucro/craft   650.05g  QUEDA -7%
  13. Haranir Phial of Ingenuity Tier 2             ALQUIM g/pt  2.52  lucro/craft   849.10g  ALTA  +11%
  14. Stabilizing Gemstone Bandolier Tier 2         JOALHE g/pt  2.45  lucro/craft   882.76g  ALTA  +41%
  15. Flask of the Blood Knights Tier 2             ALQUIM g/pt  2.41  lucro/craft   812.12g  estavel
  16. Enchant Tool - Sin'dorei Deftness Tier 2      ENCANT g/pt  2.32  lucro/craft   512.94g  QUEDA -23%
  17. Flask of Thalassian Resistance Tier 2         ALQUIM g/pt  2.27  lucro/craft   763.77g  estavel
  18. Enchant Shoulders - Akil'zon's Swiftness Tier ENCANT g/pt  2.24  lucro/craft   495.67g  estavel
  19. Haranir Phial of Perception Tier 2            ALQUIM g/pt  2.20  lucro/craft   742.01g  estavel
  20. Flask of the Magisters Tier 2                 ALQUIM g/pt  2.16  lucro/craft   726.97g  QUEDA -6%

================================================================================
INSUMOS / REAGENTES - preco atual + especulacao
================================================================================
  Fonte da especulacao: backfill historico UMX (serie longa).
  Backfill atualizado em: 2026-10-24T10:49:22Z
  !! backfill tem 7 dias - rode _gen_umx.py para atualizar
  percentil_30d = posicao do preco de HOJE na faixa dos ultimos 30 dias
    (0% = minimo da faixa / barato ; 100% = maximo / caro)
  [BARATO] = percentil<=35 E n>=30 dias de serie (base estatistica ok)
  tend = variacao do preco (ult. 7 dias vs 30 dias); negativo = caindo

  INSUMO                                    PRECO(g) perc30  n30  med30(g)   tend% FLAG
  --------------------------------------------------------------------------------------
  Majestic Hide                              1592.98   3.3%   30   1771.94  -10.2 [BARATO]
  Sunfire Silk Bolt Tier 1                    113.78   6.7%   30    135.41  -10.1 [BARATO]
  Petrified Root                               70.69   6.7%   30    309.37  -70.6 [BARATO]
  Arcanoweave Bolt Tier 1                      41.99   6.7%   30     59.99  -28.1 [BARATO]
  Majestic Fin                                250.00  13.3%   30    331.57  -32.8 [BARATO]
  Dawn Crystal Tier 1                         163.97  16.7%   30    226.71  -39.9 [BARATO]
  Mana Lily Pigment Tier 1                     13.44  16.7%   30     15.99   -9.3 [BARATO]
  Argentleaf Tier 1                             3.50  16.7%   30      3.96  -11.8 [BARATO]
  Eversinging Dust Tier 1                       0.81  20.0%   30      0.89   -8.4 [BARATO]
  Vantus Rune: Radiant Tier 1                  25.00  23.3%   30     80.97  -28.8 [BARATO]
  Sanguithorn Tier 1                            0.56  26.7%   30      0.49   +3.7 [BARATO]
  Fantastic Fur                                89.74  30.0%   30     92.27   -0.7 [BARATO]
  Mana Lily Tier 1                             17.82  30.0%   30      1.63   -0.5 [BARATO]
  Carving Canine                                0.62  30.0%   30      0.79  -11.5 [BARATO]
  Majestic Claw                                44.00  36.7%   30     54.41  -15.6 
  Duskshrouded Stone Tier 1                     2.24  36.7%   30      3.45   -4.5 
  Radiant Shard Tier 1                          2.20  36.7%   30      2.98  +11.5 
  Sienna Ink Tier 1                            84.25  40.0%   30     85.49   -6.1 
  Silvermoon Health Potion Tier 1               3.41  43.3%   30      3.48   +7.1 
  Mote of Wild Magic                            0.63  43.3%   30      0.68  -11.6 
  Nocturnal Lotus                             260.95  60.0%   30    260.52   +2.3 
  Mote of Light                                 0.72  63.3%   30      0.68   +2.8 
  Argentleaf Pigment Tier 1                    26.89  66.7%   30     25.49   -8.9 
  Cursebound Globe                             11.13  73.3%   30      9.24   +3.3 
  Soul Cipher Tier 1                           68.70  80.0%   30     61.78   +6.6 
  Refulgent Copper Ingot Tier 1                53.95  80.0%   30     47.75  +14.6 
  Crystalline Glass Tier 1                      9.16  80.0%   30    103.98   +2.3 
  Powder Pigment Tier 1                         2.41  80.0%   30      2.00  +16.4 
  Sanguithorn Pigment Tier 1                   15.99  83.3%   30     12.86  +33.0 
  Azeroot Tier 1                               31.42  86.7%   30     14.93  +42.0 
  Flawless Harandar Peridot Tier 1             42.99  90.0%   30     88.95  +30.7 
  Amani Lapis Tier 1                           31.99  90.0%   30     54.17  +54.6 
  Munsell Ink Tier 1                           10.80  90.0%   30     66.38  +11.8 
  Gloaming Alloy Tier 1                        79.74  93.3%   30    162.12  +12.1 
  Neutralized Venom Clot                       13.00  93.3%   30      9.46   +2.5 
  Flawless Sanguine Garnet Tier 1             100.29  96.7%   30     63.48  +45.8 
  Flawless Amani Lapis Tier 1                  39.99  96.7%   30     67.86  +45.3 
  Flawless Tenebrous Amethyst Tier 1           33.99  96.7%   30     75.45  +39.7 
  Tranquility Bloom Tier 1                      2.31  96.7%   30      1.59  +31.8 
  Glimmering Gemdust Tier 1                   123.87 100.0%   30     68.17  +53.6 
  Tenebrous Amethyst Tier 1                   103.29 100.0%   30     54.42  +52.0 
  Sanguine Garnet Tier 1                       97.29 100.0%   30     54.59  +53.1 
  Sterling Alloy Tier 1                        78.00 100.0%   30    164.85  +15.8 
  Peerless Plumage                             67.93 100.0%   30     38.04  +62.0 
  Harandar Peridot Tier 1                      33.99 100.0%   30     54.15  +51.4 
  Darkmoon Deck: Void                         137.97    -      -         -      - s/serie
  Darkmoon Deck: Blood                        137.97    -      -         -      - s/serie
  Darkmoon Deck: Rot                          137.97    -      -         -      - s/serie
  Darkmoon Deck: Hunt                         137.97    -      -         -      - s/serie
  Eversong Diamond Tier 1                      30.89    -      -         -      - s/serie
  Sunglass Vial Tier 1                          2.97    -      -         -      - NPC fixo
  Mote of Primal Energy                         0.54    -      -         -      - s/serie
  Thalassian Songwater                          0.36    -      -         -      - s/serie
  Mote of Pure Void                             0.24    -      -         -      - s/serie
  Lexicologist's Vellum                         0.21    -      -         -      - s/serie

  insumos distintos: 55 | marcados [BARATO]: 14
  LEMBRE: 'barato' aqui e preco relativo a propria serie do insumo;
  confirme demanda/escoamento antes de comprar volume para revenda.

================================================================================
CAIXA REAL (TSM Accounting) - o que VOCE vendeu, nao o que o mercado pede
================================================================================
  Janela lida do addon: 2026-03-17 a 2026-10-31
  Faturamento AH (Auction) :     47,582,794 g
  Compras AH + vendor      :     29,917,859 g
  Saldo de caixa           :     17,664,934 g   (fluxo de AH/Trade)
    desses, 2,543,326g vieram de receita/molde/mount (>5.000g/un), ja incluidos no total
  NAO entram aqui: ouro de quest/delve/raide e o valor do estoque parado.

  Ultimos 30 dias (2026-10-01 a 2026-10-31): vendas 4,901,725g | compras 2,778,483g | saldo +2,123,242g

  Maiores vendas registradas (price x quantity = total da linha):
     2026-04-06  432x 2,533g = 1,094,323g  (item 239202)
     2026-05-29  2000x 489g = 978,500g  (item 251285)
     2026-04-14  666x 1,424g = 949,044g  (item 239202)
     2026-04-19  1428x 500g = 714,928g  (item 241308)
     2026-09-11  3266x 194g = 636,674g  (item 241308)

  Itens que mais faturaram (preco REALIZADO = o que voce conseguiu):
  ITEM                                    RECEITA(g)     UNID MEDIA(g/un)    AH HOJE  VENDAS
  ------------------------------------------------------------------------------------------
  Potencial da Luz                         5,712,047    20793      274.71     100.58      33
  Rolo de Seda de Fogo Solar               4,769,568     5663      842.23     121.97      61
  Runa de Aprimoramento Tocada pelo Caos   3,513,344     6238      563.22     378.97      94
  Prisma Caleidoscópico                    3,112,875     3445      903.59     599.87      36
  Poção da Imprudência                     2,853,556    23440      121.74      73.94      24
  Encantamento da Acuidade dos Ren'dorei   2,850,831      979     2911.98     940.16      29
  Rolo de Arcanotrama                      1,937,328     1925     1006.40      45.98      59
  Raiz Petrificada                         1,879,749     9308      201.95      75.59      12
  Ampola de Vitrissol                      1,826,245     4886      373.77     279.00      52
  Lótus Noturno                            1,484,274     3152      470.90     260.98      54
  Banquete Desabrochante                     945,048     2984      316.71     139.99      12
  Poção de Mana Fundida com Luz              929,849     2329      399.25      84.25      10
  Minério de Cobre Refulgente                925,908    20317       45.57      27.83      52
  Cristal da Aurora                          918,115     1693      542.30     159.73      63
  Poção de Vida de Luaprata                  887,038     1401      633.15      63.00      34

  !!! 15 dos itens acima foram vendidos a >1,3x o preco de mercado de hoje.
      Isso e historico (preco de season alta), NAO preco de reposicao.

  COMO USAR: 'MEDIA(g/un)' e o seu preco realizado; 'AH HOJE' e a mediana do
  UMX nos ultimos 7 dias. Craft so repete se o custo de hoje ainda deixar
  margem ACIMA da media realizada - vender bem no passado nao garante agora.

================================================================================
ESTOQUE E PLANO DE VENDA (Syndicator + TSM + UMX)
================================================================================
  Estoque lido em: 2026-10-31T09:07:54 (idade 0.0 h) | plano gerado em: 2026-10-31T09:07:58
  Ouro na conta: banco do bando 2,065,863g + personagens 143,481g = 2,209,345g
  Unidades no banco do bando: 71,209 | valor a preco de hoje: 1,045,151g
  Itens avaliados: 316 (com giro 56 / sem giro 260) | leiloes ativos: 76
  Dia da semana em que VOCE mais vende: Sex

  Seu historico por dia da semana (media de receita por dia com venda):
     Seg 316,942g | Ter 230,888g | Qua 161,231g | Qui 281,256g | Sex 482,321g | Sab 233,313g | Dom 317,716g

  Entrou no estoque desde 2026-10-30 (292 unidades) - produzido ou comprado:
     + Pulsos Cortesãos                              109
     + Estilhaço Radiante                             27
     + Raiz Petrificada                               18
     + Pedra-ume de Oxxeína Forjada                   15
     + Bastão de Mistura do Alquimista Dourado        10
     + Estilhaço Radiante                              9
     + Supertorquês Gigagema                           8
     + Lodo Pútrido                                    6
     + Cepa da Peste Estabilizada                      6
     + Carne Delgada                                   5

  PLANO - itens com estoque e decisao de venda (45):
  ITEM                                  QTD  UN/DIA   HOJE(g)   PISO(g)  perc DECISAO         VENDER
  ----------------------------------------------------------------------------------------------------
  Pó de Gema Luzente                    989    20.0         -    676.28     - vender_parcial     140
  Ametista Tenebrosa Impecável          131     2.0         -    526.60     - vender_parcial      14
  Bastão de Prata Brilhante Rúnico        9     1.0         -   3676.47     - vender_parcial       2
  Raiz Petrificada                      439     9.0     75.59     68.03    13 vender_parcial      63
  Peridoto de Harandar                   44     2.0         -    452.56     - vender_parcial      11
  Globo Pragatado                      1360     0.7      9.81      8.83    60 vender_parcial       5
  Estilhaço Radiante                   3944     2.0         -      2.22     - vender_parcial      14
  Raizeroth                             404     4.0     19.90     17.91    83 vender_agora        28
  Asteroide Encalhado                   486     1.5     14.94     13.45    47 vender_parcial      10
  Minério de Cobre Refulgente          1173   155.7      5.65      5.09    87 vender_agora       293
  Guarnição Terrosa                     949     9.8      6.75      6.08    50 vender_parcial      68
  Bentônico Bulboso                      93     6.0     68.48     61.63    90 vender_agora        23
  Corante em Pó                        2961  3365.0         -      1.80     - vender_parcial     740
  Liga Crepuscular                       14     2.0         -    371.87     - vender_parcial       4
  Poção de Vida de Luaprata            1517    11.0      3.69      3.32    67 vender_agora        77
  Floração da Tranquilidade            2780     0.5      1.84      1.66    73 vender_agora         4
  Bolsa de Reagentes de Trama da Tec     17     1.5    220.97    198.87    47 vender_parcial       4
  Coágulo de Peçonha Neutralizada       324     1.9      9.41      8.47    50 vender_parcial      14

  Guardar (preco barato hoje; nao despejar):
     Torquês Sin'dorei                      20 un | hoje 800.94g | percentil 13 | preco barato (percentil 13) e estoque cobre 5 dias | encalhe
     Escamas Revenidas pelo Caos          2277 un | hoje 1.63g | percentil 33 | preco barato (percentil 33) e estoque cobre 6 dias
     Folhargêntea                          967 un | hoje 3.39g | percentil 20 | preco barato (percentil 20) e estoque cobre 12 dias
     Pó de Eternelegia                    2418 un | hoje 0.85g | percentil 27 | preco barato (percentil 27) e estoque cobre 1 dias | encalhe
     Comemoração de Harandar                10 un | hoje 113.79g | percentil 13 | preco barato (percentil 13) e estoque cobre 1 dias | encalhe
     Lamipedra Refulgente                    6 un | hoje 161.00g | percentil 13 | preco barato (percentil 13) e estoque cobre 0 dias | encalhe
     Flora Composta                         61 un | hoje 12.95g | percentil 30 | preco barato (percentil 30) e estoque cobre 17 dias | encalh
     Gelo Desperto                           6 un | hoje 116.97g | percentil 23 | preco barato (percentil 23) e estoque cobre 0 dias | encalhe

  Leiloes ativos expirando (proximos):
     2026-10-31 09:20  Encantamento das Raízes de Shaladr    3x Pyrogalth-Azralon
     2026-10-31 09:20  Encantamento de Rito dos Hash'ey -    4x Pyrogalth-Azralon
     2026-10-31 09:22  Minério de Elétio                     8x Pyrogalth-Azralon
     2026-10-31 09:22  Minério de Laestrita                 16x Pyrogalth-Azralon
     2026-10-31 09:22  Estilhaço Orbóreo                     1x Pyrogalth-Azralon
     2026-10-31 09:22  Minério de Oxxeína                    5x Pyrogalth-Azralon
     2026-10-31 09:22  Pernil Fantasmagórico                 4x Pyrogalth-Azralon
     2026-10-31 09:22  Pelagem Protogênica                  40x Pyrogalth-Azralon

  REGRAS DESTA SECAO (nao invente fora delas):
     vender_agora   = percentil >= 65
     guardar        = percentil <= 35 e cobertura < 45 dias
     quantidade     = min(giro de 7 dias, 25% do estoque)
     piso de preco  = preco realizado mediano; fallback 90% do preco de hoje
  Ao recomendar, use o DIA DA SEMANA do seu historico e a quantidade da
  coluna VENDER; 'estoque do warband' so muda quando o banco e aberto no jogo.

--------------------------------------------------------------------------------
Cole este arquivo no Notebook Gemini como 'SNAPSHOT ATUAL - [data]'.
Lembre-se: preco anunciado != preco vendido; dados sao de Azralon.
--------------------------------------------------------------------------------
<!-- MERCADO:FIM -->
```

---

## Regras de leitura (para o modelo)

1. **Não recalcule custo, g/conc, saldo nem projeção.** Os números deste arquivo já saíram das fórmulas
   canônicas do projeto; refazer a conta de cabeça é a principal fonte de erro.
2. **Preço anunciado ≠ preço vendido.** O AH mostra pedido; a liquidez e o preço realizado vêm do TSM.
3. Se o dado não estiver aqui, responda **"não está no painel"** em vez de estimar.
4. Unidade oficial é **gold (g)**; valores em R$ são referência pela cotação de token informada.
5. Semana do jogo = **terça 12h → segunda 12h** (não é semana de calendário).
6. Só existe uma coisa "viva" aqui: a data do topo. Se ela estiver velha, avise antes de responder.
