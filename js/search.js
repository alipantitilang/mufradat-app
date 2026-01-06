// =========================
// SEARCH & RENDER
// =========================

document.addEventListener("DOMContentLoaded", () => {
    initSearch();
    renderSearchResults();
  });
  
  // =========================
  // INIT SEARCH EVENT
  // =========================
  
  function initSearch() {
    const searchInput = document.getElementById("searchInput");
    const jenisFilter = document.getElementById("jenisFilter");
  
    if (searchInput) {
      searchInput.addEventListener("input", renderSearchResults);
    }
  
    if (jenisFilter) {
      jenisFilter.addEventListener("change", renderSearchResults);
    }
  }
  
  // =========================
  // RENDER RESULTS
  // =========================
  
  function renderSearchResults() {
    const searchInput = document.getElementById("searchInput");
    const jenisFilter = document.getElementById("jenisFilter");
    const resultList = document.getElementById("resultList");
  
    if (!resultList) return;
  
    const keyword = normalizeForSearch(searchInput.value);
    const selectedJenis = jenisFilter.value;
  
    let mufradatList = getMufradatList();
    const jenisList = getJenisList();
  
    // FILTER BY KEYWORD
    if (keyword) {
        mufradatList = mufradatList.filter((m) => {
          return (
            normalizeForSearch(m.lafadz).includes(keyword) ||
            normalizeForSearch(m.arti).includes(keyword)
          );
        });
      }
      
    // FILTER BY JENIS
    if (selectedJenis) {
      mufradatList = mufradatList.filter(
        (m) => m.jenisId === parseInt(selectedJenis)
      );
    }
  
    // SORT ALPHABETIC (ARAB READY)
    mufradatList.sort(sortArab);
  
    // CLEAR LIST
    resultList.innerHTML = "";
  
    if (mufradatList.length === 0) {
      resultList.innerHTML = `<li>Tidak ada mufradat 😶</li>`;
      return;
    }
  
    // RENDER ITEMS
    mufradatList.forEach((m) => {
      const jenis = jenisList.find((j) => j.id === m.jenisId);
  
      const li = document.createElement("li");
  
      li.innerHTML = `
        <div>
          <div class="lafadz">${m.lafadz}</div>
          <div class="arti">${m.arti}</div>
          <div class="meta">${jenis ? jenis.nama : ""}</div>
        </div>
      `;
  
      resultList.appendChild(li);
    });
  }
  