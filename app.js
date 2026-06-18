const STORAGE_KEY = "nutfit_workouts_live_v1";
const PROFILE_KEY = "nutfit_profile_v1";
const PLAN_KEY = "nutfit_plan_v1";

const typeLabels = {
  Run: "วิ่ง",
  Football: "ฟุตบอล",
  Badminton: "แบดมินตัน",
  Strength: "เวท / Strength",
  Recovery: "Recovery"
};

const intensityLabels = {
  Easy: "เบา",
  Moderate: "ปานกลาง",
  Hard: "หนัก"
};

const typeLabelsEn = {
  Run: "Run",
  Football: "Football",
  Badminton: "Badminton",
  Strength: "Strength",
  Recovery: "Recovery"
};

const intensityLabelsEn = {
  Easy: "Easy",
  Moderate: "Moderate",
  Hard: "Hard"
};

const dashboardPlan = [
  { day: "Monday", title: "Easy Run + Core", note: "Zone 2 pace with core stability", icon: "🏃" },
  { day: "Tuesday", title: "Strength Training", note: "Legs, hips, core, and upper body", icon: "💪" },
  { day: "Wednesday", title: "Football", note: "Match fitness, agility, and game speed", icon: "⚽" },
  { day: "Thursday", title: "Recovery Run", note: "Very easy effort or mobility work", icon: "♻" },
  { day: "Friday", title: "Speed Run / Interval", note: "Short fast reps, reduce load if legs feel heavy", icon: "⚡" },
  { day: "Saturday", title: "Long Run", note: "Build endurance gradually", icon: "⛰" },
  { day: "Sunday", title: "Badminton", note: "Footwork, reaction, and aerobic load", icon: "🏸" }
];

const defaultWeeklyPlan = [
  { day: "วันจันทร์", short: "จ", title: "Easy Run + Core", type: "Run", icon: "🏃", note: "วิ่งเบาแบบ Zone 2 แล้วเสริมแกนกลางลำตัว" },
  { day: "วันอังคาร", short: "อ", title: "Strength Training", type: "Strength", icon: "💪", note: "เสริมขา สะโพก ลำตัว และช่วงบน" },
  { day: "วันพุธ", short: "พ", title: "ฟุตบอล", type: "Football", icon: "⚽", note: "ซ้อมความฟิต ความคล่องตัว และเกมจริง" },
  { day: "วันพฤหัสบดี", short: "พฤ", title: "Recovery Run", type: "Recovery", icon: "♻", note: "วิ่งเบามาก หรือเน้นยืดเหยียดฟื้นตัว" },
  { day: "วันศุกร์", short: "ศ", title: "Speed Run / Interval", type: "Run", icon: "⚡", note: "วิ่งเร็วเป็นช่วง ถ้าขาหนักให้ลดความเข้มข้น" },
  { day: "วันเสาร์", short: "ส", title: "Long Run", type: "Run", icon: "⛰", note: "เพิ่มความอึดด้วยระยะยาวแบบค่อยเป็นค่อยไป" },
  { day: "วันอาทิตย์", short: "อา", title: "แบดมินตัน", type: "Badminton", icon: "🏸", note: "ฝึกฟุตเวิร์ก ปฏิกิริยา และความทนทาน" }
];

const sampleWorkouts = [];

let workouts = loadWorkouts();
let profile = loadProfile();
let weeklyPlan = loadPlan();

const pages = document.querySelectorAll(".page");
const navItems = document.querySelectorAll(".nav-item");
const workoutForm = document.querySelector("#workoutForm");
const typeInput = document.querySelector("#typeInput");
const distanceField = document.querySelector("#distanceField");
const distanceInput = document.querySelector("#distanceInput");
const feelingInput = document.querySelector("#feelingInput");
const feelingValue = document.querySelector("#feelingValue");
const importFileInput = document.querySelector("#importFileInput");
const profileForm = document.querySelector("#profileForm");
const avatarInput = document.querySelector("#avatarInput");
const profileInputs = ["Name", "Age", "Gender", "Height", "Weight", "Goal", "Program"].reduce((acc, key) => {
  acc[key.toLowerCase()] = document.querySelector(`#profile${key}Input`);
  return acc;
}, {});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#dateInput").value = formatDate(new Date());
  populateProfileForm();
  render();
  if (!isProfileComplete(profile)) showPage("profile");
  registerServiceWorker();
});

navItems.forEach((button) => {
  button.addEventListener("click", () => showPage(button.dataset.page));
});

