import StatusBadge from "./StatusBadge";

const paymentLabels = {
  faktura_mangler: "Faktura mangler",
  faktura_sendt: "Faktura sendt",
  betalt: "Betalt"
};

function StallholderTable({ stallholders, selectedId, onSelect }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Navn</th>
            <th>Virksomhed</th>
            <th>CVR</th>
            <th>Produkttype</th>
            <th>Omrade</th>
            <th>Betaling</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {stallholders.map((stallholder) => (
            <tr
              key={stallholder.id}
              className={selectedId === stallholder.id ? "is-selected" : ""}
              onClick={() => onSelect(stallholder.id)}
            >
              <td>{stallholder.navn}</td>
              <td>{stallholder.virksomhed}</td>
              <td>{stallholder.cvr || "-"}</td>
              <td>{stallholder.produkttype}</td>
              <td>{stallholder.tildeltOmrade}</td>
              <td>{paymentLabels[stallholder.betalingsstatus] ?? "-"}</td>
              <td>
                <StatusBadge status={stallholder.status} />
              </td>
            </tr>
          ))}
          {!stallholders.length ? (
            <tr>
              <td colSpan={7} className="empty">
                Ingen tilmeldinger matcher dit filter.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}

export default StallholderTable;
