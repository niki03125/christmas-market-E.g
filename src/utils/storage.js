import { initialStallholders } from "../data/initialStallholders";

export const STORAGE_KEY = "eg_julemarked_stadeholdere_v1";

function normalizeStallholder(item) {
  return {
    ...item,
    cvr: item.cvr ?? "",
    erNyStadeholder: item.erNyStadeholder ?? "genganger",
    hjemmeside: item.hjemmeside ?? "",
    produktbeskrivelse: item.produktbeskrivelse ?? "",
    ankomstdag: item.ankomstdag ?? "torsdag",
    betalingsstatus: item.betalingsstatus ?? "faktura_mangler",
    standnummer: item.standnummer ?? "",
    fastPlacering: item.fastPlacering ?? false,
    tidligerePlaceringNote: item.tidligerePlaceringNote ?? "",
    behov: {
      borde: Boolean(item.behov?.borde),
      stole: Boolean(item.behov?.stole),
      strom: Boolean(item.behov?.strom)
    }
  };
}

export function loadStallholders() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return initialStallholders.map(normalizeStallholder);

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return initialStallholders.map(normalizeStallholder);
    return parsed.map(normalizeStallholder);
  } catch (error) {
    return initialStallholders.map(normalizeStallholder);
  }
}

export function saveStallholders(stallholders) {
  const normalized = stallholders.map(normalizeStallholder);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
}

export function resetStallholdersToInitialData() {
  const reset = initialStallholders.map(normalizeStallholder);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reset));
  return reset;
}
