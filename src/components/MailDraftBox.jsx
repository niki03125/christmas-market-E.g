import { useMemo, useState } from "react";
import { buildMailDraft } from "../utils/mailTemplates";

function MailDraftBox({ stallholder }) {
  const [message, setMessage] = useState("");
  const draft = useMemo(() => buildMailDraft(stallholder), [stallholder]);

  async function copyDraft() {
    if (!draft) return;
    try {
      await navigator.clipboard.writeText(draft);
      setMessage("Mailudkast kopieret til udklipsholder.");
    } catch (error) {
      setMessage("Kunne ikke kopiere automatisk. Marker og kopier manuelt.");
    }
  }

  return (
    <section className="panel">
      <div className="mail-head">
        <h3>Mailudkast</h3>
        <button className="btn btn--ghost" onClick={copyDraft} disabled={!stallholder}>
          Kopier tekst
        </button>
      </div>
      <textarea
        readOnly
        rows={10}
        value={draft || "Vaelg en tilmelding for at se mailudkast."}
      />
      {message ? <p className="muted">{message}</p> : null}
    </section>
  );
}

export default MailDraftBox;
