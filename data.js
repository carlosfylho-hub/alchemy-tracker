// =================================================================================
// DADOS E CONFIGURAÇÕES GLOBAIS DO TRACKER DE CONCENTRAÇÃO E LUCRO
// =================================================================================

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzeSm0A7gN_reEeTnsbBjQ1Ntz-rsS1f_rGhZj0zDgVjhs7W1XXfq9hNxGf9y-VKTgc/exec";

const STORAGE_VERSION = "v8_cloud_backup";
const STORAGE_KEY = "kaychak_conc_complete_" + STORAGE_VERSION;
const PREV_PRICES_KEY = STORAGE_KEY + "_prev";
const HISTORY_KEY = STORAGE_KEY + "_history";
const MAX_HISTORY_POINTS = 500;
const SHEET_ID = "1V5Yxez_-nuPsvmtJLstYL61WhXU_sPNnPh8zxrnVE5k";

const SHEET_TABS = {
  alchemy: "Alchemy Conc",
  jewelcrafting: "Jewelcrafting Conc",
  enchanting: "Enchanting Conc",
  inscription: "Inscription Conc"
};

const DEFAULT_PROF_SETTINGS = {
  alchemy: { res: 36, mc: 37, ing: 29, refund: 70 },
  jewelcrafting: { res: 17, mc: 26, ing: 25, refund: 70 },
  enchanting: { res: 25, mc: 20, ing: 25, refund: 70 },
  inscription: { res: 17.7, mc: 31, ing: 25, refund: 70 }
};

const dataAlchemy = [
  { id: 1, category: "LIGHT POTIONS", name: "Silvermoon Health Potion Tier 2", baseCost: 31.2, ahPrice: 69.9, baseYield: 5, mcFactor: 1.5333, concCost: 294 },
  { id: 2, category: "LIGHT POTIONS", name: "Lightfused Mana Potion Tier 2", baseCost: 35.1, ahPrice: 87.9, baseYield: 5, mcFactor: 1.5333, concCost: 294 },
  { id: 3, category: "LIGHT POTIONS", name: "Refreshing Serum Tier 2", baseCost: 38.3, ahPrice: 44.6, baseYield: 5, mcFactor: 1.5333, concCost: 129 },
  { id: 4, category: "LIGHT POTIONS", name: "Light's Potential Tier 2", baseCost: 147.1, ahPrice: 99.8, baseYield: 5, mcFactor: 1.5333, concCost: 294 },
  { id: 5, category: "LIGHT POTIONS", name: "Potion of Zealotry Tier 2", baseCost: 301.2, ahPrice: 144.0, baseYield: 5, mcFactor: 1.5333, concCost: 294 },
  { id: 6, category: "LIGHT POTIONS", name: "Light's Preservation Tier 2", baseCost: 108.3, ahPrice: 90.0, baseYield: 5, mcFactor: 1.5333, concCost: 294 },
  { id: 7, category: "LIGHT POTIONS", name: "Enlightenment Tonic Tier 2", baseCost: 24.5, ahPrice: 18.5, baseYield: 5, mcFactor: 1.5333, concCost: 129 },
  { id: 8, category: "PHIALS", name: "Haranir Phial of Finesse Tier 2", baseCost: 126.3, ahPrice: 256.0, baseYield: 4, mcFactor: 1.5, concCost: 394 },
  { id: 9, category: "PHIALS", name: "Haranir Phial of Ingenuity Tier 2", baseCost: 43.8, ahPrice: 94.6, baseYield: 4, mcFactor: 1.5, concCost: 394 },
  { id: 10, category: "PHIALS", name: "Haranir Phial of Perception Tier 2", baseCost: 207.3, ahPrice: 161.0, baseYield: 4, mcFactor: 1.5, concCost: 394 },
  { id: 11, category: "VOID POTIONS", name: "Draught of Rampant Abandon Tier 2", baseCost: 47.1, ahPrice: 124.9, baseYield: 5, mcFactor: 1.5333, concCost: 294 },
  { id: 12, category: "VOID POTIONS", name: "Potion of Devoured Dreams Tier 2", baseCost: 46.7, ahPrice: 67.5, baseYield: 5, mcFactor: 1.5333, concCost: 294 },
  { id: 13, category: "VOID POTIONS", name: "Potion of Recklessness Tier 2", baseCost: 143.5, ahPrice: 69.7, baseYield: 5, mcFactor: 1.5333, concCost: 157 },
  { id: 14, category: "VOID POTIONS", name: "Amani Extract Tier 2", baseCost: 115.6, ahPrice: 129.7, baseYield: 5, mcFactor: 1.5333, concCost: 294 },
  { id: 15, category: "VOID POTIONS", name: "Void-Shrouded Tincture Tier 2", baseCost: 39.8, ahPrice: 78.9, baseYield: 5, mcFactor: 1.5333, concCost: 294 },
  { id: 16, category: "FLASKS", name: "Flask of the Shattered Sun Tier 2", baseCost: 588.5, ahPrice: 429.0, baseYield: 2, mcFactor: 1.533, concCost: 394 },
  { id: 17, category: "FLASKS", name: "Flask of the Blood Knights Tier 2", baseCost: 391.2, ahPrice: 389.9, baseYield: 2, mcFactor: 1.533, concCost: 394 },
  { id: 18, category: "FLASKS", name: "Flask of the Magisters Tier 2", baseCost: 365.8, ahPrice: 356.4, baseYield: 2, mcFactor: 1.533, concCost: 394 },
  { id: 19, category: "FLASKS", name: "Flask of Thalassian Resistance Tier 2", baseCost: 524.3, ahPrice: 381.0, baseYield: 2, mcFactor: 1.533, concCost: 394 }
];

