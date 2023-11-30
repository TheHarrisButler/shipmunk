import { useState } from "react";

export default function Options(): JSX.Element {
  const [openAutomatically, setOpenAutomatically] = useState(true);
  return (
    <div className="container">
      <h1>Settings</h1>
      <h2>Methods for populating labels</h2>
      <form>
        <div>
          <input
            type="checkbox"
            id="automatic"
            name="automatic"
            value="automatic"
          />
          <label htmlFor="option-1">Automatic</label>
        </div>

        <div>
          <input type="checkbox" id="wizard" name="wizard" value="wizard" />
          <label htmlFor="option-1">Wizard</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="selection"
            name="selection"
            value="selection"
          />
          <label htmlFor="option-1">Selection</label>
        </div>
      </form>
      <h2>Selection Interaction</h2>
      <form>
        <div>
          <input
            type="radio"
            id="open-automatic"
            name="open-automatic"
            value="open-automatic"
          />
          <label htmlFor="open-automatic">Open automatically</label>
          <input
            type="radio"
            id="open-manual"
            name="open-manual"
            value="open-manual"
          />
          <label htmlFor="open-manual">Open manually</label>
        </div>
      </form>
    </div>
  );
}
