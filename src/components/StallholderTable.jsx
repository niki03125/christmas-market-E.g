import StatusBadge from "./StatusBadge";

function StallholderTable({ stallholders, selectedId, onSelect }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Navn</th>
            <th>Virksomhed</th>
            <th>Produkttype</th>
            <th>Omrade</th>
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
              <td>{stallholder.produkttype}</td>
              <td>{stallholder.tildeltOmrade}</td>
              <td>
                <StatusBadge status={stallholder.status} />
              </td>
            </tr>
          ))}
          {!stallholders.length ? (
            <tr>
              <td colSpan={5} className="empty">
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
