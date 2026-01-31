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

    select.innerHTML =
      select.id === "jenisFilter"
        ? `<option value="">Semua Jenis</option>`
        : `<option value="">Pilih Jenis</option>`;

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

    const lafadz = document.getElementById("lafadz").value.trim();
    const arti = document.getElementById("arti").value.trim();
    const jenisSelect = document.getElementById("jenis");
    const jenisBaruInput = document.getElementById("jenisBaru");
    const catatan = document.getElementById("catatan").value.trim();

    let jenisId = parseInt(jenisSelect.value);
    let tasrif = null;

    // =========================
    // HANDLE JENIS BARU
    // =========================
    if (jenisBaruInput.value.trim() !== "") {
      const newJenis = addJenis(jenisBaruInput.value.trim());
      jenisId = newJenis.id;
      initJenisOptions();
    }

    if (!lafadz || !arti || !jenisId) {
      alert("Isi lafadz, arti, dan jenis ya 🙂");
      return;
    }

    const jenis = getJenisById(jenisId);

    // =========================
    // FI'IL LOGIC (future ready)
    // =========================
    if (jenis && jenis.nama.toLowerCase().includes("fi")) {
      tasrif = {
        source: lafadz,
        type: "manual", // nanti: madhi / mudhari / amr
        data: null      // nanti diisi auto generator
      };
    }

    // =========================
    // SAVE
    // =========================
    addMufradat({
      lafadz,
      arti,
      jenisId,
      catatan,
      tasrif,
    });

    form.reset();
    alert("✨ Mufradat tersimpan");

    // balik ke tab pencarian
    if (typeof switchTab === "function") {
      switchTab("search-tab");
    }

    if (typeof renderSearchResults === "function") {
      renderSearchResults();
    }
  });
}
