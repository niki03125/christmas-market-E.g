import { AREAS } from "../data/areas";

function AreaFilter({ value, onChange }) {
  return (
    <label>
      Omrade
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="alle">Alle omrader</option>
        {AREAS.map((area) => (
          <option key={area} value={area}>
            {area}
          </option>
        ))}
      </select>
    </label>
  );
}

export default AreaFilter;