document.querySelectorAll("[data-page]").forEach((button) => {
  button.addEventListener("click", () => showPage(button.dataset.page));
});

document.querySelector("#profileShortcut").addEventListener("click", () => showPage("profile"));
document.querySelector("#profileShortcut").addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") showPage("profile");
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
  const confirmed = window.confirm("Clear all workouts? This cannot be undone. Export a backup first if you need one.");
  if (!confirmed) return;

  workouts = [];
  saveWorkouts();
  render();
});

document.querySelector("#exportDataBtn").addEventListener("click", exportWorkoutData);

document.querySelector("#importDataBtn").addEventListener("click", () => {
  importFileInput.click();
});

importFileInput.addEventListener("change", importWorkoutData);

profileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  profile = {
    name: profileInputs.name.value.trim() || "User",
    age: Number(profileInputs.age.value || 0),
    gender: profileInputs.gender.value,
    height: Number(profileInputs.height.value || 0),
    weight: Number(profileInputs.weight.value || 0),
    goal: profileInputs.goal.value,
    program: profileInputs.program.value,
    avatar: profile.avatar || ""
  };
  saveProfile();
  render();
  showPage("dashboard");
});

["height", "weight"].forEach((key) => {
  profileInputs[key].addEventListener("input", renderProfilePreview);
});

document.querySelector("#savePlanBtn").addEventListener("click", savePlanFromEditor);
document.querySelector("#resetPlanBtn").addEventListener("click", () => {
  const confirmed = window.confirm("Reset weekly plan to the default NutFit plan?");
  if (!confirmed) return;
  weeklyPlan = defaultWeeklyPlan.map((item) => ({ ...item }));
  savePlan();
  render();
});

document.querySelector("#chooseAvatarBtn").addEventListener("click", () => avatarInput.click());
document.querySelector("#removeAvatarBtn").addEventListener("click", () => {
  profile.avatar = "";
  saveProfile();
  render();
});
avatarInput.addEventListener("change", handleAvatarUpload);

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

function loadProfile() {
  const fallback = {
    name: "User",
    age: 0,
    gender: "ไม่ระบุ",
    height: 0,
    weight: 0,
    goal: "เพิ่มความฟิต",
    program: "Balanced Fitness",
    avatar: ""
  };
  const stored = localStorage.getItem(PROFILE_KEY);
  if (!stored) return fallback;

  try {
    return { ...fallback, ...JSON.parse(stored) };
  } catch {
    return fallback;
  }
}

function saveProfile() {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

function isProfileComplete(data) {
  return Boolean(
    data
    && data.name
    && data.name !== "User"
    && Number(data.age) > 0
    && Number(data.height) > 0
    && Number(data.weight) > 0
  );
}

function loadPlan() {
  const stored = localStorage.getItem(PLAN_KEY);
  if (!stored) return defaultWeeklyPlan.map((item) => ({ ...item }));

  try {
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed) || parsed.length !== 7) return defaultWeeklyPlan.map((item) => ({ ...item }));
    return parsed.map((item, index) => ({ ...defaultWeeklyPlan[index], ...item }));
  } catch {
    return defaultWeeklyPlan.map((item) => ({ ...item }));
  }
}

function savePlan() {
  localStorage.setItem(PLAN_KEY, JSON.stringify(weeklyPlan));
}

function populateProfileForm() {
  profileInputs.name.value = profile.name || "";
  profileInputs.age.value = profile.age || "";
  profileInputs.gender.value = profile.gender || "ไม่ระบุ";
  profileInputs.height.value = profile.height || "";
  profileInputs.weight.value = profile.weight || "";
  profileInputs.goal.value = profile.goal || "เพิ่มความฟิต";
  profileInputs.program.value = profile.program || "Balanced Fitness";
  renderProfilePreview();
}

function renderProfilePreview() {
  const height = Number(profileInputs.height.value || 0);
  const weight = Number(profileInputs.weight.value || 0);
  const bmi = calculateBmi(height, weight);
  document.querySelector("#profileBmiPreview").textContent = bmi ? bmi.toFixed(1) : "-";
  document.querySelector("#profileBmiCategory").textContent = bmi ? bmiCategory(bmi) : "กรอกส่วนสูงและน้ำหนักเพื่อคำนวณ BMI";
}

function handleAvatarUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    window.alert("Please choose an image file.");
    avatarInput.value = "";
    return;
  }

  const reader = new FileReader();
  reader.onload = () => resizeAvatar(reader.result)
    .then((avatarData) => {
      profile.avatar = avatarData;
      saveProfile();
      render();
    })
    .catch(() => window.alert("Cannot read this image. Please try another file."))
    .finally(() => {
      avatarInput.value = "";
    });
  reader.readAsDataURL(file);
}

function resizeAvatar(dataUrl) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const size = 512;
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      const sourceSize = Math.min(image.width, image.height);
      const sourceX = (image.width - sourceSize) / 2;
      const sourceY = (image.height - sourceSize) / 2;

      canvas.width = size;
      canvas.height = size;
      context.drawImage(image, sourceX, sourceY, sourceSize, sourceSize, 0, 0, size, size);
      resolve(canvas.toDataURL("image/jpeg", 0.82));
    };
    image.onerror = reject;
    image.src = dataUrl;
  });
}

function exportWorkoutData() {
  const payload = {
    app: "NutFit V1",
    exportedAt: new Date().toISOString(),
    version: 1,
    profile,
    weeklyPlan,
    workouts
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `nutfit-backup-${formatDate(new Date())}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function importWorkoutData(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      const importedWorkouts = Array.isArray(parsed) ? parsed : parsed.workouts;

      if (!Array.isArray(importedWorkouts) || !importedWorkouts.every(isValidWorkout)) {
        window.alert("Import failed. Please choose a valid NutFit backup JSON file.");
        return;
      }

      const confirmed = window.confirm(`Import ${importedWorkouts.length} workouts? This will replace your current NutFit data.`);
      if (!confirmed) return;

      workouts = importedWorkouts.map(normalizeWorkout);
      if (parsed.profile && typeof parsed.profile === "object") {
        profile = { ...profile, ...parsed.profile };
        saveProfile();
        populateProfileForm();
      }
      if (Array.isArray(parsed.weeklyPlan) && parsed.weeklyPlan.length === 7) {
        weeklyPlan = parsed.weeklyPlan.map((item, index) => ({ ...defaultWeeklyPlan[index], ...item }));
        savePlan();
      }
      saveWorkouts();
      render();
      showPage("dashboard");
    } catch {
      window.alert("Import failed. The selected file is not valid JSON.");
    } finally {
      importFileInput.value = "";
    }
  };
  reader.readAsText(file);
}

function render() {
  workouts.sort((a, b) => new Date(b.date) - new Date(a.date));
  renderProfile();
  renderPlan();
  renderPlanEditor();
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

function renderProfile() {
  const bmi = calculateBmi(profile.height, profile.weight);
  const isComplete = isProfileComplete(profile);
  const avatar = profile.avatar || "";
  document.querySelector("#appBrandTitle").textContent = isComplete ? `${profile.name} Fit` : "MyFit Coach";
  document.querySelector("#headerProfileName").textContent = isComplete ? profile.name : "Setup";
  document.querySelector("#headerProfileAge").textContent = profile.age ? `${profile.age}` : "-";
  document.querySelector("#dashboardBmi").textContent = bmi ? `${bmi.toFixed(1)} ${bmiCategoryShort(bmi)}` : "Setup";
  document.querySelector("#dashboardProgram").textContent = profile.program || "Balanced Fitness";
  document.querySelector("#setupPrompt").classList.toggle("hidden", isComplete);
  renderAvatar(avatar);
}

function renderAvatar(avatar) {
  const headerAvatar = document.querySelector("#headerAvatar");
  const profileAvatarPreview = document.querySelector("#profileAvatarPreview");
  const avatarInitial = document.querySelector("#avatarInitial");
  const initial = (profile.name || "User").trim().charAt(0).toUpperCase() || "U";

  avatarInitial.textContent = initial;
  [headerAvatar, profileAvatarPreview].forEach((image) => {
    image.src = avatar || "";
    image.classList.toggle("visible", Boolean(avatar));
  });
}

function renderPlanEditor() {
  document.querySelector("#planEditor").innerHTML = weeklyPlan.map((item, index) => `
    <div class="plan-edit-row">
      <div class="plan-edit-day">${item.day}</div>
      <label>
        ชื่อกิจกรรม
        <input data-plan-index="${index}" data-plan-field="title" type="text" value="${escapeAttribute(item.title)}">
      </label>
      <label>
        ประเภท
        <select data-plan-index="${index}" data-plan-field="type">
          ${Object.entries(typeLabels).map(([value, label]) => `<option value="${value}" ${item.type === value ? "selected" : ""}>${label}</option>`).join("")}
        </select>
      </label>
      <label>
        รายละเอียด
        <input data-plan-index="${index}" data-plan-field="note" type="text" value="${escapeAttribute(item.note)}">
      </label>
    </div>
  `).join("");
}

function savePlanFromEditor() {
  const nextPlan = weeklyPlan.map((item) => ({ ...item }));
  document.querySelectorAll("[data-plan-index]").forEach((input) => {
    const index = Number(input.dataset.planIndex);
    const field = input.dataset.planField;
    nextPlan[index][field] = input.value.trim() || defaultWeeklyPlan[index][field];
    if (field === "type") {
      nextPlan[index].icon = workoutIcon(input.value);
    }
  });
  weeklyPlan = nextPlan;
  savePlan();
  render();
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
  document.querySelector("#weeklyProgressText").textContent = `${completedDays} / 7 days`;
  document.querySelector("#weeklyProgressBar").style.width = `${progress}%`;

  const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
  const today = weeklyPlan[todayIndex];
  const todayDay = dashboardPlan[todayIndex].day;
  const todayLogged = currentWeek.find((workout) => workout.date === formatDate(new Date()));
  document.querySelector("#todayBadge").textContent = todayLogged ? "Logged" : "Plan";
  document.querySelector("#todayWorkout").innerHTML = `
    <div class="mini-line"><strong>${today.title}</strong><span>${todayDay}</span></div>
    <div class="mini-line"><span>${today.note}</span><span>${today.icon}</span></div>
  `;

  renderWorkoutCollection("#recentWorkouts", workouts.slice(0, 4), false, "en");
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
      <span class="badge">${typeLabels[item.type]}</span>
    </article>
  `).join("");
}

