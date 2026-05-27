import { useEffect, useMemo, useState } from "react";
import AdminDashboard from "./components/AdminDashboard";
import Hero from "./components/Hero";
import PublicStallholderPreview from "./components/PublicStallholderPreview";
import SignupForm from "./components/SignupForm";
import {
  loadStallholders,
  resetStallholdersToInitialData,
  saveStallholders
} from "./utils/storage";

function App() {
  const [view, setView] = useState("landing");
  const [stallholders, setStallholders] = useState(() => loadStallholders());
  const [selectedId, setSelectedId] = useState(null);
  const [filters, setFilters] = useState({
    status: "alle",
    area: "alle",
    search: "",
    sort: "newest"
  });

  useEffect(() => {
    saveStallholders(stallholders);
  }, [stallholders]);

  const stats = useMemo(() => {
    const base = {
      total: stallholders.length,
      modtaget: 0,
      bekraeftet: 0,
      afvist: 0,
      mangler_svar: 0
    };
    for (const item of stallholders) {
      if (Object.prototype.hasOwnProperty.call(base, item.status)) {
        base[item.status] += 1;
      }
    }
    return base;
  }, [stallholders]);

  const filteredStallholders = useMemo(() => {
    const query = filters.search.trim().toLowerCase();
    let list = [...stallholders];

    if (filters.status !== "alle") {
      list = list.filter((item) => item.status === filters.status);
    }
    if (filters.area !== "alle") {
      list = list.filter((item) => item.tildeltOmrade === filters.area);
    }
    if (query) {
      list = list.filter((item) => {
        const blob = `${item.navn} ${item.virksomhed} ${item.produkttype}`.toLowerCase();
        return blob.includes(query);
      });
    }
    if (filters.sort === "oldest") {
      list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (filters.sort === "name_asc") {
      list.sort((a, b) => a.navn.localeCompare(b.navn, "da"));
    } else if (filters.sort === "name_desc") {
      list.sort((a, b) => b.navn.localeCompare(a.navn, "da"));
    } else {
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return list;
  }, [filters, stallholders]);

  const selectedStallholder = useMemo(
    () => stallholders.find((item) => item.id === selectedId) || null,
    [selectedId, stallholders]
  );

  function updateItem(id, patch) {
    setStallholders((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...patch, updatedAt: new Date().toISOString() } : item
      )
    );
  }

  function handleCreateSignup(formData) {
    const now = new Date().toISOString();
    const newItem = {
      id: `sh-${Date.now()}`,
      navn: formData.navn,
      virksomhed: formData.virksomhed,
      email: formData.email,
      telefon: formData.telefon,
      produkttype: formData.produkttype,
      onsketOmrade: formData.onsketOmrade,
      tildeltOmrade: formData.onsketOmrade,
      sarligeOnsker: formData.sarligeOnsker,
      behov: formData.behov,
      kommentarer: formData.kommentarer,
      interneNoter: "",
      status: "modtaget",
      createdAt: now,
      updatedAt: now
    };
    setStallholders((prev) => [newItem, ...prev]);
    setView("signup");
  }

  function handleFilterChange(key, value) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function handleResetData() {
    const reset = resetStallholdersToInitialData();
    setStallholders(reset);
    setSelectedId(null);
  }

  return (
    <div className="app-shell">
      <header className="top-nav">
        <button className="brand" onClick={() => setView("landing")}>
          E.G. Julemarked
        </button>
        <nav>
          <button className="link-btn" onClick={() => setView("signup")}>
            Tilmelding
          </button>
          <button className="link-btn" onClick={() => setView("admin")}>
            Admin
          </button>
          <button className="link-btn" onClick={() => setView("preview")}>
            Offentlig preview
          </button>
        </nav>
      </header>

      <main className="container">
        {view === "landing" ? <Hero onNavigate={setView} /> : null}
        {view === "signup" ? <SignupForm onSubmit={handleCreateSignup} /> : null}
        {view === "admin" ? (
          <AdminDashboard
            stats={stats}
            filters={filters}
            onFilterChange={handleFilterChange}
            filteredStallholders={filteredStallholders}
            selectedId={selectedId}
            onSelect={setSelectedId}
            selectedStallholder={selectedStallholder}
            onUpdateStatus={(id, status) => updateItem(id, { status })}
            onUpdateArea={(id, tildeltOmrade) => updateItem(id, { tildeltOmrade })}
            onUpdateNotes={(id, interneNoter) => updateItem(id, { interneNoter })}
            onResetData={handleResetData}
          />
        ) : null}
        {view === "preview" ? <PublicStallholderPreview stallholders={stallholders} /> : null}
      </main>
    </div>
  );
}

export default App;
