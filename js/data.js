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
    (j) => j.nama.toLowerCase() === namaJenis.toLowerCase()
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
function addMufradat({ lafadz, arti, jenisId, catatan }) {
  const mufradatList = getMufradatList();

  const newMufradat = {
    id: Date.now(),
    lafadz: lafadz.trim(),
    arti: arti.trim(),
    jenisId,
    catatan: catatan || "",
    createdAt: new Date().toISOString(),
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
  const index = mufradatList.findIndex((m) => m.id === id);

  if (index === -1) return false;

  mufradatList[index] = {
    ...mufradatList[index],
    ...updatedData,
  };

  saveMufradatList(mufradatList);
  return true;
}

// =========================
// DELETE MUFRADAT
// =========================
function deleteMufradat(id) {
  const mufradatList = getMufradatList();
  const filtered = mufradatList.filter((m) => m.id !== id);

  saveMufradatList(filtered);
}

// =========================
// HELPER
// =========================
function getJenisById(id) {
  const jenisList = getJenisList();
  return jenisList.find((j) => j.id === id);
}

function getMufradatById(id) {
  return getMufradatList().find((m) => m.id === id);
}

