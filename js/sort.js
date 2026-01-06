// =========================
// ARABIC SORTING
// =========================

// Urutan huruf Arab dasar (tanpa harakat)
const ARABIC_ORDER = [
    "ا","ب","ت","ث","ج","ح","خ",
    "د","ذ","ر","ز","س","ش",
    "ص","ض","ط","ظ","ع","غ",
    "ف","ق","ك","ل","م","ن",
    "ه","و","ي"
  ];
  
  // =========================
  // NORMALIZE ARABIC TEXT
  // =========================
  function normalizeArab(text = "") {
    return text
      .replace(/[ًٌٍَُِّْ]/g, "") // hapus harakat
      .replace(/^ال/, "")        // hilangkan "al-" di awal
      .trim();
  }
  
  // =========================
  // ARABIC STRING COMPARE
  // =========================
  function compareArab(a, b) {
    const textA = normalizeArab(a);
    const textB = normalizeArab(b);
  
    const minLen = Math.min(textA.length, textB.length);
  
    for (let i = 0; i < minLen; i++) {
      const charA = textA[i];
      const charB = textB[i];
  
      const indexA = ARABIC_ORDER.indexOf(charA);
      const indexB = ARABIC_ORDER.indexOf(charB);
  
      if (indexA !== indexB) {
        return indexA - indexB;
      }
    }
  
    return textA.length - textB.length;
  }
  
  // =========================
  // SORT FUNCTION
  // =========================
  function sortArab(a, b) {
    return compareArab(a.lafadz, b.lafadz);
  }
  