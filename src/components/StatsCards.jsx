function StatsCards({ stats }) {
  return (
    <div className="stats-grid">
      <article className="stat-card">
        <p>Samlet antal</p>
        <h3>{stats.total}</h3>
      </article>
      <article className="stat-card">
        <p>Bekraeftede</p>
        <h3>{stats.bekraeftet}</h3>
      </article>
      <article className="stat-card">
        <p>Mangler svar</p>
        <h3>{stats.mangler_svar}</h3>
      </article>
      <article className="stat-card">
        <p>Afviste</p>
        <h3>{stats.afvist}</h3>
      </article>
    </div>
  );
}

export default StatsCards;
