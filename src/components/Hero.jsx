function Hero({ onNavigate }) {
  return (
    <section className="hero">
      <div className="hero__overlay" />
      <div className="hero__content">
        <p className="eyebrow">E.G. julemarked</p>
        <h1>En rolig og enkel vej til tilmelding</h1>
        <p>
          Tilmeld din stand, del dine ønsker, og fa et tydeligt overblik over
          den videre proces.
        </p>
        <div className="hero__actions">
          <button className="btn btn--primary" onClick={() => onNavigate("signup")}>
            Tilmeld stade
          </button>
          <button className="btn btn--ghost" onClick={() => onNavigate("preview")}>
            Se stadeholderliste
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
