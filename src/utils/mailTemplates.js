const STATUS_LABELS = {
  modtaget: "modtaget",
  bekraeftet: "bekraeftet",
  afvist: "afvist",
  mangler_svar: "mangler svar"
};

export function buildMailDraft(stallholder) {
  if (!stallholder) return "";

  const hilsen = `Hej ${stallholder.navn},`;
  const afslutning = "\n\nVenlig hilsen\nE.G. Julemarked";

  if (stallholder.status === "bekraeftet") {
    return `${hilsen}\n\nTak for din tilmelding. Vi kan bekraefte, at din stand er planlagt i omradet "${stallholder.tildeltOmrade}".\n\nVi sender praktisk information naermere arrangementet.${afslutning}`;
  }

  if (stallholder.status === "afvist") {
    return `${hilsen}\n\nTak for din interesse i E.G. Julemarked. Vi har desvaerre ikke mulighed for at tilbyde en standplads i denne omgang.\n\nDu er meget velkommen til at soege igen naeste gang.${afslutning}`;
  }

  if (stallholder.status === "mangler_svar") {
    return `${hilsen}\n\nVi mangler lidt information for at faerdigbehandle din tilmelding.\n\nSkriv gerne tilbage med de sidste oplysninger, sa vi kan komme videre.${afslutning}`;
  }

  return `${hilsen}\n\nTak for din tilmelding til E.G. Julemarked. Vi har modtaget din henvendelse og vender tilbage hurtigst muligt.\n\nAktuel status: ${STATUS_LABELS[stallholder.status] ?? "modtaget"}.${afslutning}`;
}