const dataJewelcrafting = [
  { id: 101, category: "GEMS & PRISMS", name: "Sin'dorei Lens Tier 2", baseCost: 58.7, ahPrice: 216.0, baseYield: 1.0, mcFactor: 1.5, concCost: 0 },
  { id: 102, category: "GEMS & PRISMS", name: "Flawless Deadly Amethyst Tier 2", baseCost: 269.3, ahPrice: 405.96, baseYield: 1.0, mcFactor: 1.5, concCost: 0 },
  { id: 103, category: "GEMS & PRISMS", name: "Kaleidoscopic Prism Tier 2", baseCost: 355.9, ahPrice: 537.82, baseYield: 1.0, mcFactor: 1.5, concCost: 0 },
  { id: 104, category: "GEMS & PRISMS", name: "Flawless Masterful Amethyst Tier 2", baseCost: 269.3, ahPrice: 355.0, baseYield: 1.0, mcFactor: 1.5, concCost: 0 },
  { id: 105, category: "GEMS & PRISMS", name: "Sunglass Vial Tier 2", baseCost: 55.1, ahPrice: 280.89, baseYield: 1.0, mcFactor: 1.5, concCost: 0 },
  { id: 106, category: "GEMS & PRISMS", name: "Flawless Quick Amethyst Tier 2", baseCost: 269.3, ahPrice: 402.64, baseYield: 1.0, mcFactor: 1.5, concCost: 0 },
  { id: 107, category: "GEMS & PRISMS", name: "Flawless Versatile Amethyst Tier 2", baseCost: 269.3, ahPrice: 370.51, baseYield: 1.0, mcFactor: 1.5, concCost: 0 },
  { id: 108, category: "GEMS & PRISMS", name: "Prismatic Focusing Iris Tier 2", baseCost: 120.0, ahPrice: 400.0, baseYield: 1.0, mcFactor: 1.5, concCost: 0 },
  { id: 109, category: "GEMS & PRISMS", name: "Stabilizing Gemstone Bandolier Tier 2", baseCost: 161.8, ahPrice: 305.0, baseYield: 1.0, mcFactor: 1.5, concCost: 0 },
  { id: 110, category: "GEMS & PRISMS", name: "Flawless Deadly Peridot Tier 2", baseCost: 269.6, ahPrice: 389.06, baseYield: 1.0, mcFactor: 1.5, concCost: 0 },
  { id: 111, category: "GEMS & PRISMS", name: "Flawless Masterful Peridot Tier 2", baseCost: 269.6, ahPrice: 377.0, baseYield: 1.0, mcFactor: 1.5, concCost: 0 },
  { id: 112, category: "GEMS & PRISMS", name: "Flawless Quick Peridot Tier 2", baseCost: 269.6, ahPrice: 371.89, baseYield: 1.0, mcFactor: 1.5, concCost: 0 },
  { id: 113, category: "DIAMONDS", name: "Indecipherable Eversong Diamond Tier 2", baseCost: 458.0, ahPrice: 549.98, baseYield: 1.0, mcFactor: 1.5, concCost: 0 },
  { id: 114, category: "GEMS & PRISMS", name: "Flawless Versatile Peridot Tier 2", baseCost: 269.6, ahPrice: 392.08, baseYield: 1.0, mcFactor: 1.5, concCost: 0 },
  { id: 115, category: "DIAMONDS", name: "Powerful Eversong Diamond Tier 2", baseCost: 458.0, ahPrice: 489.47, baseYield: 1.0, mcFactor: 1.5, concCost: 0 },
  { id: 116, category: "DIAMONDS", name: "Stoic Eversong Diamond Tier 2", baseCost: 458.0, ahPrice: 563.07, baseYield: 1.0, mcFactor: 1.5, concCost: 0 },
  { id: 117, category: "DIAMONDS", name: "Telluric Eversong Diamond Tier 2", baseCost: 458.0, ahPrice: 675.75, baseYield: 1.0, mcFactor: 1.5, concCost: 0 },
  { id: 118, category: "LAPIS & GARNET", name: "Flawless Deadly Lapis Tier 2", baseCost: 268.0, ahPrice: 326.95, baseYield: 1.0, mcFactor: 1.5, concCost: 0 },
  { id: 119, category: "LAPIS & GARNET", name: "Flawless Masterful Lapis Tier 2", baseCost: 268.0, ahPrice: 373.99, baseYield: 1.0, mcFactor: 1.5, concCost: 0 },
  { id: 120, category: "LAPIS & GARNET", name: "Flawless Quick Lapis Tier 2", baseCost: 268.0, ahPrice: 369.98, baseYield: 1.0, mcFactor: 1.5, concCost: 0 },
  { id: 121, category: "LAPIS & GARNET", name: "Flawless Versatile Lapis Tier 2", baseCost: 268.0, ahPrice: 461.46, baseYield: 1.0, mcFactor: 1.5, concCost: 0 },
  { id: 122, category: "LAPIS & GARNET", name: "Flawless Deadly Garnet Tier 2", baseCost: 267.3, ahPrice: 375.0, baseYield: 1.0, mcFactor: 1.5, concCost: 0 },
  { id: 123, category: "LAPIS & GARNET", name: "Flawless Masterful Garnet Tier 2", baseCost: 267.3, ahPrice: 383.99, baseYield: 1.0, mcFactor: 1.5, concCost: 0 },
  { id: 124, category: "LAPIS & GARNET", name: "Flawless Quick Garnet Tier 2", baseCost: 267.3, ahPrice: 349.95, baseYield: 1.0, mcFactor: 1.5, concCost: 0 },
  { id: 125, category: "LAPIS & GARNET", name: "Flawless Versatile Garnet Tier 2", baseCost: 267.3, ahPrice: 374.22, baseYield: 1.0, mcFactor: 1.5, concCost: 0 }
];

