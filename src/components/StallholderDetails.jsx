import { AREAS } from "../data/areas";

function StallholderDetails({ stallholder, onUpdateStatus, onUpdateArea, onUpdateNotes }) {
  if (!stallholder) {
    return (
      <aside className="panel">
        <h3>Detaljer</h3>
        <p className="muted">Vaelg en tilmelding i listen for at se detaljer.</p>
      </aside>
    );
  }

  return (
    <aside className="panel">
      <h3>{stallholder.navn}</h3>
      <p className="muted">{stallholder.virksomhed}</p>
      <dl className="details-list">
        <dt>E-mail</dt>
        <dd>{stallholder.email}</dd>
        <dt>Telefon</dt>
        <dd>{stallholder.telefon}</dd>
        <dt>Produkttype</dt>
        <dd>{stallholder.produkttype}</dd>
        <dt>Onsket omrade</dt>
        <dd>{stallholder.onsketOmrade}</dd>
      </dl>

      <label>
        Status
        <select
          value={stallholder.status}
          onChange={(e) => onUpdateStatus(stallholder.id, e.target.value)}
        >
          <option value="modtaget">Modtaget</option>
          <option value="bekraeftet">Bekraeftet</option>
          <option value="afvist">Afvist</option>
          <option value="mangler_svar">Mangler svar</option>
        </select>
      </label>

      <label>
        Tildelt omrade
        <select
          value={stallholder.tildeltOmrade}
          onChange={(e) => onUpdateArea(stallholder.id, e.target.value)}
        >
          {AREAS.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </label>

      <label>
        Interne noter
        <textarea
          rows={5}
          value={stallholder.interneNoter}
          onChange={(e) => onUpdateNotes(stallholder.id, e.target.value)}
        />
      </label>
    </aside>
  );
}

export default StallholderDetails;
