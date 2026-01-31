// =========================
// SEARCH & RENDER
// =========================

document.addEventListener("DOMContentLoaded", () => {
  initSearch();
  renderSearchResults();
});

function initSearch() {
  const searchInput = document.getElementById("searchInput");
  const jenisFilter = document.getElementById("jenisFilter");

  searchInput?.addEventListener("input", renderSearchResults);
  jenisFilter?.addEventListener("change", renderSearchResults);
}

// =========================
// RENDER RESULTS
// =========================

function renderSearchResults() {
  const keyword = normalizeForSearch(
    document.getElementById("searchInput")?.value || ""
  );
  const selectedJenis = document.getElementById("jenisFilter")?.value;
  const resultList = document.getElementById("resultList");

  if (!resultList) return;

  let mufradatList = getMufradatList();
  const jenisList = getJenisList();

  // FILTER KEYWORD
  if (keyword) {
    mufradatList = mufradatList.filter(
      (m) =>
        normalizeForSearch(m.lafadz).includes(keyword) ||
        normalizeForSearch(m.arti).includes(keyword)
    );
  }

  // FILTER JENIS
  if (selectedJenis) {
    mufradatList = mufradatList.filter(
      (m) => m.jenisId === parseInt(selectedJenis)
    );
  }

  mufradatList.sort(sortArab);
  resultList.innerHTML = "";

  if (mufradatList.length === 0) {
    resultList.innerHTML = `<li class="empty">Tidak ada mufradat 😶</li>`;
    return;
  }

  mufradatList.forEach((m) => {
    const jenis = jenisList.find((j) => j.id === m.jenisId);
    const isFiil = m.tasrif !== undefined;

    const li = document.createElement("li");
    li.className = "mufradat-item";

    li.innerHTML = `
      <div class="item-main">
        <span class="lafadz ${isFiil ? "fiil" : ""}">
          ${m.lafadz}
        </span>
        <span class="arti">${m.arti}</span>
      </div>

      <div class="item-meta">
        <span class="jenis">${jenis?.nama || ""}</span>
        ${
          isFiil
            ? `<button class="tasrif-btn" onclick="openTasrif(${m.id})">📜</button>`
            : ""
        }
      </div>
    `;

    resultList.appendChild(li);
  });
}

// =========================
// PLACEHOLDER (NEXT STEP)
// =========================
function openTasrif(id) {
  const mufradat = getMufradatById(id);
  alert("Tasrif fi‘il:\n\n" + mufradat.lafadz + "\n\n(coming soon)");
}
