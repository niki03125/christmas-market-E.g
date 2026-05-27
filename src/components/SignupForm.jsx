import { useState } from "react";
import { AREAS } from "../data/areas";

const emptyForm = {
  navn: "",
  virksomhed: "",
  email: "",
  telefon: "",
  cvr: "",
  produkttype: "",
  erNyStadeholder: "genganger",
  hjemmeside: "",
  produktbeskrivelse: "",
  onsketOmrade: AREAS[0],
  sarligeOnsker: "",
  ankomstdag: "torsdag",
  kommentarer: "",
  behov: { borde: false, stole: false, strom: false }
};

function SignupForm({ onSubmit }) {
  const [form, setForm] = useState(emptyForm);
  const [success, setSuccess] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleNeedChange(event) {
    const { name, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      behov: { ...prev.behov, [name]: checked }
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(form);
    setForm(emptyForm);
    setSuccess("Tak for din tilmelding. Vi har modtaget dine oplysninger.");
  }

  return (
    <section className="panel">
      <h2>Tilmelding af stadeholder</h2>
      <p className="muted">Udfyld formularen sa enkelt og praecist som muligt.</p>
      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          Navn
          <input required name="navn" value={form.navn} onChange={handleChange} />
        </label>
        <label>
          Virksomhed
          <input
            required
            name="virksomhed"
            value={form.virksomhed}
            onChange={handleChange}
          />
        </label>
        <label>
          E-mail
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Telefon
          <input required name="telefon" value={form.telefon} onChange={handleChange} />
        </label>
        <label>
          CVR
          <input required name="cvr" value={form.cvr} onChange={handleChange} />
        </label>
        <label>
          Ny stadeholder?
          <select name="erNyStadeholder" value={form.erNyStadeholder} onChange={handleChange}>
            <option value="genganger">Genganger</option>
            <option value="ny">Ny stadeholder</option>
          </select>
        </label>
        <label>
          Type af bod eller produkt
          <input
            required
            name="produkttype"
            value={form.produkttype}
            onChange={handleChange}
          />
        </label>
        <label>
          Onsket omrade
          <select
            name="onsketOmrade"
            value={form.onsketOmrade}
            onChange={handleChange}
          >
            {AREAS.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </label>
        <label className="full">
          Hjemmeside eller link (isaar for nye)
          <input name="hjemmeside" value={form.hjemmeside} onChange={handleChange} />
        </label>
        <label className="full">
          Produktbeskrivelse
          <textarea
            required
            name="produktbeskrivelse"
            value={form.produktbeskrivelse}
            onChange={handleChange}
            rows={3}
          />
        </label>
        <label>
          Onsket ankomstdag
          <select name="ankomstdag" value={form.ankomstdag} onChange={handleChange}>
            <option value="onsdag">Onsdag</option>
            <option value="torsdag">Torsdag</option>
            <option value="anden">Anden aftale</option>
          </select>
        </label>
        <label className="full">
          Saerlige onsker
          <textarea
            name="sarligeOnsker"
            value={form.sarligeOnsker}
            onChange={handleChange}
            rows={3}
          />
        </label>
        <label className="full">
          Kommentarer
          <textarea
            name="kommentarer"
            value={form.kommentarer}
            onChange={handleChange}
            rows={3}
          />
        </label>
        <fieldset className="full">
          <legend>Behov</legend>
          <div className="checkbox-row">
            <label>
              <input
                type="checkbox"
                name="borde"
                checked={form.behov.borde}
                onChange={handleNeedChange}
              />
              Borde
            </label>
            <label>
              <input
                type="checkbox"
                name="stole"
                checked={form.behov.stole}
                onChange={handleNeedChange}
              />
              Stole
            </label>
            <label>
              <input
                type="checkbox"
                name="strom"
                checked={form.behov.strom}
                onChange={handleNeedChange}
              />
              Strom
            </label>
          </div>
        </fieldset>
        <div className="full">
          <button className="btn btn--primary" type="submit">
            Send tilmelding
          </button>
        </div>
      </form>
      {success ? <p className="success">{success}</p> : null}

      <article className="panel panel--subtle">
        <h3>Praktisk info og FAQ</h3>
        <ul className="faq-list">
          <li>Du far besked om placering (omrade og standnummer), sa snart planen er klar.</li>
          <li>Skriv i formularen, hvis du har brug for borde eller andet udstyr.</li>
          <li>Har du behov for ankomst onsdag, sa vaelg det i feltet for ankomstdag.</li>
          <li>Onske om anden placering behandles loebende og afhaenger af den samlede plan.</li>
        </ul>
      </article>
    </section>
  );
}

export default SignupForm;
