document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleInstructionsBtn");
  const instructionsBox = document.getElementById("instructionsBody");
  const notifyBtn = document.getElementById("showDeadlineToastBtn");
  const toast = document.getElementById("deadlineToast");

  if (toggleBtn && instructionsBox) {
    toggleBtn.addEventListener("click", () => {
      instructionsBox.classList.toggle("collapsed");
      toggleBtn.textContent = instructionsBox.classList.contains("collapsed")
        ? "Show Mandatory Instructions"
        : "Hide Mandatory Instructions";
    });
  }

  if (notifyBtn && toast) {
    notifyBtn.addEventListener("click", () => {
      toast.classList.remove("show");
      void toast.offsetWidth;
      toast.classList.add("show");
      setTimeout(() => {
        toast.classList.remove("show");
      }, 4000);
    });
  }
});
