(() => {
  const preferenceKey = "okta-admin-course:sidebar-collapsed";
  const collapsedClass = "course-nav-collapsed";
  const sidebarId = "course-primary-navigation";
  let collapsed = false;

  try {
    collapsed = localStorage.getItem(preferenceKey) === "true";
  } catch {
    // The toggle is still usable when storage is blocked.
  }

  function update(button) {
    document.body.classList.toggle(collapsedClass, collapsed);
    button.setAttribute("aria-expanded", String(!collapsed));
    button.textContent = collapsed ? "Show sidebar" : "Hide sidebar";
  }

  function initialize() {
    const sidebar = document.querySelector(".md-sidebar--primary");
    const title = document.querySelector(".md-header__inner .md-header__title");
    if (!sidebar || !title) return;

    sidebar.id = sidebarId;
    let button = title.parentElement.querySelector(".course-sidebar-toggle");

    if (!button) {
      button = document.createElement("button");
      button.type = "button";
      button.className = "course-sidebar-toggle";
      button.setAttribute("aria-controls", sidebarId);
      button.addEventListener("click", () => {
        collapsed = !collapsed;
        update(button);
        try {
          localStorage.setItem(preferenceKey, String(collapsed));
        } catch {
          // Keep the preference in memory for this visit.
        }
      });
      title.before(button);
    }

    update(button);
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(initialize);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
