const STORAGE_KEY = "nutfit_workouts_v1";

const weeklyPlan = [
  { day: "Monday", short: "Mon", title: "Easy Run + Core", type: "Run", icon: "🏃", note: "Zone 2 pace with core stability" },
  { day: "Tuesday", short: "Tue", title: "Strength Training", type: "Strength", icon: "💪", note: "Legs, hips, and upper body" },
  { day: "Wednesday", short: "Wed", title: "Football", type: "Football", icon: "⚽", note: "Match fitness and agility" },
  { day: "Thursday", short: "Thu", title: "Recovery Run", type: "Recovery", icon: "♻", note: "Very easy effort or mobility" },
  { day: "Friday", short: "Fri", title: "Speed Run / Interval", type: "Run", icon: "⚡", note: "Short reps, stop if legs feel heavy" },
  { day: "Saturday", short: "Sat", title: "Long Run", type: "Run", icon: "⛰", note: "Build endurance gradually" },
  { day: "Sunday", short: "Sun", title: "Badminton", type: "Badminton", icon: "🏸", note: "Footwork, reaction, and aerobic load" }
];

const sampleWorkouts = [
  { id: "sample-1", date: "2026-06-15", type: "Run", duration: 38, distance: 5.2, intensity: "Easy", feeling: 4, injury: "", remark: "Zone 2 run" },
  { id: "sample-2", date: "2026-06-16", type: "Strength", duration: 45, distance: 0, intensity: "Moderate", feeling: 4, injury: "", remark: "Squat, lunge, plank" },
  { id: "sample-3", date: "2026-06-17", type: "Football", duration: 75, distance: 0, intensity: "Hard", feeling: 5, injury: "", remark: "Small-sided game" },
  { id: "sample-4", date: "2026-06-18", type: "Recovery", duration: 25, distance: 2.7, intensity: "Easy", feeling: 3, injury: "", remark: "Very light jog" },
  { id: "sample-5", date: "2026-06-20", type: "Run", duration: 62, distance: 8.4, intensity: "Moderate", feeling: 4, injury: "", remark: "Long run progression" },
  { id: "sample-6", date: "2026-06-21", type: "Badminton", duration: 60, distance: 0, intensity: "Moderate", feeling: 4, injury: "", remark: "Doubles session" }
];

let workouts = loadWorkouts();

const pages = document.querySelectorAll(".page");
const navItems = document.querySelectorAll(".nav-item");
const workoutForm = document.querySelector("#workoutForm");
const typeInput = document.querySelector("#typeInput");
const distanceField = document.querySelector("#distanceField");
const distanceInput = document.querySelector("#distanceInput");
const feelingInput = document.querySelector("#feelingInput");
const feelingValue = document.querySelector("#feelingValue");

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#dateInput").value = formatDate(new Date());
  render();
});

navItems.forEach((button) => {
  button.addEventListener("click", () => showPage(button.dataset.page));
});

typeInput.addEventListener("change", toggleDistanceField);

feelingInput.addEventListener("input", () => {
  feelingValue.textContent = `${feelingInput.value} / 5`;
});

workoutForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const type = typeInput.value;
  const workout = {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    date: document.querySelector("#dateInput").value,
    type,
    duration: Number(document.querySelector("#durationInput").value),
    distance: type === "Run" || type === "Recovery" ? Number(distanceInput.value || 0) : 0,
    intensity: document.querySelector("#intensityInput").value,
    feeling: Number(feelingInput.value),
    injury: document.querySelector("#injuryInput").value.trim(),
    remark: document.querySelector("#remarkInput").value.trim()
  };

  workouts = [workout, ...workouts];
  saveWorkouts();
  workoutForm.reset();
  document.querySelector("#dateInput").value = formatDate(new Date());
  feelingInput.value = 4;
  feelingValue.textContent = "4 / 5";
  toggleDistanceField();
  render();
  showPage("dashboard");
});

document.querySelector("#resetDemoBtn").addEventListener("click", () => {
  workouts = [...sampleWorkouts];
  saveWorkouts();
  render();
});