function renderWorkoutLists() {
  renderWorkoutCollection("#allWorkouts", workouts, true);
}

function renderWorkoutCollection(selector, list, allowDelete, language = "th") {
  const container = document.querySelector(selector);
  const labels = language === "en" ? typeLabelsEn : typeLabels;
  const intensity = language === "en" ? intensityLabelsEn : intensityLabels;
  const durationUnit = language === "en" ? "min" : "นาที";
  const distanceUnit = language === "en" ? "km" : "กม.";
  const feelingText = language === "en" ? "Feeling" : "ความรู้สึก";
  const injuryText = language === "en" ? "Injury" : "อาการเจ็บ";
  if (!list.length) {
    container.innerHTML = `<div class="empty-state">${language === "en" ? "No workouts yet" : "ยังไม่มีข้อมูล Workout"}</div>`;
    return;
  }

  container.innerHTML = list.map((workout) => `
    <div class="workout-item">
      <div>
        <strong>${workoutIcon(workout.type)} ${labels[workout.type] || workout.type}</strong>
        <small>${formatDisplayDate(workout.date)} • ${workout.duration} ${durationUnit}${isRunLike(workout) ? ` • ${Number(workout.distance).toFixed(1)} ${distanceUnit}` : ""}</small>
        <small class="${workout.intensity.toLowerCase()}">${intensity[workout.intensity]} • ${feelingText} ${workout.feeling}/5</small>
        ${workout.injury ? `<small class="hard">${injuryText}: ${escapeHtml(workout.injury)}</small>` : ""}
        ${workout.remark ? `<small>${escapeHtml(workout.remark)}</small>` : ""}
      </div>
      ${allowDelete ? `<button class="delete-btn" type="button" onclick="deleteWorkout('${workout.id}')" title="ลบ Workout">×</button>` : ""}
    </div>
  `).join("");
}

