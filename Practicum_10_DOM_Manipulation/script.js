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

// Practicum 10: DOM Manipulation
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("customSubjectInput");
  const addBtn = document.getElementById("addSubjectBtn");
  const list = document.querySelector("#dynamicSubjectList");
  const countSpan = document.getElementById("subjectCount");

  function updateCount() {
    if (countSpan && list) {
      countSpan.textContent = list.children.length;
    }
  }

  if (addBtn && input && list) {
    addBtn.addEventListener("click", () => {
      const value = input.value.trim();
      if (!value) return;

      const li = document.createElement("li");
      li.setAttribute("class", "dom-subject-item");
      li.style.marginBottom = "8px";

      const span = document.createElement("span");
      span.textContent = value + " ";

      const editBtn = document.createElement("button");
      editBtn.type = "button";
      editBtn.textContent = "Edit";
      editBtn.style.padding = "4px 10px";
      editBtn.style.fontSize = "0.8rem";
      editBtn.addEventListener("click", () => {
        const updated = prompt("Modify subject name:", span.textContent.trim());
        if (updated && updated.trim()) {
          span.textContent = updated.trim() + " ";
        }
      });

      const delBtn = document.createElement("button");
      delBtn.type = "button";
      delBtn.textContent = "Remove";
      delBtn.style.padding = "4px 10px";
      delBtn.style.fontSize = "0.8rem";
      delBtn.style.backgroundColor = "#dc2626";
      delBtn.addEventListener("click", () => {
        li.remove();
        updateCount();
      });

      li.appendChild(span);
      li.appendChild(editBtn);
      li.appendChild(delBtn);
      list.appendChild(li);

      input.value = "";
      updateCount();
    });
  }
});