const dataEnchanting = [
  { id: 201, category: "PROFESSION & TOOLS", name: "Enchant Tool - Amani Perception Tier 2", baseCost: 280.6, ahPrice: 662.17, baseYield: 1.0, mcFactor: 1.2, concCost: 0 },
  { id: 202, category: "HELM & BOOTS", name: "Enchant Helm - Blessing of Speed Tier 2", baseCost: 17.8, ahPrice: 12.0, baseYield: 1.0, mcFactor: 1.2, concCost: 0 },
  { id: 203, category: "PROFESSION & TOOLS", name: "Enchant Tool - Haranir Finesse Tier 2", baseCost: 277.9, ahPrice: 500.96, baseYield: 1.0, mcFactor: 1.2, concCost: 0 },
  { id: 204, category: "HELM & BOOTS", name: "Enchant Helm - Empowered Blessing of Speed Tier 2", baseCost: 415.0, ahPrice: 733.0, baseYield: 1.0, mcFactor: 1.2, concCost: 0 },
  { id: 205, category: "PROFESSION & TOOLS", name: "Enchant Tool - Sin'dorei Deftness Tier 2", baseCost: 561.3, ahPrice: 618.92, baseYield: 1.0, mcFactor: 1.2, concCost: 0 },
  { id: 206, category: "HELM & BOOTS", name: "Enchant Helm - Rune of Avoidance Tier 2", baseCost: 17.8, ahPrice: 19.99, baseYield: 1.0, mcFactor: 1.2, concCost: 0 },
  { id: 207, category: "PROFESSION & TOOLS", name: "Enchant Tool - Amani Resourcefulness Tier 2", baseCost: 280.6, ahPrice: 590.43, baseYield: 1.0, mcFactor: 1.2, concCost: 0 },
  { id: 208, category: "HELM & BOOTS", name: "Enchant Helm - Empowered Rune of Avoidance Tier 2", baseCost: 420.8, ahPrice: 997.0, baseYield: 1.0, mcFactor: 1.2, concCost: 0 },
  { id: 209, category: "PROFESSION & TOOLS", name: "Enchant Tool - Haranir Multicrafting Tier 2", baseCost: 555.5, ahPrice: 888.1, baseYield: 1.0, mcFactor: 1.2, concCost: 0 },
  { id: 210, category: "HELM & BOOTS", name: "Enchant Helm - Hex of Leeching Tier 2", baseCost: 17.8, ahPrice: 19.81, baseYield: 1.0, mcFactor: 1.2, concCost: 0 },
  { id: 211, category: "PROFESSION & TOOLS", name: "Enchant Tool - Ren'dorei Ingenuity Tier 2", baseCost: 480.9, ahPrice: 615.94, baseYield: 1.0, mcFactor: 1.2, concCost: 0 },
  { id: 212, category: "HELM & BOOTS", name: "Enchant Helm - Empowered Hex of Leeching Tier 2", baseCost: 417.7, ahPrice: 744.0, baseYield: 1.0, mcFactor: 1.2, concCost: 0 },
  { id: 213, category: "HELM & BOOTS", name: "Enchant Boots - Farstrider's Hunt Tier 2", baseCost: 411.1, ahPrice: 622.0, baseYield: 1.0, mcFactor: 1.2, concCost: 0 },
  { id: 214, category: "SHOULDERS", name: "Enchant Shoulders - Akil'zon's Swiftness Tier 2", baseCost: 199.3, ahPrice: 480.0, baseYield: 1.0, mcFactor: 1.2, concCost: 0 },
  { id: 215, category: "HELM & BOOTS", name: "Enchant Boots - Lynx's Dexterity Tier 2", baseCost: 320.1, ahPrice: 533.04, baseYield: 1.0, mcFactor: 1.2, concCost: 0 },
  { id: 216, category: "SHOULDERS", name: "Enchant Shoulders - Amirdrassil's Grace Tier 2", baseCost: 415.0, ahPrice: 744.02, baseYield: 1.0, mcFactor: 1.2, concCost: 0 },
  { id: 217, category: "HELM & BOOTS", name: "Enchant Boots - Shaladrassil's Roots Tier 2", baseCost: 697.1, ahPrice: 1033.0, baseYield: 1.0, mcFactor: 1.2, concCost: 0 },
  { id: 218, category: "SHOULDERS", name: "Enchant Shoulders - Flight of the Eagle Tier 2", baseCost: 17.8, ahPrice: 19.0, baseYield: 1.0, mcFactor: 1.2, concCost: 0 },
  { id: 219, category: "SHOULDERS", name: "Enchant Shoulders - Nature's Grace Tier 2", baseCost: 17.8, ahPrice: 20.5, baseYield: 1.0, mcFactor: 1.2, concCost: 0 },
  { id: 220, category: "SHOULDERS", name: "Enchant Shoulders - Silvermoon's Mending Tier 2", baseCost: 202.4, ahPrice: 477.94, baseYield: 1.0, mcFactor: 1.2, concCost: 0 },
  { id: 221, category: "CHEST", name: "Enchant Chest - Mark of Nalorakk Tier 2", baseCost: 460.2, ahPrice: 750.0, baseYield: 1.0, mcFactor: 1.2, concCost: 0 },
  { id: 222, category: "SHOULDERS", name: "Enchant Shoulders - Thalassian Recovery Tier 2", baseCost: 17.8, ahPrice: 18.98, baseYield: 1.0, mcFactor: 1.2, concCost: 0 },
  { id: 223, category: "CHEST", name: "Enchant Chest - Mark of the Magister Tier 2", baseCost: 481.2, ahPrice: 799.99, baseYield: 1.0, mcFactor: 1.2, concCost: 0 },
  { id: 224, category: "CHEST", name: "Enchant Chest - Mark of the Rootwarden Tier 2", baseCost: 657.0, ahPrice: 984.99, baseYield: 1.0, mcFactor: 1.2, concCost: 0 },
  { id: 225, category: "CHEST", name: "Enchant Chest - Mark of the Worldsoul Tier 2", baseCost: 2083.7, ahPrice: 2376.0, baseYield: 1.0, mcFactor: 1.2, concCost: 0 },
  { id: 226, category: "WEAPONS", name: "Enchant Weapon - Acuity of the Ren'dorei Tier 2", baseCost: 721.8, ahPrice: 1021.65, baseYield: 1.0, mcFactor: 1.2, concCost: 0 },
  { id: 227, category: "WEAPONS", name: "Enchant Weapon - Arcane Mastery Tier 2", baseCost: 712.7, ahPrice: 888.88, baseYield: 1.0, mcFactor: 1.2, concCost: 0 },
  { id: 228, category: "WEAPONS", name: "Enchant Weapon - Berserker's Rage Tier 2", baseCost: 646.2, ahPrice: 899.88, baseYield: 1.0, mcFactor: 1.2, concCost: 0 },
  { id: 229, category: "RINGS", name: "Enchant Ring - Eyes of the Eagle Tier 2", baseCost: 385.7, ahPrice: 519.99, baseYield: 1.0, mcFactor: 1.2, concCost: 0 },
  { id: 230, category: "WEAPONS", name: "Enchant Weapon - Flames of the Sin'Dorei Tier 2", baseCost: 862.9, ahPrice: 824.98, baseYield: 1.0, mcFactor: 1.2, concCost: 0 },
  { id: 231, category: "RINGS", name: "Enchant Ring - Nature's Fury Tier 2", baseCost: 320.1, ahPrice: 511.0, baseYield: 1.0, mcFactor: 1.2, concCost: 0 },
  { id: 232, category: "WEAPONS", name: "Enchant Weapon - Jan'alai's Precision Tier 2", baseCost: 871.3, ahPrice: 950.97, baseYield: 1.0, mcFactor: 1.2, concCost: 0 },
  { id: 233, category: "RINGS", name: "Enchant Ring - Silvermoon's Alacrity Tier 2", baseCost: 324.5, ahPrice: 511.0, baseYield: 1.0, mcFactor: 1.2, concCost: 0 },
  { id: 234, category: "WEAPONS", name: "Enchant Weapon - Strength of Halazzi Tier 2", baseCost: 673.8, ahPrice: 1097.9, baseYield: 1.0, mcFactor: 1.2, concCost: 0 },
  { id: 235, category: "RINGS", name: "Enchant Ring - Silvermoon's Tenacity Tier 2", baseCost: 324.5, ahPrice: 499.0, baseYield: 1.0, mcFactor: 1.2, concCost: 0 },
  { id: 236, category: "WEAPONS", name: "Enchant Weapon - Worldsoul Aegis Tier 2", baseCost: 647.5, ahPrice: 355.14, baseYield: 1.0, mcFactor: 1.2, concCost: 0 },
  { id: 237, category: "RINGS", name: "Enchant Ring - Zul'jin's Mastery Tier 2", baseCost: 322.1, ahPrice: 518.99, baseYield: 1.0, mcFactor: 1.2, concCost: 0 },
  { id: 238, category: "WEAPONS", name: "Enchant Weapon - Worldsoul Cradle Tier 2", baseCost: 647.5, ahPrice: 1300.62, baseYield: 1.0, mcFactor: 1.2, concCost: 0 },
  { id: 239, category: "WEAPONS", name: "Enchant Weapon - Worldsoul Tenacity Tier 2", baseCost: 647.5, ahPrice: 878.18, baseYield: 1.0, mcFactor: 1.2, concCost: 0 }
];