function renderRunning() {
  const runs = workouts.filter(isRunLike);
  const totalDistance = sum(runs.map((workout) => workout.distance));
  const totalDuration = sum(runs.map((workout) => workout.duration));
  const pace = totalDistance ? totalDuration / totalDistance : 0;
  const longest = runs.length ? Math.max(...runs.map((workout) => Number(workout.distance || 0))) : 0;

  document.querySelector("#runTotalDistance").textContent = `${totalDistance.toFixed(1)} กม.`;
  document.querySelector("#runAveragePace").textContent = pace ? `${pace.toFixed(1)} นาที/กม.` : "-";
  document.querySelector("#runLongest").textContent = `${longest.toFixed(1)} กม.`;
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
          <strong>${workoutIcon(sport)} ${typeLabels[sport]}</strong>
          <small>${monthly.length} ครั้งในเดือนนี้</small>
        </div>
        <div>
          <strong>${avgDuration ? Math.round(avgDuration) : 0} นาที</strong>
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
    recommendations.push({ level: "โหลดหนักเกินไป", text: "สัปดาห์นี้มี Workout หนักเกิน 3 วัน ควรเพิ่มวันพักหรือเปลี่ยนเป็น Easy Day เพื่อให้ร่างกายฟื้นตัว" });
  }

  if (weeklyDistance > 25 && hasFootball && hasBadminton) {
    recommendations.push({ level: "โหลดรวมสูง", text: "วิ่งรวมเกิน 25 กม. และมีทั้งฟุตบอลกับแบดมินตัน ระวังโหลดสะสมที่ขา เข่า และข้อเท้า" });
  }

  if (tomorrowPlan.type === "Football") {
    recommendations.push({ level: "พรุ่งนี้มีฟุตบอล", text: "ไม่แนะนำให้วิ่ง Interval วันนี้ ควรเลือก Easy Run, Recovery หรือ Mobility เพื่อเก็บแรงไว้เตะบอล" });
  }

  if (hasInjury) {
    recommendations.push({ level: "มีบันทึกอาการเจ็บ", text: "มีอาการเจ็บในสัปดาห์นี้ แนะนำให้พัก ลดความหนัก หรือทำ Recovery Run เท่านั้น ถ้าเจ็บต่อเนื่องควรหยุดซ้อมหนัก" });
  }

  if (!recommendations.length) {
    recommendations.push({ level: "สมดุลดี", text: "โหลดการซ้อมสัปดาห์นี้ดูสมดุล รักษาวันวิ่งเบาให้เบาจริง และเพิ่มระยะอย่างค่อยเป็นค่อยไป" });
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
    <div class="signal-item"><strong>${hardCount}</strong><span>Workout หนักในสัปดาห์นี้</span></div>
    <div class="signal-item"><strong>${weeklyDistance.toFixed(1)} กม.</strong><span>ระยะวิ่งรวมสัปดาห์นี้</span></div>
    <div class="signal-item"><strong>${hasFootball ? "มี" : "ไม่มี"}</strong><span>ฟุตบอลในสัปดาห์นี้</span></div>
    <div class="signal-item"><strong>${hasBadminton ? "มี" : "ไม่มี"}</strong><span>แบดมินตันในสัปดาห์นี้</span></div>
  `;
}

function deleteWorkout(id) {
  workouts = workouts.filter((workout) => workout.id !== id);
  saveWorkouts();
  render();
}

function isValidWorkout(workout) {
  return workout
    && typeof workout === "object"
    && typeof workout.date === "string"
    && typeof workout.type === "string"
    && Number.isFinite(Number(workout.duration));
}

function normalizeWorkout(workout) {
  return {
    id: workout.id || (crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random())),
    date: workout.date,
    type: typeLabels[workout.type] ? workout.type : "Run",
    duration: Number(workout.duration || 0),
    distance: Number(workout.distance || 0),
    intensity: intensityLabels[workout.intensity] ? workout.intensity : "Easy",
    feeling: Math.min(5, Math.max(1, Number(workout.feeling || 3))),
    injury: String(workout.injury || ""),
    remark: String(workout.remark || "")
  };
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;

  navigator.serviceWorker.register("./sw.js").catch(() => {
    // The app still works without offline caching, so keep this silent for users.
  });
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
  const key = Object.entries(count).sort((a, b) => b[1] - a[1])[0][0];
  return intensityLabels[key] || key;
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

function calculateBmi(heightCm, weightKg) {
  const heightM = Number(heightCm) / 100;
  const weight = Number(weightKg);
  if (!heightM || !weight) return 0;
  return weight / (heightM * heightM);
}

function bmiCategory(bmi) {
  if (bmi < 18.5) return "น้ำหนักน้อยกว่าเกณฑ์";
  if (bmi < 23) return "อยู่ในเกณฑ์ปกติ";
  if (bmi < 25) return "น้ำหนักเกินเล็กน้อย";
  if (bmi < 30) return "น้ำหนักเกิน";
  return "อ้วน";
}

function bmiCategoryShort(bmi) {
  if (bmi < 18.5) return "Low";
  if (bmi < 23) return "Normal";
  if (bmi < 25) return "At Risk";
  if (bmi < 30) return "High";
  return "Very High";
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

function escapeAttribute(value) {
  return escapeHtml(String(value || ""));
}
