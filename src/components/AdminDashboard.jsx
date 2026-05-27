import AreaFilter from "./AreaFilter";
import MailDraftBox from "./MailDraftBox";
import StallholderDetails from "./StallholderDetails";
import StallholderTable from "./StallholderTable";
import StatsCards from "./StatsCards";

function AdminDashboard({
  stats,
  filters,
  onFilterChange,
  filteredStallholders,
  selectedId,
  onSelect,
  selectedStallholder,
  onUpdateStatus,
  onUpdateArea,
  onUpdateNotes,
  onResetData
}) {
  return (
    <section className="admin-layout">
      <div className="panel">
        <div className="admin-head">
          <h2>Admin for Lise</h2>
          <button className="btn btn--ghost" onClick={onResetData}>
            Nulstil demo-data
          </button>
        </div>
        <StatsCards stats={stats} />
      </div>

      <div className="panel">
        <h3>Filtre og sogning</h3>
        <div className="filters">
          <label>
            Status
            <select
              value={filters.status}
              onChange={(e) => onFilterChange("status", e.target.value)}
            >
              <option value="alle">Alle</option>
              <option value="modtaget">Modtaget</option>
              <option value="bekraeftet">Bekraeftet</option>
              <option value="afvist">Afvist</option>
              <option value="mangler_svar">Mangler svar</option>
            </select>
          </label>
          <AreaFilter
            value={filters.area}
            onChange={(value) => onFilterChange("area", value)}
          />
          <label>
            Soeg
            <input
              value={filters.search}
              onChange={(e) => onFilterChange("search", e.target.value)}
              placeholder="Navn, virksomhed eller produkttype"
            />
          </label>
          <label>
            Sortering
            <select
              value={filters.sort}
              onChange={(e) => onFilterChange("sort", e.target.value)}
            >
              <option value="newest">Nyeste foerst</option>
              <option value="oldest">Aeldste foerst</option>
              <option value="name_asc">Navn A-A</option>
              <option value="name_desc">Navn A-A (omvendt)</option>
            </select>
          </label>
        </div>
      </div>

      <StallholderTable
        stallholders={filteredStallholders}
        selectedId={selectedId}
        onSelect={onSelect}
      />

      <div className="details-grid">
        <StallholderDetails
          stallholder={selectedStallholder}
          onUpdateStatus={onUpdateStatus}
          onUpdateArea={onUpdateArea}
          onUpdateNotes={onUpdateNotes}
        />
        <MailDraftBox stallholder={selectedStallholder} />
      </div>
    </section>
  );
}

export default AdminDashboard;
