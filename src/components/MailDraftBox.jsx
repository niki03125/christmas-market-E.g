import { useMemo, useState } from "react";
import { buildMailDraft } from "../utils/mailTemplates";

function MailDraftBox({ stallholder }) {
  const [message, setMessage] = useState("");
  const [template, setTemplate] = useState("status");
  const draft = useMemo(() => buildMailDraft(stallholder, template), [stallholder, template]);

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
      <label>
        Type
        <select value={template} onChange={(e) => setTemplate(e.target.value)} disabled={!stallholder}>
          <option value="status">Statussvar</option>
          <option value="missing_info">Vi mangler oplysninger</option>
          <option value="practical_info">Praktisk info foer julemarkedet</option>
        </select>
      </label>
      <textarea
        readOnly
        rows={12}
        value={draft || "Vaelg en tilmelding for at se mailudkast."}
      />
      {message ? <p className="muted">{message}</p> : null}
    </section>
  );
}

export default MailDraftBox;
