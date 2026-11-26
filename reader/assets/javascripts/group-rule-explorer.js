(() => {
  function initialize() {
    const marker = document.querySelector("span#group-rule-explorer");
    if (!marker) return;

    const explorer = document.createElement("div");
    explorer.id = marker.id;
    explorer.className = "admonition note";
    explorer.innerHTML = `
      <p class="admonition-title">Check a rule outcome</p>
      <label for="group-rule-test-user">Test user</label>
      <select id="group-rule-test-user">
        <option value="0">A-only</option>
        <option value="1">B-only</option>
        <option value="2">Both</option>
        <option value="3">Neither</option>
      </select>
      <label for="group-rule-test-condition">Condition</label>
      <select id="group-rule-test-condition">
        <option value="0">A OR B</option>
        <option value="1">A AND B</option>
        <option value="2">A AND NOT B</option>
        <option value="3">(A OR B) AND Support department</option>
      </select>
      <p><output aria-live="polite" for="group-rule-test-user group-rule-test-condition"></output></p>
    `;

    const user = explorer.querySelector("#group-rule-test-user");
    const condition = explorer.querySelector("#group-rule-test-condition");
    const result = explorer.querySelector("output");
    const users = [
      { inA: true, inB: false, support: true },
      { inA: false, inB: true, support: false },
      { inA: true, inB: true, support: true },
      { inA: false, inB: false, support: true },
    ];

    function update() {
      const { inA, inB, support } = users[Number(user.value)];
      const matches = [
        inA || inB,
        inA && inB,
        inA && !inB,
        (inA || inB) && support,
      ];
      result.textContent = matches[Number(condition.value)]
        ? "Expected preview result: Match"
        : "Expected preview result: Miss";
    }

    user.addEventListener("change", update);
    condition.addEventListener("change", update);
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
