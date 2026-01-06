let editingId = null;

// =========================
// FORM HANDLER
// =========================

document.addEventListener("DOMContentLoaded", () => {
    initJenisOptions();
    initFormSubmit();
  });
  
  // =========================
  // INIT JENIS OPTIONS
  // =========================
  
  function initJenisOptions() {
    const jenisSelects = [
      document.getElementById("jenis"),
      document.getElementById("jenisFilter"),
    ];
  
    const jenisList = getJenisList();
  
    jenisSelects.forEach((select) => {
      if (!select) return;
  
      // reset option (kecuali default)
      select.innerHTML = select.id === "jenisFilter"
        ? `<option value="">Semua Jenis</option>`
        : "";
  
      jenisList.forEach((jenis) => {
        const option = document.createElement("option");
        option.value = jenis.id;
        option.textContent = jenis.nama;
        select.appendChild(option);
      });
    });
  }
  
  // =========================
  // FORM SUBMIT
  // =========================
  
  function initFormSubmit() {
    const form = document.getElementById("mufradatForm");
  
    if (!form) return;
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const lafadz = document.getElementById("lafadz").value;
      const arti = document.getElementById("arti").value;
      const jenisSelect = document.getElementById("jenis");
      const jenisBaruInput = document.getElementById("jenisBaru");
      const catatan = document.getElementById("catatan").value;
  
      let jenisId = parseInt(jenisSelect.value);
  
      // kalau ada jenis baru
      if (jenisBaruInput.value.trim() !== "") {
        const newJenis = addJenis(jenisBaruInput.value.trim());
        jenisId = newJenis.id;
  
        // refresh dropdown
        initJenisOptions();
      }
  
      // validasi ringan
      if (editingId) {
        updateMufradat(editingId, {
          lafadz,
          arti,
          jenisId,
          catatan,
        });
        editingId = null;
        alert("✏️ Mufradat diperbarui");
      } else {
        addMufradat({
          lafadz,
          arti,
          jenisId,
          catatan,
        });
        alert("✨ Mufradat tersimpan");
      }

      // PINDAH TAB KE PENCARIAN
      if (typeof switchTab === "function") {
        switchTab("search-tab");
      }
      
      // nanti bisa panggil render ulang hasil
      if (typeof renderSearchResults === "function") {
        renderSearchResults();
      }
    });
  }

  function editMufradat(id) {
    const data = getMufradatById(id);
    if (!data) return;
  
    editingId = id;
  
    document.getElementById("lafadz").value = data.lafadz;
    document.getElementById("arti").value = data.arti;
    document.getElementById("jenis").value = data.jenisId;
    document.getElementById("catatan").value = data.catatan || "";
  
    // pindah ke tab tambah
    switchTab("add-tab");
  }
  
