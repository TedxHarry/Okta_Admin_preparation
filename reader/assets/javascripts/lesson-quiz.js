(() => {
  function initialize() {
    document.querySelectorAll(".lesson-quiz-question").forEach(question => {
      const button = question.querySelector("button");
      if (!button.hidden) return;

      const choices = Array.from(question.querySelectorAll("input"));
      const feedback = question.querySelector("[role=status]");
      const answer = question.querySelector("details");

      button.addEventListener("click", () => {
        if (!choices.some(choice => choice.checked)) {
          feedback.textContent = "Choose an answer first.";
          return;
        }

        const correct = choices.every(choice => choice.checked === choice.hasAttribute("data-correct"));
        feedback.textContent = correct ? "Correct." : "Not quite. Review the answer below.";
        answer.open = true;
      });

      question.addEventListener("change", () => {
        feedback.textContent = "";
        answer.open = false;
      });

      button.hidden = false;
    });
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(initialize);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
