import { AREAS } from "../data/areas";

function PublicStallholderPreview({ stallholders }) {
  const confirmed = stallholders.filter((s) => s.status === "bekraeftet");

  return (
    <section className="panel">
      <h2>Offentlig stadeholderliste</h2>
      <p className="muted">Her vises kun bekraeftede stadeholdere.</p>
      <div className="preview-grid">
        {AREAS.map((area) => {
          const list = confirmed.filter((s) => s.tildeltOmrade === area);
          return (
            <article key={area} className="preview-card">
              <h3>{area}</h3>
              {list.length ? (
                <ul>
                  {list.map((s) => (
                    <li key={s.id}>
                      <strong>{s.virksomhed}</strong>
                      <span>{s.produkttype}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="muted">Ingen bekraeftede i dette omrade endnu.</p>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default PublicStallholderPreview;