function loadWorkouts() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleWorkouts));
    return [...sampleWorkouts];
  }

  try {
    return JSON.parse(stored);
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleWorkouts));
    return [...sampleWorkouts];
  }
}

function saveWorkouts() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
}

function render() {
  workouts.sort((a, b) => new Date(b.date) - new Date(a.date));
  renderPlan();
  renderDashboard();
  renderWorkoutLists();
  renderRunning();
  renderCoach();
  toggleDistanceField();
}

function showPage(pageId) {
  pages.forEach((page) => page.classList.toggle("active", page.id === pageId));
  navItems.forEach((item) => item.classList.toggle("active", item.dataset.page === pageId));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleDistanceField() {
  const showDistance = typeInput.value === "Run" || typeInput.value === "Recovery";
  distanceField.style.display = showDistance ? "grid" : "none";
  distanceInput.required = showDistance;
}

function renderDashboard() {
  const currentWeek = getCurrentWeekWorkouts();
  const runDistance = sum(currentWeek.filter(isRunLike).map((workout) => workout.distance));
  const duration = sum(currentWeek.map((workout) => workout.duration));
  const avgFeeling = average(currentWeek.map((workout) => workout.feeling));
  const trainingScore = calculateTrainingScore(currentWeek, runDistance, avgFeeling);
  const completedDays = new Set(currentWeek.map((workout) => workout.date)).size;
  const progress = Math.min((completedDays / 7) * 100, 100);

  document.querySelector("#trainingScore").textContent = trainingScore;
  document.querySelector("#scoreLabel").textContent = scoreLabel(trainingScore);
  document.querySelector(".score-ring").style.setProperty("--score", `${trainingScore}%`);
  document.querySelector("#weeklyDistance").textContent = `${runDistance.toFixed(1)} km`;
  document.querySelector("#weeklyWorkouts").textContent = currentWeek.length;
  document.querySelector("#weeklyDuration").textContent = `${duration} min`;
  document.querySelector("#weeklyFeeling").textContent = avgFeeling ? avgFeeling.toFixed(1) : "-";
  document.querySelector("#weeklyProgressText").textContent = `${completedDays} / 7`;
  document.querySelector("#weeklyProgressBar").style.width = `${progress}%`;

  const today = weeklyPlan[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];
  const todayLogged = currentWeek.find((workout) => workout.date === formatDate(new Date()));
  document.querySelector("#todayBadge").textContent = todayLogged ? "Logged" : "Plan";
  document.querySelector("#todayWorkout").innerHTML = `
    <div class="mini-line"><strong>${today.title}</strong><span>${today.day}</span></div>
    <div class="mini-line"><span>${today.note}</span><span>${today.icon}</span></div>
  `;

  renderWorkoutCollection("#recentWorkouts", workouts.slice(0, 4), false);
}

function renderPlan() {
  const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
  document.querySelector("#planCards").innerHTML = weeklyPlan.map((item, index) => `
    <article class="plan-card ${index === todayIndex ? "today" : ""}">
      <div class="plan-icon">${item.icon}</div>
      <div>
        <p>${item.day}</p>
        <h3>${item.title}</h3>
        <p>${item.note}</p>
      </div>
      <span class="badge">${item.type}</span>
    </article>
  `).join("");
}

function renderWorkoutLists() {
  renderWorkoutCollection("#allWorkouts", workouts, true);
}

function renderWorkoutCollection(selector, list, allowDelete) {
  const container = document.querySelector(selector);
  if (!list.length) {
    container.innerHTML = `<div class="empty-state">ยังไม่มีข้อมูล Workout</div>`;
    return;
  }

  container.innerHTML = list.map((workout) => `
    <div class="workout-item">
      <div>
        <strong>${workoutIcon(workout.type)} ${workout.type}</strong>
        <small>${formatDisplayDate(workout.date)} • ${workout.duration} min${isRunLike(workout) ? ` • ${Number(workout.distance).toFixed(1)} km` : ""}</small>
        <small class="${workout.intensity.toLowerCase()}">${workout.intensity} • Feeling ${workout.feeling}/5</small>
        ${workout.injury ? `<small class="hard">Injury: ${escapeHtml(workout.injury)}</small>` : ""}
      </div>
      ${allowDelete ? `<button class="delete-btn" type="button" onclick="deleteWorkout('${workout.id}')" title="Delete workout">×</button>` : ""}
    </div>
  `).join("");
}

function renderRunning() {
  const runs = workouts.filter(isRunLike);
  const totalDistance = sum(runs.map((workout) => workout.distance));
  const totalDuration = sum(runs.map((workout) => workout.duration));
  const pace = totalDistance ? totalDuration / totalDistance : 0;
  const longest = runs.length ? Math.max(...runs.map((workout) => Number(workout.distance || 0))) : 0;

  document.querySelector("#runTotalDistance").textContent = `${totalDistance.toFixed(1)} km`;
  document.querySelector("#runAveragePace").textContent = pace ? `${pace.toFixed(1)} min/km` : "-";
  document.querySelector("#runLongest").textContent = `${longest.toFixed(1)} km`;
  renderWeeklyChart();
  renderSportSummary();
}

function renderWeeklyChart() {
  const weekStart = getWeekStart(new Date());
  const dayDistances = weeklyPlan.map((_, index) => {
    const date = addDays(weekStart, index);
    return sum(workouts
      .filter((workout) => workout.date === formatDate(date) && isRunLike(workout))
      .map((workout) => workout.distance));
  });
  const maxDistance = Math.max(...dayDistances, 1);

  document.querySelector("#weeklyChart").innerHTML = dayDistances.map((distance, index) => `
    <div class="bar">
      <div class="bar-fill" style="height: ${Math.max((distance / maxDistance) * 140, 8)}px"></div>
      <span>${weeklyPlan[index].short}</span>
      <span>${distance.toFixed(1)}</span>
    </div>
  `).join("");
}

function renderSportSummary() {
  const sports = ["Football", "Badminton"];
  const monthKey = formatDate(new Date()).slice(0, 7);

  document.querySelector("#sportSummary").innerHTML = sports.map((sport) => {
    const monthly = workouts.filter((workout) => workout.type === sport && workout.date.startsWith(monthKey));
    const avgDuration = average(monthly.map((workout) => workout.duration));
    const avgIntensity = dominantIntensity(monthly);

    return `
      <div class="sport-row">
        <div>
          <strong>${workoutIcon(sport)} ${sport}</strong>
          <small>${monthly.length} sessions this month</small>
        </div>
        <div>
          <strong>${avgDuration ? Math.round(avgDuration) : 0} min</strong>
          <small>${avgIntensity}</small>
        </div>
      </div>
    `;
  }).join("");
}

function renderCoach() {
  const week = getCurrentWeekWorkouts();
  const hardCount = week.filter((workout) => workout.intensity === "Hard").length;
  const weeklyDistance = sum(week.filter(isRunLike).map((workout) => workout.distance));
  const hasFootball = week.some((workout) => workout.type === "Football");
  const hasBadminton = week.some((workout) => workout.type === "Badminton");
  const hasInjury = week.some((workout) => workout.injury);
  const tomorrowPlan = weeklyPlan[getTomorrowPlanIndex()];
  const recommendations = [];

  if (hardCount > 3) {
    recommendations.push({ level: "Hard load", text: "สัปดาห์นี้มี Hard Workout เกิน 3 วัน ควรเพิ่ม Recovery หรือ Easy Day เพื่อให้ร่างกายฟื้นตัว" });
  }

  if (weeklyDistance > 25 && hasFootball && hasBadminton) {
    recommendations.push({ level: "High load", text: "วิ่งรวมเกิน 25 km และมีทั้ง Football + Badminton ระวังโหลดสะสมที่ขาและเข่า" });
  }

  if (tomorrowPlan.type === "Football") {
    recommendations.push({ level: "Tomorrow football", text: "พรุ่งนี้เป็น Football ไม่แนะนำ Interval วันนี้ ควร Easy Run หรือ Mobility แทน" });
  }

  if (hasInjury) {
    recommendations.push({ level: "Injury note", text: "มีบันทึกอาการเจ็บในสัปดาห์นี้ แนะนำพัก ลดความหนัก หรือ Recovery Run เท่านั้น" });
  }

  if (!recommendations.length) {
    recommendations.push({ level: "Balanced", text: "โหลดสัปดาห์นี้ดูสมดุลดี รักษา Easy Run ให้เบาพอ และเพิ่มระยะทีละน้อย" });
  }

  document.querySelector("#coachRecommendations").innerHTML = recommendations.map((item) => `
    <div class="recommendation-item">
      <div>
        <strong>${item.level}</strong>
        <small>${item.text}</small>
      </div>
    </div>
  `).join("");

  document.querySelector("#loadSignals").innerHTML = `
    <div class="signal-item"><strong>${hardCount}</strong><span>Hard workouts this week</span></div>
    <div class="signal-item"><strong>${weeklyDistance.toFixed(1)} km</strong><span>Weekly running distance</span></div>
    <div class="signal-item"><strong>${hasFootball ? "Yes" : "No"}</strong><span>Football included</span></div>
    <div class="signal-item"><strong>${hasBadminton ? "Yes" : "No"}</strong><span>Badminton included</span></div>
  `;
}

function deleteWorkout(id) {
  workouts = workouts.filter((workout) => workout.id !== id);
  saveWorkouts();
  render();
}

function getCurrentWeekWorkouts() {
  const start = getWeekStart(new Date());
  const end = addDays(start, 7);
  return workouts.filter((workout) => {
    const workoutDate = new Date(`${workout.date}T00:00:00`);
    return workoutDate >= start && workoutDate < end;
  });
}

function getWeekStart(date) {
  const copy = new Date(date);
  const day = copy.getDay() || 7;
  copy.setHours(0, 0, 0, 0);
  copy.setDate(copy.getDate() - day + 1);
  return copy;
}

function getTomorrowPlanIndex() {
  const tomorrow = addDays(new Date(), 1).getDay();
  return tomorrow === 0 ? 6 : tomorrow - 1;
}

function addDays(date, days) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

function calculateTrainingScore(week, distance, avgFeeling) {
  const workoutScore = Math.min(week.length * 10, 40);
  const distanceScore = Math.min(distance * 1.5, 35);
  const feelingScore = avgFeeling ? avgFeeling * 5 : 0;
  const recoveryPenalty = Math.max(week.filter((workout) => workout.intensity === "Hard").length - 2, 0) * 7;
  return Math.max(0, Math.min(100, Math.round(workoutScore + distanceScore + feelingScore - recoveryPenalty)));
}

function scoreLabel(score) {
  if (score >= 80) return "Strong";
  if (score >= 60) return "Good";
  if (score >= 35) return "Building";
  return "Start";
}

function dominantIntensity(list) {
  if (!list.length) return "-";
  const count = list.reduce((acc, workout) => {
    acc[workout.intensity] = (acc[workout.intensity] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(count).sort((a, b) => b[1] - a[1])[0][0];
}

function isRunLike(workout) {
  return workout.type === "Run" || workout.type === "Recovery";
}

function workoutIcon(type) {
  return {
    Run: "🏃",
    Football: "⚽",
    Badminton: "🏸",
    Strength: "💪",
    Recovery: "♻"
  }[type] || "•";
}

function average(values) {
  const filtered = values.filter((value) => Number.isFinite(Number(value)));
  return filtered.length ? sum(filtered) / filtered.length : 0;
}

function sum(values) {
  return values.reduce((total, value) => total + Number(value || 0), 0);
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDisplayDate(date) {
  return new Intl.DateTimeFormat("th-TH", { day: "numeric", month: "short", year: "numeric" }).format(new Date(`${date}T00:00:00`));
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}
