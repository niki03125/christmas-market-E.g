import { initialStallholders } from "../data/initialStallholders";

export const STORAGE_KEY = "eg_julemarked_stadeholdere_v1";

export function loadStallholders() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [...initialStallholders];

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [...initialStallholders];
    return parsed;
  } catch (error) {
    return [...initialStallholders];
  }
}

export function saveStallholders(stallholders) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stallholders));
}

export function resetStallholdersToInitialData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialStallholders));
  return [...initialStallholders];
}
