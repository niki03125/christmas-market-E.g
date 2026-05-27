const STATUS_LABELS = {
  modtaget: "modtaget",
  bekraeftet: "bekraeftet",
  afvist: "afvist",
  mangler_svar: "mangler svar"
};

function getMissingFields(stallholder) {
  const missing = [];
  if (!stallholder.cvr) missing.push("CVR");
  if (!stallholder.telefon) missing.push("telefonnummer");
  if (!stallholder.produktbeskrivelse) missing.push("produktbeskrivelse");
  if (stallholder.erNyStadeholder === "ny" && !stallholder.hjemmeside) {
    missing.push("hjemmeside/link");
  }
  return missing;
}

function buildStatusDraft(stallholder) {
  const hilsen = `Hej ${stallholder.navn},`;
  const afslutning = "\n\nVenlig hilsen\nE.G. Julemarked";

  if (stallholder.status === "bekraeftet") {
    return `${hilsen}\n\nTak for din tilmelding. Vi kan bekraefte, at din stand er planlagt i omradet "${stallholder.tildeltOmrade}"${stallholder.standnummer ? `, stand ${stallholder.standnummer}` : ""}.\n\nVi sender praktisk information naermere arrangementet.${afslutning}`;
  }

  if (stallholder.status === "afvist") {
    return `${hilsen}\n\nTak for din interesse i E.G. Julemarked. Vi har desvaerre ikke mulighed for at tilbyde en standplads i denne omgang.\n\nDu er meget velkommen til at soge igen naeste gang.${afslutning}`;
  }

  if (stallholder.status === "mangler_svar") {
    return `${hilsen}\n\nVi mangler lidt information for at faerdigbehandle din tilmelding.\n\nSkriv gerne tilbage med de sidste oplysninger, sa vi kan komme videre.${afslutning}`;
  }

  return `${hilsen}\n\nTak for din tilmelding til E.G. Julemarked. Vi har modtaget din henvendelse og vender tilbage hurtigst muligt.\n\nAktuel status: ${STATUS_LABELS[stallholder.status] ?? "modtaget"}.${afslutning}`;
}

function buildMissingInfoDraft(stallholder) {
  const missing = getMissingFields(stallholder);
  const line = missing.length ? `\n\nVi mangler: ${missing.join(", ")}.` : "";

  return `Hej ${stallholder.navn},\n\nTak for din tilmelding. For at vi kan faerdigbehandle den, mangler vi nogle oplysninger.${line}\n\nSend gerne svar pa denne mail, sa opdaterer vi din sag med det samme.\n\nVenlig hilsen\nE.G. Julemarked`;
}

function buildPracticalDraft(stallholder) {
  return `Hej ${stallholder.navn},\n\nHer er praktisk information foer julemarkedet:\n- Du er planlagt i ${stallholder.tildeltOmrade}${stallholder.standnummer ? `, stand ${stallholder.standnummer}` : ""}.\n- Husk at medbringe borde hvis det ikke er aftalt med os.\n- Du har angivet onsket ankomstdag: ${stallholder.ankomstdag}.\n- Hvis du onsker anden placering, skriv hurtigst muligt, sa vurderer vi mulighederne i den samlede plan.\n\nVenlig hilsen\nE.G. Julemarked`;
}

export function buildMailDraft(stallholder, template = "status") {
  if (!stallholder) return "";

  if (template === "missing_info") {
    return buildMissingInfoDraft(stallholder);
  }
  if (template === "practical_info") {
    return buildPracticalDraft(stallholder);
  }

  return buildStatusDraft(stallholder);
}
