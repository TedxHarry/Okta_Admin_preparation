(() => {
  function initialize() {
    const marker = document.querySelector("span#profile-mapping-explorer");
    if (!marker) return;

    const explorer = document.createElement("div");
    explorer.id = marker.id;
    explorer.className = "admonition note";
    explorer.innerHTML = `
      <p class="admonition-title">Try the mapping with sample input</p>
      <label for="profile-mapping-input">Okta Cost Center</label>
      <select id="profile-mapping-input">
        <option value="employee">cc-104</option>
        <option value="mover">cc-205</option>
        <option value="empty">Empty string</option>
        <option value="missing">Null</option>
      </select>
      <p><output aria-live="polite" for="profile-mapping-input"></output></p>
    `;

    const input = explorer.querySelector("select");
    const result = explorer.querySelector("output");
    const sampleValues = { employee: "cc-104", mover: "cc-205", empty: "", missing: null };

    function update() {
      const value = sampleValues[input.value];
      const mappedValue = value === null || value === "" ? "UNASSIGNED" : value.toUpperCase();
      result.textContent = `Expected mapping result: ${mappedValue}`;
    }

    input.addEventListener("change", update);
    update();
    (marker.closest("p") || marker).replaceWith(explorer);
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(initialize);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
