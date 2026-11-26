(() => {
  function initialize() {
    const marker = document.querySelector("span#directory-diagnosis-explorer");
    if (!marker) return;

    const anchor = marker.closest("p");
    const next = anchor?.nextElementSibling;
    const table = next?.tagName === "TABLE" ? next : next?.querySelector("table");
    if (!table?.tBodies[0]?.rows.length) return;

    const rows = Array.from(table.tBodies[0].rows, row =>
      Array.from(row.cells, cell => cell.textContent.trim())
    );
    const panel = document.createElement("div");
    panel.id = marker.id;
    panel.className = "admonition note";
    panel.innerHTML = `
      <p class="admonition-title">Find the next diagnostic step</p>
      <label for="directory-diagnosis-symptom">Observed symptom</label>
      <select id="directory-diagnosis-symptom"></select>
      <div aria-live="polite">
        <p><strong>Check first:</strong> <span data-first></span></p>
        <p><strong>Verify after repair:</strong> <span data-verify></span></p>
      </div>
    `;

    const select = panel.querySelector("select");
    const first = panel.querySelector("[data-first]");
    const verify = panel.querySelector("[data-verify]");
    for (const [index, [symptom]] of rows.entries()) {
      const option = document.createElement("option");
      option.value = String(index);
      option.textContent = symptom;
      select.append(option);
    }

    function update() {
      const [, nextStep, expected] = rows[Number(select.value)];
      first.textContent = nextStep;
      verify.textContent = expected;
    }

    select.value = "0";
    select.addEventListener("change", update);
    update();
    anchor.replaceWith(panel);
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(initialize);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