const dataInscription = [
  { id: 301, category: "INKS & CIPHERS", name: "Munsell Ink Tier 2", baseCost: 39.8, ahPrice: 64.16, baseYield: 5.0, mcFactor: 1.5, concCost: 0 },
  { id: 302, category: "MISSIVES", name: "Thalassian Missive of Perception Tier 2", baseCost: 53.3, ahPrice: 135.0, baseYield: 2.0, mcFactor: 1.5, concCost: 0 },
  { id: 303, category: "INKS & CIPHERS", name: "Sienna Ink Tier 2", baseCost: 64.7, ahPrice: 75.09, baseYield: 5.0, mcFactor: 1.5, concCost: 0 },
  { id: 304, category: "MISSIVES", name: "Thalassian Missive of Multicraft Tier 2", baseCost: 53.3, ahPrice: 141.52, baseYield: 2.0, mcFactor: 1.5, concCost: 0 },
  { id: 305, category: "MISSIVES", name: "Thalassian Missive of Ingenuity Tier 2", baseCost: 53.3, ahPrice: 133.12, baseYield: 2.0, mcFactor: 1.5, concCost: 0 },
  { id: 306, category: "MISSIVES", name: "Thalassian Missive of Resourcefulness Tier 2", baseCost: 53.3, ahPrice: 160.0, baseYield: 2.0, mcFactor: 1.5, concCost: 0 },
  { id: 307, category: "INKS & CIPHERS", name: "Soul Cipher Tier 2", baseCost: 29.6, ahPrice: 58.57, baseYield: 5.0, mcFactor: 1.5, concCost: 0 },
  { id: 308, category: "INKS & CIPHERS", name: "Codified Azeroot Tier 2", baseCost: 172.2, ahPrice: 198.79, baseYield: 2.0, mcFactor: 1.5, concCost: 0 },
  { id: 309, category: "MISSIVES", name: "Thalassian Missive of Deftness Tier 2", baseCost: 53.3, ahPrice: 122.44, baseYield: 2.0, mcFactor: 1.5, concCost: 0 },
  { id: 310, category: "MISSIVES", name: "Thalassian Missive of Crafting Speed Tier 2", baseCost: 53.3, ahPrice: 104.28, baseYield: 2.0, mcFactor: 1.5, concCost: 0 },
  { id: 311, category: "SIGILS & RUNES", name: "Darkmoon Sigil: Blood Tier 2", baseCost: 191.7, ahPrice: 189.99, baseYield: 1.0, mcFactor: 1.5, concCost: 0 },
  { id: 312, category: "MISSIVES", name: "Thalassian Missive of Finesse Tier 2", baseCost: 53.3, ahPrice: 133.42, baseYield: 2.0, mcFactor: 1.5, concCost: 0 },
  { id: 313, category: "SIGILS & RUNES", name: "Darkmoon Sigil: Hunt Tier 2", baseCost: 187.5, ahPrice: 394.0, baseYield: 1.0, mcFactor: 1.5, concCost: 0 },
  { id: 314, category: "SIGILS & RUNES", name: "Darkmoon Sigil: Rot Tier 2", baseCost: 216.3, ahPrice: 189.41, baseYield: 1.0, mcFactor: 1.5, concCost: 0 },
  { id: 315, category: "SIGILS & RUNES", name: "Darkmoon Sigil: Void Tier 2", baseCost: 238.2, ahPrice: 399.0, baseYield: 1.0, mcFactor: 1.5, concCost: 0 },
  { id: 316, category: "MISSIVES", name: "Thalassian Missive of the Aurora Tier 2", baseCost: 53.3, ahPrice: 149.99, baseYield: 2.0, mcFactor: 1.5, concCost: 0 },
  { id: 317, category: "SIGILS & RUNES", name: "Vantus Rune: Radiant Tier 2", baseCost: 238.4, ahPrice: 199.99, baseYield: 1.0, mcFactor: 1.5, concCost: 0 },
  { id: 318, category: "MISSIVES", name: "Thalassian Missive of the Feverflare Tier 2", baseCost: 53.3, ahPrice: 159.99, baseYield: 2.0, mcFactor: 1.5, concCost: 0 },
  { id: 319, category: "MISSIVES", name: "Thalassian Missive of the Fireflash Tier 2", baseCost: 53.3, ahPrice: 169.64, baseYield: 2.0, mcFactor: 1.5, concCost: 0 },
  { id: 320, category: "MISSIVES", name: "Thalassian Missive of the Harmonious Tier 2", baseCost: 53.3, ahPrice: 144.0, baseYield: 2.0, mcFactor: 1.5, concCost: 0 },
  { id: 321, category: "CONTRACTS", name: "Contract: The Amani Tribe Tier 2", baseCost: 29.4, ahPrice: 150.99, baseYield: 2.0, mcFactor: 1.5, concCost: 0 },
  { id: 322, category: "MISSIVES", name: "Thalassian Missive of the Peerless Tier 2", baseCost: 53.3, ahPrice: 149.0, baseYield: 2.0, mcFactor: 1.5, concCost: 0 },
  { id: 323, category: "CONTRACTS", name: "Contract: The Silvermoon Court Tier 2", baseCost: 28.9, ahPrice: 70.0, baseYield: 2.0, mcFactor: 1.5, concCost: 0 },
  { id: 324, category: "MISSIVES", name: "Thalassian Missive of the Quickblade Tier 2", baseCost: 53.3, ahPrice: 111.88, baseYield: 2.0, mcFactor: 1.5, concCost: 0 },
  { id: 325, category: "CONTRACTS", name: "Contract: The Hara'ti Tier 2", baseCost: 28.5, ahPrice: 68.0, baseYield: 2.0, mcFactor: 1.5, concCost: 0 },
  { id: 326, category: "CONTRACTS", name: "Contract: The Singularity Tier 2", baseCost: 27.3, ahPrice: 80.87, baseYield: 2.0, mcFactor: 1.5, concCost: 0 }
];

const DEFAULT_DATA = {
  alchemy: dataAlchemy,
  jewelcrafting: dataJewelcrafting,
  enchanting: dataEnchanting,
  inscription: dataInscription
};
