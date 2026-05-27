const labels = {
  modtaget: "Modtaget",
  bekraeftet: "Bekraeftet",
  afvist: "Afvist",
  mangler_svar: "Mangler svar"
};

function StatusBadge({ status }) {
  return (
    <span className={`status-badge status-badge--${status}`}>
      {labels[status] ?? status}
    </span>
  );
}

export default StatusBadge;
