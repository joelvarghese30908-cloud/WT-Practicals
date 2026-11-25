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

// Practicum 12: Async Fetch Endpoint Data Management
const fallbackCentersData = [
  { centerCode: "BLR-01", city: "Bengaluru", venue: "PES Digital Assessment Hub, Electronic City", date: "2027-01-10", seatsAvailable: 142, status: "Open" },
  { centerCode: "CHN-02", city: "Chennai", venue: "Anna IT Park CBT Center, Guindy", date: "2027-01-11", seatsAvailable: 88, status: "Open" },
  { centerCode: "HYD-03", city: "Hyderabad", venue: "HITEC City Cyber Testing Arena", date: "2027-01-12", seatsAvailable: 19, status: "Filling Fast" },
  { centerCode: "MUM-04", city: "Mumbai", venue: "Powai Tech Assessment Complex", date: "2027-01-13", seatsAvailable: 0, status: "Full" }
];

async function loadExamCenters() {
  const statusEl = document.getElementById("apiStatusMessage");
  const tbody = document.getElementById("centerTableBody");
  if (!statusEl || !tbody) return;

  statusEl.textContent = "Loading live examination center data from endpoint...";
  tbody.innerHTML = "";

  try {
    const response = await fetch("centers.json");
    if (!response.ok) throw new Error("HTTP error " + response.status);
    const data = await response.json();
    renderCentersTable(data, tbody);
    statusEl.textContent = "Live seat availability updated successfully.";
  } catch (error) {
    // Graceful fallback if opened directly via file:// protocol without local HTTP server
    renderCentersTable(fallbackCentersData, tbody);
    statusEl.textContent = "Loaded cached endpoint snapshot (run via local server for live HTTP fetch).";
  } finally {
    console.log("Center endpoint fetch cycle completed.");
  }
}

function renderCentersTable(centers, tbody) {
  centers.forEach((c) => {
    const tr = document.createElement("tr");
    [c.centerCode, c.city, c.venue, c.date, c.seatsAvailable, c.status].forEach((val) => {
      const td = document.createElement("td");
      td.textContent = val;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadExamCenters();
  const refreshBtn = document.getElementById("refreshCentersBtn");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", loadExamCenters);
  }
});
