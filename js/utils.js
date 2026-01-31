// =========================
// ARABIC UTILITIES
// =========================

// hapus harakat
function removeHarakat(text = "") {
    return text.replace(/[ًٌٍَُِّْ]/g, "");
  }
  
  // normalisasi variasi huruf Arab
  function normalizeArabicChars(text = "") {
    return text
      .replace(/[أإآ]/g, "ا")
      .replace(/ى/g, "ي")
      .replace(/ة/g, "ه")
      .replace(/ؤ/g, "و")
      .replace(/ئ/g, "ي");
  }
  
  // normalisasi teks Arab full
  function normalizeArabic(text = "") {
    return normalizeArabicChars(removeHarakat(text))
      .replace(/^ال/, "")
      .trim();
  }
  
  // =========================
  // STRING UTILITIES
  // =========================
  
  // biar search lebih ramah (Arab + Latin)
  function normalizeForSearch(text = "") {
    return normalizeArabic(text.toLowerCase());
  }
  
  // =========================
  // UI UTILITIES
  // =========================
  
  function showAlert(message) {
    alert(message);
  }
  
  // toast versi future (belum dipakai)
  function showToast(message) {
    console.log("🔔", message);
  }
  
  // =========================
  // ID & DATE
  // =========================
  
  function generateId() {
    return Date.now();
  }
  
  function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }
  
  function confirmDelete(id) {
    const ok = confirm("Yakin mau hapus mufradat ini?");
    if (!ok) return;
  
    deleteMufradat(id);
    renderSearchResults();
  }
  
  // =========================
// TYPE HELPERS
// =========================

function isFiil(jenisId) {
  const jenis = getJenisById(jenisId);
  return jenis && jenis.nama.toLowerCase().includes("fi");
}

// =========================
// MODAL BASIC (future UI)
// =========================

function openModal(html) {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.innerHTML = `
    <div class="modal">
      ${html}
      <button class="close-modal" onclick="closeModal()">Tutup</button>
    </div>
  `;
  document.body.appendChild(modal);
}

function closeModal() {
  document.querySelector(".modal-overlay")?.remove();
}
