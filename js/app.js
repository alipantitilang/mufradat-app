// =========================
// APP INITIALIZATION
// =========================

document.addEventListener("DOMContentLoaded", () => {
    initTabs();
    initApp();
  });
  
  // =========================
  // INIT FUNCTIONS
  // =========================
  
  function initApp() {
    initJenisOptions();
  
    if (typeof renderSearchResults === "function") {
      renderSearchResults();
    }
  
    console.log("📘 Mufradat App siap jalan");
  }
  

  // =========================
// SERVICE WORKER REGISTER
// =========================

if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("service-worker.js")
      .then(() => console.log("✅ Service Worker aktif"))
      .catch((err) => console.error("❌ SW gagal", err));
  }  
  
  // =========================
  // TAB NAVIGATION LOGIC
  // =========================
  
  function initTabs() {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");
  
    tabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetTab = btn.dataset.tab;
  
        // reset active state
        tabButtons.forEach((b) => b.classList.remove("active"));
        tabContents.forEach((c) => c.classList.remove("active"));
  
        // activate selected tab
        btn.classList.add("active");
        document.getElementById(targetTab).classList.add("active");
      });
    });
  }

  function switchTab(tabId) {
    document.querySelectorAll(".tab-btn").forEach((b) => {
      b.classList.toggle("active", b.dataset.tab === tabId);
    });
  
    document.querySelectorAll(".tab-content").forEach((c) => {
      c.classList.toggle("active", c.id === tabId);
    });
  }
  
  
  // =========================
  // UTIL (future ready)
  // =========================
  
  // function showToast(message) {}
  // function confirmDelete() {}
  