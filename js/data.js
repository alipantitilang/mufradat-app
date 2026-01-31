// =========================
// STORAGE KEYS
// =========================
const STORAGE_MUFRADAT = "mufradat_data";
const STORAGE_JENIS = "mufradat_jenis";

// =========================
// DEFAULT DATA
// =========================
const defaultJenis = [
  { id: 1, nama: "Isim" },
  { id: 2, nama: "Fi'il" },
  { id: 3, nama: "Harf" },
];

// =========================
// GET DATA
// =========================
function getJenisList() {
  const data = localStorage.getItem(STORAGE_JENIS);
  return data ? JSON.parse(data) : initJenis();
}

function getMufradatList() {
  const data = localStorage.getItem(STORAGE_MUFRADAT);
  return data ? JSON.parse(data) : [];
}

// =========================
// INIT DEFAULT JENIS
// =========================
function initJenis() {
  localStorage.setItem(STORAGE_JENIS, JSON.stringify(defaultJenis));
  return defaultJenis;
}

// =========================
// SAVE DATA
// =========================
function saveJenisList(jenisList) {
  localStorage.setItem(STORAGE_JENIS, JSON.stringify(jenisList));
}

function saveMufradatList(mufradatList) {
  localStorage.setItem(STORAGE_MUFRADAT, JSON.stringify(mufradatList));
}

// =========================
// ADD JENIS
// =========================
function addJenis(namaJenis) {
  if (!namaJenis) return null;

  const jenisList = getJenisList();

  const exists = jenisList.find(
    j => j.nama.toLowerCase() === namaJenis.toLowerCase()
  );
  if (exists) return exists;

  const newJenis = {
    id: Date.now(),
    nama: namaJenis,
  };

  jenisList.push(newJenis);
  saveJenisList(jenisList);

  return newJenis;
}

// =========================
// ADD MUFRADAT
// =========================
function addMufradat({ lafadz, arti, jenisId, catatan, tasrif = null }) {
  const mufradatList = getMufradatList();

  const newMufradat = {
    id: Date.now(),
    lafadz: lafadz.trim(),
    arti: arti.trim(),
    jenisId,
    catatan: catatan || "",
    tasrif,
    createdAt: new Date().toISOString(),
    updatedAt: null,
  };

  mufradatList.push(newMufradat);
  saveMufradatList(mufradatList);

  return newMufradat;
}

// =========================
// UPDATE MUFRADAT
// =========================
function updateMufradat(id, updatedData) {
  const mufradatList = getMufradatList();
  const index = mufradatList.findIndex(m => m.id === id);

  if (index === -1) return false;

  mufradatList[index] = {
    ...mufradatList[index],
    ...updatedData,
    updatedAt: new Date().toISOString(),
  };

  saveMufradatList(mufradatList);
  return true;
}

// =========================
// DELETE MUFRADAT
// =========================
function deleteMufradat(id) {
  const mufradatList = getMufradatList();
  const filtered = mufradatList.filter(m => m.id !== id);

  if (filtered.length === mufradatList.length) return false;

  saveMufradatList(filtered);
  return true;
}

// =========================
// HELPER
// =========================
function getJenisById(id) {
  return getJenisList().find(j => j.id === id);
}

function getMufradatById(id) {
  return getMufradatList().find(m => m.id === id);
}
