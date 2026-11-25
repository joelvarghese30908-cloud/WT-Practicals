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

// Practicum 11: Custom Constraint Validation
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("examRegForm");
  const fullName = document.getElementById("fullName");
  const percentage = document.getElementById("percentage");
  const feedback = document.getElementById("formFeedback");

  if (fullName) {
    fullName.addEventListener("input", () => {
      if (!/^[A-Za-z\s]{3,60}$/.test(fullName.value.trim())) {
        fullName.setCustomValidity("Full name must contain only alphabets and spaces (3-60 characters).");
      } else {
        fullName.setCustomValidity("");
      }
    });
  }

  if (percentage) {
    percentage.addEventListener("input", () => {
      const val = parseFloat(percentage.value);
      if (isNaN(val) || val < 55 || val > 100) {
        percentage.setCustomValidity("Aggregate percentage must be between 55% and 100% to meet NAEB eligibility.");
      } else {
        percentage.setCustomValidity("");
      }
    });
  }

  if (form && feedback) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const checkedSubjects = form.querySelectorAll('input[name="subjects"]:checked');
      if (checkedSubjects.length === 0) {
        feedback.className = "form-feedback error";
        feedback.textContent = "Validation Error: Please select at least one examination subject.";
        return;
      }

      if (!form.checkValidity()) {
        form.reportValidity();
        feedback.className = "form-feedback error";
        feedback.textContent = "Please correct the highlighted invalid inputs before submitting.";
        return;
      }

      const appId = "NAEB2026-" + Math.floor(100000 + Math.random() * 900000);
      feedback.className = "form-feedback success";
      feedback.textContent = `Registration Successful! Candidate ${fullName.value.trim()} registered with Application ID: ${appId}.`;
    });
  }
});
