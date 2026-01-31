// =========================
// STATE
// =========================
let activeTab = "search-tab";
let editingId = null;

// =========================
// ELEMENTS
// =========================
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

const resultList = document.getElementById("resultList");
const searchInput = document.getElementById("searchInput");
const jenisFilter = document.getElementById("jenisFilter");

const form = document.getElementById("mufradatForm");
const lafadzInput = document.getElementById("lafadz");
const artiInput = document.getElementById("arti");
const jenisSelect = document.getElementById("jenis");
const jenisBaruInput = document.getElementById("jenisBaru");
const catatanInput = document.getElementById("catatan");

// modal tasrif
const tasrifModal = document.getElementById("tasrifModal");
const tasrifTitle = document.getElementById("tasrifTitle");
const tasrifBody = document.getElementById("tasrifBody");
const closeTasrifBtn = document.getElementById("closeTasrif");

// =========================
// TAB HANDLER
// =========================
tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.tab;

    tabButtons.forEach(b => b.classList.remove("active"));
    tabContents.forEach(c => c.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById(target).classList.add("active");

    activeTab = target;
  });
});

// =========================
// INIT
// =========================
function initApp() {
  loadJenis();
  renderList();
}

initApp();

// =========================
// LOAD JENIS
// =========================
function loadJenis() {
  const jenisList = getJenisList();

  jenisSelect.innerHTML = "";
  jenisFilter.innerHTML = `<option value="">Semua Jenis</option>`;

  jenisList.forEach(j => {
    const opt1 = document.createElement("option");
    opt1.value = j.id;
    opt1.textContent = j.nama;

    const opt2 = opt1.cloneNode(true);

    jenisSelect.appendChild(opt1);
    jenisFilter.appendChild(opt2);
  });
}

// =========================
// RENDER LIST
// =========================
function renderList() {
  const keyword = searchInput.value.toLowerCase();
  const filterJenis = jenisFilter.value;

  let data = getMufradatList();

  data = data.filter(m => {
    const matchText =
      m.lafadz.toLowerCase().includes(keyword) ||
      m.arti.toLowerCase().includes(keyword);

    const matchJenis = !filterJenis || m.jenisId == filterJenis;

    return matchText && matchJenis;
  });

  resultList.innerHTML = "";
  resultList.classList.add("compact");

  if (data.length === 0) {
    resultList.innerHTML = `<li style="text-align:center;color:#94a3b8;">Kosong 🌫️</li>`;
    return;
  }

  data.forEach(m => {
    const jenis = getJenisById(m.jenisId);

    const li = document.createElement("li");

    li.innerHTML = `
      <div class="lafadz">${m.lafadz}</div>
      <div class="arti">${m.arti}</div>
      <div class="meta">${jenis ? jenis.nama : "-"}</div>

      <div class="result-actions">
        ${jenis?.nama.toLowerCase().includes("fi") 
          ? `<button class="btn-edit" data-action="tasrif">Tasrif</button>` 
          : ""}
        <button class="btn-edit" data-action="edit">Edit</button>
        <button class="btn-delete" data-action="delete">Hapus</button>
      </div>
    `;

    li.addEventListener("click", e => {
      const action = e.target.dataset.action;
      if (!action) return;

      e.stopPropagation();

      if (action === "edit") startEdit(m.id);
      if (action === "delete") removeData(m.id);
      if (action === "tasrif") openTasrif(m);
    });

    resultList.appendChild(li);
  });
}

// =========================
// SEARCH & FILTER
// =========================
searchInput.addEventListener("input", renderList);
jenisFilter.addEventListener("change", renderList);

// =========================
// FORM SUBMIT
// =========================
form.addEventListener("submit", e => {
  e.preventDefault();

  let jenisId = jenisSelect.value;

  if (jenisBaruInput.value.trim()) {
    const newJenis = addJenis(jenisBaruInput.value.trim());
    jenisId = newJenis.id;
    loadJenis();
  }

  const payload = {
    lafadz: lafadzInput.value,
    arti: artiInput.value,
    jenisId: Number(jenisId),
    catatan: catatanInput.value
  };

  if (editingId) {
    updateMufradat(editingId, payload);
    editingId = null;
  } else {
    addMufradat(payload);
  }

  form.reset();
  renderList();
});

// =========================
// EDIT
// =========================
function startEdit(id) {
  const data = getMufradatList().find(m => m.id === id);
  if (!data) return;

  editingId = id;

  lafadzInput.value = data.lafadz;
  artiInput.value = data.arti;
  jenisSelect.value = data.jenisId;
  catatanInput.value = data.catatan;

  document.querySelector('[data-tab="add-tab"]').click();
}

// =========================
// DELETE
// =========================
function removeData(id) {
  if (!confirm("Yakin mau hapus mufradat ini?")) return;
  deleteMufradat(id);
  renderList();
}

// =========================
// TASRIF MODAL
// =========================
function openTasrif(mufradat) {
  tasrifTitle.textContent = `Tasrif: ${mufradat.lafadz}`;

  // placeholder (nanti auto-tasrif logic masuk sini)
  tasrifBody.innerHTML = `
    <table class="tasrif-table">
      <tr><th>Domir</th><th>Fi'il</th></tr>
      <tr><td>هو</td><td>${mufradat.lafadz}</td></tr>
      <tr><td>هم</td><td>—</td></tr>
      <tr><td>هي</td><td>—</td></tr>
    </table>
  `;

  tasrifModal.classList.remove("hidden");
}

closeTasrifBtn.addEventListener("click", () => {
  tasrifModal.classList.add("hidden");
});
