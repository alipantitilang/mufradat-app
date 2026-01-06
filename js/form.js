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
      if (!lafadz || !arti || !jenisId) {
        alert("Isi lafadz, arti, dan jenis ya 🙂");
        return;
      }
  
      addMufradat({
        lafadz,
        arti,
        jenisId,
        catatan,
      });
  
      form.reset();
      alert("✨ Mufradat tersimpan");

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


