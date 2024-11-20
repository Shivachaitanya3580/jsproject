// script.js

let waterGoal = 0; 
let waterConsumed = 0;
let reminderInterval; 
document.getElementById("setGoalBtn").addEventListener("click", () => {
  const goalInput = document.getElementById("waterGoal").value;
  if (goalInput > 0) {
    waterGoal = parseFloat(goalInput);
    waterConsumed = 0;
    updateProgress();
    setReminders();
    alert(`Goal set to ${waterGoal} liters.`);
  } else {
    alert("Please enter a valid goal.");
  }
});

// Log Water Intake
document.getElementById("logIntakeBtn").addEventListener("click", () => {
  const intakeInput = document.getElementById("waterIntake").value;
  if (intakeInput > 0) {
    waterConsumed += parseFloat(intakeInput);
    updateProgress();
  } else {
    alert("Please enter a valid amount.");
  }
});

// Update Progress
function updateProgress() {
  const progressBar = document.getElementById("progressBar");
  const progressText = document.getElementById("progressText");

  const progressPercent = Math.min((waterConsumed / waterGoal) * 100, 100);
  progressBar.style.width = `${progressPercent}%`;
  progressBar.setAttribute("aria-valuenow", progressPercent);

  progressText.textContent = `${waterConsumed} / ${waterGoal} liters consumed`;
}

// Set Reminder Intervals
function setReminders() {
  if (reminderInterval) clearInterval(reminderInterval);

  const wakeHours = 16; // Assume user is awake for 16 hours
  const intervalTime = (wakeHours * 60 * 60 * 1000) / waterGoal; // Interval in milliseconds

  reminderInterval = setInterval(() => {
    showNotification();
  }, intervalTime);
}

// Show Notification
function showNotification() {
  const notification = document.getElementById("notifications");
  notification.classList.remove("d-none");
  setTimeout(() => {
    notification.classList.add("d-none");
  }, 5000); // Hide after 5 seconds
}
