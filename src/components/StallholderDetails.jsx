import { AREAS } from "../data/areas";

function StallholderDetails({
  stallholder,
  selectedPlacementConflict,
  onUpdateStatus,
  onUpdateArea,
  onUpdatePaymentStatus,
  onUpdateStandInfo,
  onUpdateNotes
}) {
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
        <dt>CVR</dt>
        <dd>{stallholder.cvr || "-"}</dd>
        <dt>Produkttype</dt>
        <dd>{stallholder.produkttype}</dd>
        <dt>Ny eller genganger</dt>
        <dd>{stallholder.erNyStadeholder === "ny" ? "Ny stadeholder" : "Genganger"}</dd>
        <dt>Onsket omrade</dt>
        <dd>{stallholder.onsketOmrade}</dd>
        <dt>Onsket ankomstdag</dt>
        <dd>{stallholder.ankomstdag}</dd>
      </dl>

      {selectedPlacementConflict ? <p className="warning">{selectedPlacementConflict}</p> : null}

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
        Betalingsstatus
        <select
          value={stallholder.betalingsstatus}
          onChange={(e) => onUpdatePaymentStatus(stallholder.id, e.target.value)}
        >
          <option value="faktura_mangler">Faktura mangler</option>
          <option value="faktura_sendt">Faktura sendt</option>
          <option value="betalt">Betalt</option>
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
        Standnummer
        <input
          value={stallholder.standnummer}
          onChange={(e) => onUpdateStandInfo(stallholder.id, { standnummer: e.target.value })}
          placeholder="Fx A-12"
        />
      </label>

      <label className="inline-checkbox">
        <input
          type="checkbox"
          checked={stallholder.fastPlacering}
          onChange={(e) => onUpdateStandInfo(stallholder.id, { fastPlacering: e.target.checked })}
        />
        Fast placering
      </label>

      <label>
        Hjemmeside/link
        <input
          value={stallholder.hjemmeside}
          onChange={(e) => onUpdateStandInfo(stallholder.id, { hjemmeside: e.target.value })}
        />
      </label>

      <label>
        Produktbeskrivelse
        <textarea
          rows={3}
          value={stallholder.produktbeskrivelse}
          onChange={(e) => onUpdateStandInfo(stallholder.id, { produktbeskrivelse: e.target.value })}
        />
      </label>

      <label>
        Tidligere placering/evaluering
        <textarea
          rows={3}
          value={stallholder.tidligerePlaceringNote}
          onChange={(e) =>
            onUpdateNotes(stallholder.id, { tidligerePlaceringNote: e.target.value })
          }
        />
      </label>

      <label>
        Interne noter
        <textarea
          rows={5}
          value={stallholder.interneNoter}
          onChange={(e) => onUpdateNotes(stallholder.id, { interneNoter: e.target.value })}
        />
      </label>
    </aside>
  );
}

export default StallholderDetails;
