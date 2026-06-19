// NutFit V2 - static mobile web app.
// Data is stored locally so the app can run on GitHub Pages without a backend.

const STORAGE_KEYS = {
  userProfile: "userProfile",
  lineCoach: "lineCoach",
  workouts: "workouts",
  weeklyPlan: "weeklyPlan",
  personalRecords: "personalRecords",
  coachRecommendations: "coachRecommendations",
  coachNudge: "coachNudge",
  coachNudgeDismissed: "coachNudgeDismissed"
};

const INTEGRATION_CONFIG = {
  appsScriptWebAppUrl: "",
  liffId: ""
};

const legacyKeys = {
  profile: "nutfit_profile_v1",
  workouts: "nutfit_workouts_live_v1",
  plan: "nutfit_plan_v1"
};

const categoryLabels = {
  Running: "วิ่ง",
  Cardio: "คาร์ดิโอ",
  "Team Sport": "กีฬาทีม",
  "Racket Sport": "กีฬาแร็กเก็ต",
  Strength: "เวท / Strength",
  "Mobility / Recovery": "Mobility / Recovery",
  Other: "อื่น ๆ"
};

const categoryIcons = {
  Running: "🏃",
  Cardio: "❤️",
  "Team Sport": "⚽",
  "Racket Sport": "🏸",
  Strength: "💪",
  "Mobility / Recovery": "♻",
  Other: "•"
};

const intensityFactors = {
  Low: 1,
  Medium: 1.5,
  High: 2
};

const intensityLabels = {
  Low: "เบา",
  Medium: "ปานกลาง",
  High: "หนัก"
};

const feelingLabels = {
  Easy: "สบาย",
  Good: "ดี",
  Tired: "ล้า",
  Exhausted: "หมดแรง"
};

const loadStatusLabels = {
  Light: "เบา",
  Balanced: "สมดุล",
  Productive: "กำลังพัฒนา",
  Overload: "โหลดสูงเกินไป"
};

const recoveryStatusLabels = {
  Ready: "พร้อมซ้อม",
  Normal: "ปกติ",
  "Need Recovery": "ควรฟื้นตัว",
  Overloaded: "โหลดเกิน"
};

const legacyGoalLabels = {
  "Fat Loss": "ลดไขมัน / คุมน้ำหนัก",
  "5K": "วิ่งระยะสั้น",
  "10K": "วิ่งระยะกลาง",
  "Half Marathon": "วิ่งระยะไกล",
  "Football Stamina": "เพิ่มสมรรถนะกีฬา"
};

const programDescriptions = {
  "Balanced Fitness": "เหมาะกับคนที่อยากเพิ่มความฟิตโดยรวม มีทั้งวิ่ง เวท Recovery และกีฬาเสริม 4-6 วันต่อสัปดาห์",
  "Beginner Running": "เหมาะกับผู้เริ่มต้นวิ่ง เน้น Easy Run ค่อย ๆ เพิ่มระยะ และลดความเสี่ยงบาดเจ็บ",
  "Sport Endurance": "เหมาะกับคนที่เล่นฟุตบอลหรือแบดมินตัน เน้นความอึด ความเร็ว ความคล่องตัว และการฟื้นตัว",
  "Fat Loss & Mobility": "เหมาะกับการลดไขมันและขยับร่างกายให้ดีขึ้น เน้นคาร์ดิโอปานกลาง เวทพื้นฐาน และ Mobility"
};

const defaultProfile = {
  name: "Nut",
  age: 30,
  height: 168,
  weight: 63,
  runningLevel: "Intermediate",
  goalCategory: "เพิ่มสมรรถนะกีฬา",
  goalDetail: "เพิ่มความฟิตสำหรับฟุตบอลและแบดมินตัน โดยเน้นการวิ่งเป็นหลัก",
  weeklyTrainingDays: 5,
  preferredRestDay: "Thursday",
  program: "Sport Endurance",
  avatar: ""
};

const recommendedWeeklyPlan = [
  { day: "วันจันทร์", title: "Easy Run + Core", activityCategory: "Running", activityName: "Easy Run", intensity: "Low", note: "วิ่ง Zone 2 และฝึกแกนกลางลำตัว" },
  { day: "วันอังคาร", title: "Strength Training", activityCategory: "Strength", activityName: "Strength Training", intensity: "Medium", note: "เสริมขา สะโพก ลำตัว และช่วงบน" },
  { day: "วันพุธ", title: "ฟุตบอล", activityCategory: "Team Sport", activityName: "ฟุตบอล", intensity: "High", note: "เตะฟุตบอล 1-2 ชั่วโมง" },
  { day: "วันพฤหัสบดี", title: "Recovery Run / Rest", activityCategory: "Mobility / Recovery", activityName: "Recovery", intensity: "Low", note: "วิ่งฟื้นตัวเบามาก หรือ Mobility" },
  { day: "วันศุกร์", title: "Speed Run / Interval", activityCategory: "Running", activityName: "Interval Run", intensity: "High", note: "วิ่งเร็วเป็นช่วง ลดความหนักถ้าขาหนัก" },
  { day: "วันเสาร์", title: "Long Run", activityCategory: "Running", activityName: "Long Run", intensity: "Medium", note: "เพิ่มความอึดในการวิ่งแบบค่อยเป็นค่อยไป" },
  { day: "วันอาทิตย์", title: "แบดมินตัน", activityCategory: "Racket Sport", activityName: "แบดมินตัน", intensity: "Medium", note: "ตีแบดมินตัน 1-2 ชั่วโมง" }
];

const emptyWeeklyPlan = [
  { day: "วันจันทร์", title: "", activityCategory: "Other", activityName: "", intensity: "Low", note: "" },
  { day: "วันอังคาร", title: "", activityCategory: "Other", activityName: "", intensity: "Low", note: "" },
  { day: "วันพุธ", title: "", activityCategory: "Other", activityName: "", intensity: "Low", note: "" },
  { day: "วันพฤหัสบดี", title: "", activityCategory: "Other", activityName: "", intensity: "Low", note: "" },
  { day: "วันศุกร์", title: "", activityCategory: "Other", activityName: "", intensity: "Low", note: "" },
  { day: "วันเสาร์", title: "", activityCategory: "Other", activityName: "", intensity: "Low", note: "" },
  { day: "วันอาทิตย์", title: "", activityCategory: "Other", activityName: "", intensity: "Low", note: "" }
];

const state = {
  userProfile: loadProfile(),
  workouts: loadWorkouts(),
  weeklyPlan: loadWeeklyPlan(),
  recommendedPlan: [],
  personalRecords: {},
  coachRecommendations: [],
  coachNudge: null,
  lineCoach: loadLineCoach()
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

document.addEventListener("DOMContentLoaded", () => {
  $("#dateInput").value = formatDate(new Date());
  bindEvents();
  initializeLineCoach();
  render();
  if (!isProfileComplete(state.userProfile)) showPage("profile");
  registerServiceWorker();
});

function bindEvents() {
  $$(".nav-item, [data-page]").forEach((button) => {
    button.addEventListener("click", () => showPage(button.dataset.page));
  });

  $("#profileShortcut").addEventListener("click", () => showPage("profile"));
  $("#activityCategoryInput").addEventListener("change", () => {
    suggestActivityName();
    toggleDistanceField();
  });
  $("#rpeInput").addEventListener("input", () => {
    $("#rpeValue").textContent = `${$("#rpeInput").value} / 10`;
  });
  ["#profileHeightInput", "#profileWeightInput"].forEach((selector) => {
    $(selector).addEventListener("input", renderProfileGuidance);
  });
  $("#profileProgramInput").addEventListener("change", renderProgramDescription);
  $("#profileGoalCategoryInput").addEventListener("change", updateGoalDetailRequirement);
  ["#profileRunningLevelInput", "#profileTrainingDaysInput", "#profileGoalDetailInput"].forEach((selector) => {
    $(selector).addEventListener("input", renderProfileGuidance);
    $(selector).addEventListener("change", renderProfileGuidance);
  });
  $("#profileForm").addEventListener("submit", saveProfileFromForm);
  $("#workoutForm").addEventListener("submit", saveWorkoutFromForm);
  $("#savePlanBtn").addEventListener("click", savePlanFromEditor);
  $("#resetPlanBtn").addEventListener("click", resetWeeklyPlan);
  $("#applyRecommendedPlanBtn").addEventListener("click", applyRecommendedPlan);
  $("#coachNudgeClose").addEventListener("click", dismissCoachNudge);
  $("#coachNudgeAction").addEventListener("click", handleCoachNudgeAction);
  $("#clearWorkoutsBtn").addEventListener("click", clearWorkouts);
  $("#exportDataBtn").addEventListener("click", exportData);
  $("#importDataBtn").addEventListener("click", () => $("#importFileInput").click());
  $("#importFileInput").addEventListener("change", importData);
  $("#chooseAvatarBtn").addEventListener("click", () => $("#avatarInput").click());
  $("#removeAvatarBtn").addEventListener("click", removeAvatar);
  $("#avatarInput").addEventListener("change", handleAvatarUpload);
  $("#detectLineProfileBtn").addEventListener("click", detectLineProfile);
  $("#lineLoginBtn").addEventListener("click", startLineLogin);
  $("#registerLineCoachBtn").addEventListener("click", registerLineCoach);
}

function loadProfile() {
  const stored = readJson(STORAGE_KEYS.userProfile);
  if (stored) return normalizeProfile({ ...defaultProfile, ...stored });

  const legacy = readJson(legacyKeys.profile);
  if (legacy) {
    return normalizeProfile({
      ...defaultProfile,
      name: legacy.name || defaultProfile.name,
      age: Number(legacy.age || defaultProfile.age),
      height: Number(legacy.height || defaultProfile.height),
      weight: Number(legacy.weight || defaultProfile.weight),
      goalCategory: mapLegacyGoal(legacy.goal),
      goalDetail: legacy.goal || defaultProfile.goalDetail,
      program: legacy.program || defaultProfile.program,
      avatar: legacy.avatar || ""
    });
  }

  return { ...defaultProfile };
}

function loadWorkouts() {
  const stored = readJson(STORAGE_KEYS.workouts);
  if (Array.isArray(stored)) return stored.map(normalizeWorkout);

  const legacy = readJson(legacyKeys.workouts);
  if (Array.isArray(legacy)) return legacy.map(normalizeWorkout);

  return [];
}

function loadWeeklyPlan() {
  const stored = readJson(STORAGE_KEYS.weeklyPlan);
  if (Array.isArray(stored) && stored.length === 7) return stored.map(normalizePlanItem);

  const legacy = readJson(legacyKeys.plan);
  if (Array.isArray(legacy) && legacy.length === 7) return legacy.map(normalizePlanItem);

  return emptyWeeklyPlan.map((item) => ({ ...item }));
}

function loadLineCoach() {
  const stored = readJson(STORAGE_KEYS.lineCoach) || {};
  return {
    webAppUrl: stored.webAppUrl || INTEGRATION_CONFIG.appsScriptWebAppUrl,
    liffId: stored.liffId || INTEGRATION_CONFIG.liffId,
    userId: stored.userId || "",
    displayName: stored.displayName || "",
    proteinTarget: stored.proteinTarget || 100,
    waterTarget: stored.waterTarget || 2,
    stepTarget: stored.stepTarget || 6000,
    sleepTarget: stored.sleepTarget || 7,
    registered: Boolean(stored.registered),
    lastSyncedAt: stored.lastSyncedAt || ""
  };
}

function readJson(key) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

function persist() {
  state.personalRecords = calculatePersonalRecords(state.workouts);
  state.coachRecommendations = buildCoachRecommendations();
  state.coachNudge = buildCoachNudge();
  localStorage.setItem(STORAGE_KEYS.userProfile, JSON.stringify(state.userProfile));
  localStorage.setItem(STORAGE_KEYS.workouts, JSON.stringify(state.workouts));
  localStorage.setItem(STORAGE_KEYS.weeklyPlan, JSON.stringify(state.weeklyPlan));
  localStorage.setItem(STORAGE_KEYS.lineCoach, JSON.stringify(state.lineCoach));
  localStorage.setItem(STORAGE_KEYS.personalRecords, JSON.stringify(state.personalRecords));
  localStorage.setItem(STORAGE_KEYS.coachRecommendations, JSON.stringify(state.coachRecommendations));
  localStorage.setItem(STORAGE_KEYS.coachNudge, JSON.stringify(state.coachNudge));
}

function render() {
  state.workouts.sort((a, b) => new Date(b.date) - new Date(a.date));
  persist();
  renderProfile();
  renderDashboard();
  renderPlan();
  renderPlanEditor();
  renderRecommendedPlan();
  renderWorkoutLists();
  renderRunningStats();
  renderSportTracker();
  renderCoach();
  renderCoachNudge();
  renderBmiPreview();
  renderProgramDescription();
  toggleDistanceField();
}

function showPage(pageId) {
  if (!pageId) return;
  $$(".page").forEach((page) => page.classList.toggle("active", page.id === pageId));
  $$(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.page === pageId));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function saveProfileFromForm(event) {
  event.preventDefault();
  if ($("#profileGoalCategoryInput").value === "กำหนดเอง" && !$("#profileGoalDetailInput").value.trim()) {
    window.alert("กรุณาระบุ Goal Detail เมื่อเลือกเป้าหมายแบบกำหนดเอง");
    $("#profileGoalDetailInput").focus();
    return;
  }
  saveLineCoachDraftFromInputs();

  state.userProfile = {
    ...state.userProfile,
    name: $("#profileNameInput").value.trim() || "Athlete",
    age: Number($("#profileAgeInput").value || 0),
    height: Number($("#profileHeightInput").value || 0),
    weight: Number($("#profileWeightInput").value || 0),
    runningLevel: $("#profileRunningLevelInput").value,
    goalCategory: $("#profileGoalCategoryInput").value,
    goalDetail: $("#profileGoalDetailInput").value.trim(),
    weeklyTrainingDays: Number($("#profileTrainingDaysInput").value || 1),
    preferredRestDay: $("#profileRestDayInput").value,
    program: $("#profileProgramInput").value
  };
  render();
  showPage("dashboard");
}

function updateGoalDetailRequirement() {
  const isCustom = $("#profileGoalCategoryInput").value === "กำหนดเอง";
  $("#profileGoalDetailInput").required = isCustom;
  $("#goalDetailField").classList.toggle("required-field", isCustom);
}

function formatGoal(profile) {
  const category = profile.goalCategory || legacyGoalLabels[profile.mainGoal] || "สุขภาพทั่วไป";
  const detail = profile.goalDetail ? `: ${profile.goalDetail}` : "";
  return `${category}${detail}`;
}

function normalizeProfile(profile) {
  const goalCategory = profile.goalCategory || legacyGoalLabels[profile.mainGoal] || "สุขภาพทั่วไป";
  return {
    ...defaultProfile,
    ...profile,
    goalCategory,
    goalDetail: profile.goalDetail || profile.mainGoal || defaultProfile.goalDetail
  };
}

function saveWorkoutFromForm(event) {
  event.preventDefault();
  const activityCategory = $("#activityCategoryInput").value;
  const workout = normalizeWorkout({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    date: $("#dateInput").value,
    activityCategory,
    activityName: $("#activityNameInput").value.trim(),
    duration: Number($("#durationInput").value || 0),
    distance: activityCategory === "Running" ? Number($("#distanceInput").value || 0) : 0,
    intensity: $("#intensityInput").value,
    rpe: Number($("#rpeInput").value || 5),
    feeling: $("#feelingInput").value,
    note: $("#noteInput").value.trim()
  });

  state.workouts.unshift(workout);
  $("#workoutForm").reset();
  $("#dateInput").value = formatDate(new Date());
  $("#rpeInput").value = 5;
  $("#rpeValue").textContent = "5 / 10";
  render();
  showPage("dashboard");
}

function renderProfile() {
  const profile = state.userProfile;
  const bmi = calculateBmi(profile.height, profile.weight);
  const complete = isProfileComplete(profile);
  $("#appBrandTitle").textContent = complete ? `${profile.name} Fit` : "NutFit V2";
  $("#headerProfileName").textContent = complete ? profile.name : "Setup";
  $("#headerProfileAge").textContent = profile.age ? String(profile.age) : "-";
  $("#dashboardBmi").textContent = bmi ? `${bmi.toFixed(1)} ${bmiCategoryShort(bmi)}` : "Setup";
  $("#dashboardGoal").textContent = formatGoal(profile);
  $("#setupPrompt").classList.toggle("hidden", complete);

  $("#profileNameInput").value = profile.name || "";
  $("#profileAgeInput").value = profile.age || "";
  $("#profileHeightInput").value = profile.height || "";
  $("#profileWeightInput").value = profile.weight || "";
  $("#profileRunningLevelInput").value = profile.runningLevel || "Beginner";
  $("#profileGoalCategoryInput").value = profile.goalCategory || "สุขภาพทั่วไป";
  $("#profileGoalDetailInput").value = profile.goalDetail || "";
  $("#profileTrainingDaysInput").value = profile.weeklyTrainingDays || 5;
  $("#profileRestDayInput").value = profile.preferredRestDay || "Thursday";
  $("#profileProgramInput").value = profile.program || "Balanced Fitness";
  renderLineCoach();
  updateGoalDetailRequirement();
  renderAvatar();
  renderProfileGuidance();
}

function renderLineCoach() {
  const coach = state.lineCoach;

  $("#coachWebAppUrlInput").value = coach.webAppUrl || "";
  $("#liffIdInput").value = coach.liffId || "";
  $("#lineUserIdInput").value = coach.userId || "";
  $("#lineDisplayNameInput").value = coach.displayName || "";
  $("#proteinTargetInput").value = coach.proteinTarget || "";
  $("#waterTargetInput").value = coach.waterTarget || "";
  $("#stepTargetInput").value = coach.stepTarget || "";
  $("#sleepTargetInput").value = coach.sleepTarget || "";

  const connected = Boolean(coach.registered && coach.userId);
  $("#lineCoachBadge").textContent = connected ? "Connected" : "Offline";
  $("#lineCoachBadge").classList.toggle("connected", connected);

  if (connected) {
    $("#lineCoachStatusText").textContent = `เชื่อม Daily Coach แล้ว${coach.lastSyncedAt ? ` อัปเดตล่าสุด ${coach.lastSyncedAt}` : ""}`;
  }
}

async function initializeLineCoach() {
  applyLineCoachQueryParams();

  if (!state.lineCoach.liffId || !window.liff) {
    renderLineCoachStatus("ใส่ LIFF ID แล้วกดเปิด LINE Login เพื่อดึง userId จริงจาก LINE");
    return;
  }

  try {
    await liff.init({ liffId: state.lineCoach.liffId });

    if (!liff.isLoggedIn()) {
      renderLineCoachStatus("พร้อม login ผ่าน LINE แล้ว");
      return;
    }

    await detectLineProfile();
  } catch (error) {
    renderLineCoachStatus("เชื่อม LIFF ไม่สำเร็จ: " + error.message);
  }
}

function applyLineCoachQueryParams() {
  const params = new URLSearchParams(window.location.search);
  const webAppUrl = params.get("gasUrl") || params.get("webAppUrl");
  const liffId = params.get("liffId");
  const userId = params.get("lineUserId") || params.get("userId");

  if (webAppUrl) state.lineCoach.webAppUrl = webAppUrl;
  if (liffId) state.lineCoach.liffId = liffId;
  if (userId) state.lineCoach.userId = userId;
}

async function detectLineProfile() {
  saveLineCoachDraftFromInputs();

  if (!window.liff || !state.lineCoach.liffId) {
    renderLineCoachStatus("กรุณาใส่ LIFF ID ก่อน แล้วกดเปิด LINE Login");
    renderLineCoach();
    return;
  }

  try {
    if (!liff.isLoggedIn()) {
      startLineLogin();
      return;
    }

    const profile = await liff.getProfile();
    state.lineCoach.userId = profile.userId || state.lineCoach.userId;
    state.lineCoach.displayName = profile.displayName || state.lineCoach.displayName;
    state.userProfile.name = state.userProfile.name || profile.displayName || "";

    persist();
    renderLineCoach();
    renderLineCoachStatus("ดึงข้อมูล LINE profile สำเร็จ");
  } catch (error) {
    renderLineCoachStatus("ดึง LINE profile ไม่สำเร็จ: " + error.message);
  }
}

async function startLineLogin() {
  saveLineCoachDraftFromInputs();

  if (!state.lineCoach.liffId) {
    renderLineCoachStatus("กรุณาใส่ LIFF ID ก่อน");
    $("#liffIdInput").focus();
    return;
  }

  if (!window.liff) {
    renderLineCoachStatus("โหลด LIFF SDK ไม่สำเร็จ กรุณาเปิดผ่าน https หรือเช็ค internet");
    return;
  }

  try {
    await liff.init({ liffId: state.lineCoach.liffId });

    if (!liff.isLoggedIn()) {
      liff.login({ redirectUri: window.location.href });
      return;
    }

    await detectLineProfile();
  } catch (error) {
    renderLineCoachStatus("เปิด LINE Login ไม่สำเร็จ: " + error.message);
  }
}

async function registerLineCoach() {
  saveLineCoachDraftFromInputs();

  if (!state.lineCoach.webAppUrl) {
    renderLineCoachStatus("กรุณาใส่ Apps Script Web App URL ก่อน");
    $("#coachWebAppUrlInput").focus();
    return;
  }

  if (!state.lineCoach.userId) {
    renderLineCoachStatus("กรุณากดเปิด LINE Login แล้วดึงข้อมูล LINE ก่อน");
    $("#liffIdInput").focus();
    return;
  }

  if (!isValidLineUserId(state.lineCoach.userId)) {
    renderLineCoachStatus("LINE User ID ยังไม่ถูกต้อง ต้องได้จาก LIFF และขึ้นต้นด้วย U");
    $("#liffIdInput").focus();
    return;
  }

  const payload = {
    action: "registerUser",
    userId: state.lineCoach.userId,
    displayName: state.lineCoach.displayName,
    name: $("#profileNameInput").value.trim() || state.userProfile.name,
    goal: $("#profileGoalDetailInput").value.trim() || $("#profileGoalCategoryInput").value,
    weight: Number($("#profileWeightInput").value || state.userProfile.weight || 0),
    proteinTarget: Number(state.lineCoach.proteinTarget || 0),
    waterTarget: Number(state.lineCoach.waterTarget || 0),
    stepTarget: Number(state.lineCoach.stepTarget || 0),
    sleepTarget: Number(state.lineCoach.sleepTarget || 0)
  };

  $("#registerLineCoachBtn").disabled = true;
  renderLineCoachStatus("กำลังลงทะเบียน Daily Coach...");

  try {
    await fetch(state.lineCoach.webAppUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(payload)
    });

    state.lineCoach.registered = true;
    state.lineCoach.lastSyncedAt = new Date().toLocaleString("th-TH", {
      dateStyle: "short",
      timeStyle: "short"
    });

    persist();
    renderLineCoach();
    renderLineCoachStatus("ส่งข้อมูลลงทะเบียนแล้ว ตรวจชีต Users ใน Google Sheet ได้เลย");
  } catch (error) {
    renderLineCoachStatus("ลงทะเบียนไม่สำเร็จ: " + error.message);
  } finally {
    $("#registerLineCoachBtn").disabled = false;
  }
}

function saveLineCoachDraftFromInputs() {
  state.lineCoach = {
    ...state.lineCoach,
    webAppUrl: $("#coachWebAppUrlInput").value.trim(),
    liffId: $("#liffIdInput").value.trim(),
    userId: $("#lineUserIdInput").value.trim(),
    displayName: $("#lineDisplayNameInput").value.trim(),
    proteinTarget: Number($("#proteinTargetInput").value || 0),
    waterTarget: Number($("#waterTargetInput").value || 0),
    stepTarget: Number($("#stepTargetInput").value || 0),
    sleepTarget: Number($("#sleepTargetInput").value || 0)
  };

  persist();
}

function isValidLineUserId(userId) {
  return /^U[a-f0-9]{20,}$/i.test(String(userId || "").trim());
}

function renderLineCoachStatus(message) {
  const status = $("#lineCoachStatusText");

  if (status) {
    status.textContent = message;
  }
}

function renderAvatar() {
  const avatar = state.userProfile.avatar || "";
  const initial = (state.userProfile.name || "N").trim().charAt(0).toUpperCase();
  $("#avatarInitial").textContent = initial || "N";
  ["#headerAvatar", "#profileAvatarPreview"].forEach((selector) => {
    const image = $(selector);
    image.src = avatar || "";
    image.classList.toggle("visible", Boolean(avatar));
  });
}

function renderDashboard() {
  const week = getCurrentWeekWorkouts();
  const previousWeek = getPreviousWeekWorkouts();
  const load = calculateWeeklyLoad(week);
  const loadStatus = getLoadStatus(load);
  const recovery = getRecoveryStatus(load, average(week.map((item) => item.rpe)));
  const runDistance = sum(week.filter(isRunning).map((item) => item.distance));
  const duration = sum(week.map((item) => item.duration));
  const avgRpe = average(week.map((item) => item.rpe));
  const score = calculateTrainingScore(load, avgRpe, week.length);
  const doneDays = new Set(week.map((item) => item.date)).size;
  const targetDays = Math.max(1, Number(state.userProfile.weeklyTrainingDays || 1));
  const progress = Math.min(100, (doneDays / targetDays) * 100);

  $("#trainingScore").textContent = score;
  $("#scoreLabel").textContent = scoreLabel(score);
  $(".score-ring").style.setProperty("--score", `${score}%`);
  $("#weeklyLoad").textContent = Math.round(load);
  $("#loadStatus").textContent = loadStatusLabels[loadStatus] || loadStatus;
  $("#heroLoadChip").textContent = `โหลด ${Math.round(load)}`;
  $("#heroRecoveryChip").textContent = recoveryStatusLabels[recovery.status] || recovery.status;
  $("#weeklyDistance").textContent = `${runDistance.toFixed(1)} km`;
  $("#weeklyWorkouts").textContent = week.length;
  $("#weeklyDuration").textContent = `${duration} min`;
  $("#averageRpe").textContent = avgRpe ? avgRpe.toFixed(1) : "-";
  $("#recoveryStatusBadge").textContent = recoveryStatusLabels[recovery.status] || recovery.status;
  $("#recoveryMessage").textContent = recovery.message;
  renderDashboardInsight(load, avgRpe, doneDays, targetDays, recovery);
  $("#weeklyProgressText").textContent = `${doneDays} / ${targetDays} days`;
  $("#weeklyProgressBar").style.width = `${progress}%`;

  renderTodayAndNextWorkout();
  renderWorkoutCollection("#recentWorkouts", state.workouts.slice(0, 4), false);
  renderLoadSignals(week, previousWeek, load, avgRpe);
}

function renderDashboardInsight(load, avgRpe, doneDays, targetDays, recovery) {
  let title = "เริ่มต้นสัปดาห์นี้";
  let text = "บันทึก Workout เพื่อให้ระบบวิเคราะห์แนวโน้มและให้คำแนะนำที่ตรงขึ้น";

  if (recovery.status === "Overloaded") {
    title = "ร่างกายอาจล้าสะสม";
    text = "โหลดหรือ RPE สูงกว่าปกติ วันนี้ควรเลือก Recovery หรือ Mobility มากกว่าซ้อมหนัก";
  } else if (doneDays >= targetDays) {
    title = "ทำครบเป้าหมายแล้ว";
    text = "สัปดาห์นี้คุณทำได้ตามเป้าแล้ว รักษาความสม่ำเสมอและให้ร่างกายฟื้นตัว";
  } else if (targetDays - doneDays === 1) {
    title = "อีกนิดเดียวถึงเป้า";
    text = "เหลืออีก 1 วันซ้อมก็ครบเป้าหมาย ลองเลือกกิจกรรมเบาถึงปานกลาง";
  } else if (load >= 81) {
    title = "โหลดกำลังพัฒนา";
    text = "สัปดาห์นี้เริ่มมีคุณภาพแล้ว อย่าลืมวางวันเบาเพื่อให้ร่างกายซึมซับการซ้อม";
  } else if (load >= 41) {
    title = "โหลดสมดุลดี";
    text = "จังหวะการซ้อมกำลังดี สามารถเดินตามแผนและคุม RPE ให้อยู่ในระดับเหมาะสม";
  } else if (avgRpe && avgRpe <= 5) {
    title = "พร้อมเพิ่มความต่อเนื่อง";
    text = "RPE ยังไม่สูงมาก เหมาะกับการเพิ่ม Easy Session เพื่อสร้างความสม่ำเสมอ";
  }

  $("#dashboardInsightTitle").textContent = title;
  $("#dashboardInsightText").textContent = text;
}

function renderTodayAndNextWorkout() {
  const todayIndex = getPlanIndex(new Date());
  const today = state.weeklyPlan[todayIndex];
  const nextIndex = (todayIndex + 1) % 7;
  const next = state.weeklyPlan[nextIndex];
  const todayLogged = getCurrentWeekWorkouts().some((item) => item.date === formatDate(new Date()));

  $("#todayBadge").textContent = todayLogged ? "บันทึกแล้ว" : "ตามแผน";
  $("#todayWorkout").innerHTML = workoutPlanMarkup(today);
  $("#nextWorkoutDay").textContent = next.day;
  $("#nextWorkout").innerHTML = workoutPlanMarkup(next);
}

function workoutPlanMarkup(item) {
  if (!item.title && !item.activityName && !item.note) {
    return `
      <div class="mini-line"><strong>ยังไม่ได้กำหนดแผน</strong><span>${item.day}</span></div>
      <div class="mini-line"><span>ไปที่หน้าแผนเพื่อเพิ่มกิจกรรมวันนี้</span><span>＋</span></div>
    `;
  }
  return `
    <div class="mini-line"><strong>${escapeHtml(item.title || item.activityName || "ยังไม่ได้กำหนดแผน")}</strong><span>${item.day}</span></div>
    <div class="mini-line"><span>${escapeHtml(item.note)}</span><span>${categoryIcons[item.activityCategory] || "•"}</span></div>
  `;
}

function renderPlan() {
  const todayIndex = getPlanIndex(new Date());
  $("#planCards").innerHTML = state.weeklyPlan.map((item, index) => `
    <article class="plan-card ${index === todayIndex ? "today" : ""}">
      <div class="plan-icon">${categoryIcons[item.activityCategory] || "•"}</div>
      <div>
        <p>${item.day}</p>
        <h3>${escapeHtml(item.title || "ยังไม่ได้กำหนดแผน")}</h3>
        <p>${escapeHtml(item.note || "เพิ่มกิจกรรมในตัวแก้ไขแผนด้านล่าง")}</p>
      </div>
      <span class="badge">${categoryLabels[item.activityCategory] || item.activityCategory}</span>
    </article>
  `).join("");
}

function renderPlanEditor() {
  $("#planEditor").innerHTML = state.weeklyPlan.map((item, index) => `
    <div class="plan-edit-row">
      <div class="plan-edit-day">${item.day}</div>
      <label>กิจกรรม
        <input data-plan-index="${index}" data-plan-field="title" type="text" value="${escapeAttribute(item.title)}">
      </label>
      <label>หมวดกิจกรรม
        <select data-plan-index="${index}" data-plan-field="activityCategory">
          ${Object.keys(categoryLabels).map((category) => `<option value="${category}" ${item.activityCategory === category ? "selected" : ""}>${categoryLabels[category]}</option>`).join("")}
        </select>
      </label>
      <label>ชื่อกิจกรรม / กีฬา
        <input data-plan-index="${index}" data-plan-field="activityName" type="text" value="${escapeAttribute(item.activityName)}">
      </label>
      <label>ความหนัก
        <select data-plan-index="${index}" data-plan-field="intensity">
          ${Object.keys(intensityFactors).map((level) => `<option value="${level}" ${item.intensity === level ? "selected" : ""}>${intensityLabels[level]}</option>`).join("")}
        </select>
      </label>
      <label>รายละเอียด
        <input data-plan-index="${index}" data-plan-field="note" type="text" value="${escapeAttribute(item.note)}">
      </label>
    </div>
  `).join("");
}

function renderRecommendedPlan() {
  const recommendation = buildRecommendedPlan(state.userProfile);
  state.recommendedPlan = recommendation.plan;

  $("#recommendedPlanTitle").textContent = recommendation.title;
  $("#recommendedPlanSummary").textContent = recommendation.summary;
  $("#recommendedPlanTags").innerHTML = recommendation.tags
    .map((tag) => `<span>${escapeHtml(tag)}</span>`)
    .join("");
  $("#recommendedPlanCards").innerHTML = recommendation.plan.map((item) => `
    <article class="plan-card">
      <div class="plan-icon">${categoryIcons[item.activityCategory] || "•"}</div>
      <div>
        <p>${item.day}</p>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.note)}</p>
      </div>
      <span class="badge">${intensityLabels[item.intensity] || item.intensity}</span>
    </article>
  `).join("");
  $("#recommendedPlanPrinciples").innerHTML = recommendation.principles.map((text) => `
    <div class="recommendation-item">
      <div>
        <strong>${escapeHtml(text.title)}</strong>
        <small>${escapeHtml(text.detail)}</small>
      </div>
    </div>
  `).join("");
}

function buildRecommendedPlan(profile) {
  const bmi = calculateBmi(profile.height, profile.weight);
  const category = profile.goalCategory || "สุขภาพทั่วไป";
  const level = profile.runningLevel || "Beginner";
  const targetDays = Math.max(1, Math.min(7, Number(profile.weeklyTrainingDays || 4)));
  const restDay = profile.preferredRestDay || "Thursday";
  const plan = emptyWeeklyPlan.map((item) => ({ ...item }));
  const principles = [];
  const tags = [];

  const setDay = (day, title, activityCategory, activityName, intensity, note) => {
    const index = plan.findIndex((item) => item.day === day || translateDayToEnglish(item.day) === day);
    if (index >= 0) {
      plan[index] = { ...plan[index], title, activityCategory, activityName, intensity, note };
    }
  };

  setDay(translateEnglishDayToThai(restDay), "พัก / Recovery", "Mobility / Recovery", "Recovery", "Low", "วันพักหลักของสัปดาห์ เน้นยืดเหยียด เดินเบา หรือพักเต็ม");

  if (category === "ลดไขมัน / คุมน้ำหนัก") {
    setDay("วันจันทร์", "Zone 2 Cardio", "Running", "Easy Run", "Low", "คาร์ดิโอเบา 30-45 นาที เพื่อเผาผลาญและสร้างฐาน");
    setDay("วันอังคาร", "Strength Training", "Strength", "เวท / Strength", "Medium", "เวททั้งตัว เน้นท่าพื้นฐานและกล้ามเนื้อใหญ่");
    setDay("วันพฤหัสบดี", "Low Impact Cardio", "Cardio", "เดินเร็ว / ปั่นจักรยาน", "Low", "คาร์ดิโอแรงกระแทกต่ำ 30-45 นาที");
    setDay("วันเสาร์", "Long Easy Session", "Running", "Easy Long Run", "Low", "เพิ่มเวลาคาร์ดิโอแบบคุมความหนัก");
    tags.push("ลดไขมัน", "Zone 2", "Strength");
  } else if (category === "วิ่งระยะสั้น") {
    setDay("วันจันทร์", "Easy Run", "Running", "Easy Run", "Low", "วิ่งเบาเพื่อสร้างฐานและฟื้นตัว");
    setDay("วันพุธ", "Speed / Interval", "Running", "Interval Run", "High", "วิ่งเร็วเป็นช่วงสั้น เน้นคุณภาพมากกว่าปริมาณ");
    setDay("วันศุกร์", "Strength + Core", "Strength", "Strength Training", "Medium", "เสริมขา สะโพก และแกนกลางลำตัว");
    setDay("วันเสาร์", "Short Tempo", "Running", "Tempo Run", "Medium", "วิ่งคุม pace ระยะสั้นถึงกลาง");
    tags.push("Speed", "5K", "Interval");
  } else if (category === "วิ่งระยะกลาง") {
    setDay("วันจันทร์", "Easy Run", "Running", "Easy Run", "Low", "วิ่งเบาสร้างฐาน");
    setDay("วันพุธ", "Tempo Run", "Running", "Tempo Run", "Medium", "วิ่งคุม pace เพื่อพัฒนาความทนทาน");
    setDay("วันศุกร์", "Strength Training", "Strength", "Strength Training", "Medium", "เสริมกล้ามเนื้อกันเจ็บ");
    setDay("วันเสาร์", "Long Run", "Running", "Long Run", "Medium", "วิ่งยาวแบบค่อยเป็นค่อยไป");
    tags.push("10K", "Tempo", "Long Run");
  } else if (category === "วิ่งระยะไกล") {
    setDay("วันจันทร์", "Recovery Run", "Running", "Recovery Run", "Low", "วิ่งฟื้นตัวเบา ๆ");
    setDay("วันพุธ", "Easy Run", "Running", "Easy Run", "Low", "เพิ่มระยะสะสมแบบไม่หนัก");
    setDay("วันศุกร์", "Strength + Mobility", "Strength", "Strength Training", "Medium", "เสริมแรงและขยับข้อต่อ");
    setDay("วันเสาร์", "Long Run", "Running", "Long Run", "Medium", "วันหลักของเป้าหมายระยะไกล");
    tags.push("Long Run", "Recovery", "Endurance");
  } else if (category === "เพิ่มสมรรถนะกีฬา") {
    setDay("วันจันทร์", "Easy Run", "Running", "Easy Run", "Low", "สร้างฐานแอโรบิกเพื่อให้เล่นกีฬาได้นานขึ้น");
    setDay("วันอังคาร", "Strength + Agility", "Strength", "Strength & Agility", "Medium", "เสริมขา สะโพก แกนกลาง และเปลี่ยนทิศทาง");
    setDay("วันพุธ", "Sport Session", "Team Sport", "กีฬาหลัก", "High", "เล่นกีฬาหลักของคุณ คุม RPE ไม่ให้สูงทุกครั้ง");
    setDay("วันศุกร์", "Speed Endurance", "Running", "Interval Run", "Medium", "วิ่งเร็วแบบคุมโหลด เพื่อเพิ่มความอึด");
    setDay("วันอาทิตย์", "Skill / Sport", "Racket Sport", "กีฬาเสริม", "Medium", "ซ้อมทักษะหรือกีฬาเสริม");
    tags.push("Agility", "Strength", "Sport stamina");
  } else if (category === "ฟื้นฟูร่างกาย") {
    setDay("วันจันทร์", "Mobility", "Mobility / Recovery", "Mobility", "Low", "ขยับเบา ๆ และยืดเหยียด");
    setDay("วันพุธ", "Easy Cardio", "Cardio", "เดินเร็ว / จักรยาน", "Low", "คาร์ดิโอเบาแบบไม่เร่ง");
    setDay("วันศุกร์", "Strength Rehab", "Strength", "เวทเบา", "Low", "เสริมแรงพื้นฐานแบบควบคุมท่า");
    tags.push("Recovery", "Low intensity", "Mobility");
  } else {
    setDay("วันจันทร์", "Easy Cardio", "Running", "Easy Run", "Low", "เริ่มสัปดาห์ด้วยการซ้อมเบา");
    setDay("วันพุธ", "Strength Training", "Strength", "Strength Training", "Medium", "เสริมกล้ามเนื้อและความแข็งแรงพื้นฐาน");
    setDay("วันศุกร์", "Cardio / Sport", "Cardio", "คาร์ดิโอหรือกีฬาที่ชอบ", "Medium", "เลือกกิจกรรมที่ทำได้ต่อเนื่อง");
    setDay("วันเสาร์", "Long Easy Activity", "Cardio", "กิจกรรมเบาแบบยาว", "Low", "เพิ่มเวลาออกกำลังแบบไม่เร่ง");
    tags.push("สุขภาพทั่วไป", "Consistency", "Recovery");
  }

  if (level === "Beginner") {
    tags.push("เริ่มต้น");
    principles.push({ title: "เริ่มเบา", detail: "ถ้าเพิ่งเริ่ม ให้ตัด session หนักออกก่อน และคุม RPE ไม่เกิน 6-7" });
  }
  if (bmi >= 25) {
    tags.push("แรงกระแทกต่ำ");
    principles.push({ title: "ลดแรงกระแทก", detail: "ถ้า BMI ค่อนข้างสูง ให้ใช้เดินเร็ว จักรยาน หรือคาร์ดิโอเบาแทนการวิ่งหนักบ่อย ๆ" });
  }
  if (targetDays <= 3) {
    principles.push({ title: "เวลาซ้อมจำกัด", detail: "เลือก 3 session ที่สำคัญที่สุด: คาร์ดิโอ 1-2 วัน และ Strength 1 วัน" });
  } else if (targetDays >= 6) {
    principles.push({ title: "มีวันซ้อมเยอะ", detail: "อย่าให้ทุกวันเป็นวันหนัก ควรมี Recovery หรือ Low intensity อย่างน้อย 1-2 วัน" });
  }
  principles.push({ title: "ปรับตามร่างกาย", detail: "ถ้า RPE สูงต่อเนื่องหรือรู้สึกล้า ให้ลดความหนักก่อนเพิ่มปริมาณ" });

  return {
    title: `แผนแนะนำสำหรับ ${category}`,
    summary: `แผนนี้สร้างจาก BMI, เป้าหมาย, ระดับการวิ่ง และจำนวนวันซ้อมของคุณ เพื่อใช้เป็นแนวทางเริ่มต้น สามารถกดใช้แผนนี้แล้วแก้ไขต่อได้`,
    tags: [...new Set(tags)].slice(0, 6),
    plan: limitPlanToTrainingDays(plan, targetDays, restDay),
    principles
  };
}

function limitPlanToTrainingDays(plan, targetDays, restDay) {
  let activeCount = plan.filter((item) => item.title && translateDayToEnglish(item.day) !== restDay).length;
  if (activeCount <= targetDays) return plan;

  return plan.map((item) => {
    if (!item.title || translateDayToEnglish(item.day) === restDay) return item;
    if (activeCount > targetDays && item.intensity === "Low") {
      activeCount -= 1;
      return { ...item, title: "", activityCategory: "Other", activityName: "", note: "" };
    }
    return item;
  });
}

function applyRecommendedPlan() {
  if (!state.recommendedPlan.length) return;
  if (!window.confirm("นำแผนแนะนำไปใช้แทนแผนรายสัปดาห์ปัจจุบันหรือไม่?")) return;
  state.weeklyPlan = state.recommendedPlan.map((item) => ({ ...item }));
  render();
  showPage("plan");
}

function savePlanFromEditor() {
  const next = state.weeklyPlan.map((item) => ({ ...item }));
  $$("[data-plan-index]").forEach((input) => {
    const index = Number(input.dataset.planIndex);
    const field = input.dataset.planField;
    next[index][field] = input.value.trim();
  });
  state.weeklyPlan = next.map(normalizePlanItem);
  render();
}

function resetWeeklyPlan() {
  if (!window.confirm("ล้างแผนรายสัปดาห์ทั้งหมดเพื่อเริ่มใช้งานจริงหรือไม่?")) return;
  state.weeklyPlan = emptyWeeklyPlan.map((item) => ({ ...item }));
  render();
}

function renderWorkoutLists() {
  renderWorkoutCollection("#allWorkouts", state.workouts, true);
}

function renderWorkoutCollection(selector, list, allowDelete) {
  const container = $(selector);
  if (!list.length) {
    container.innerHTML = `<div class="empty-state">ยังไม่มีข้อมูล Workout</div>`;
    return;
  }

  container.innerHTML = list.map((workout) => `
    <div class="workout-item">
      <div>
        <strong>${categoryIcons[workout.activityCategory] || "•"} ${escapeHtml(workout.activityName || categoryLabels[workout.activityCategory] || workout.activityCategory)}</strong>
        <small>${formatDisplayDate(workout.date)} • ${workout.duration} นาที${isRunning(workout) ? ` • ${workout.distance.toFixed(1)} กม.` : ""}</small>
        <small class="${workout.intensity.toLowerCase()}">${intensityLabels[workout.intensity] || workout.intensity} • RPE ${workout.rpe}/10 • ${feelingLabels[workout.feeling] || workout.feeling}</small>
        ${workout.note ? `<small>${escapeHtml(workout.note)}</small>` : ""}
      </div>
      ${allowDelete ? `<button class="delete-btn" type="button" onclick="deleteWorkout('${workout.id}')" title="ลบ Workout">×</button>` : ""}
    </div>
  `).join("");
}

function renderRunningStats() {
  const runs = state.workouts.filter(isRunning);
  const totalDistance = sum(runs.map((item) => item.distance));
  const totalDuration = sum(runs.map((item) => item.duration));
  const avgPace = totalDistance ? totalDuration / totalDistance : 0;
  const records = state.personalRecords;

  $("#runTotalDistance").textContent = `${totalDistance.toFixed(1)} km`;
  $("#runAveragePace").textContent = avgPace ? formatPace(avgPace) : "-";
  $("#runLongest").textContent = records.longestRun ? `${records.longestRun.distance.toFixed(1)} km` : "0 km";
  $("#runFastest5k").textContent = records.fastest5k ? formatMinutes(records.fastest5k.minutes) : "-";
  $("#prFastest1k").textContent = records.fastest1k ? formatPace(records.fastest1k.pace) : "-";
  $("#prFastest5k").textContent = records.fastest5k ? formatMinutes(records.fastest5k.minutes) : "-";
  $("#prLongestRun").textContent = records.longestRun ? `${records.longestRun.distance.toFixed(1)} km` : "-";
  renderWeeklyChart();
}

function renderWeeklyChart() {
  const start = getWeekStart(new Date());
  const distances = state.weeklyPlan.map((_, index) => {
    const date = formatDate(addDays(start, index));
    return sum(state.workouts.filter((item) => item.date === date && isRunning(item)).map((item) => item.distance));
  });
  const max = Math.max(...distances, 1);
  $("#weeklyChart").innerHTML = distances.map((distance, index) => `
    <div class="bar">
      <div class="bar-fill" style="height:${Math.max((distance / max) * 140, 8)}px"></div>
      <span>${state.weeklyPlan[index].day.slice(0, 3)}</span>
      <span>${distance.toFixed(1)}</span>
    </div>
  `).join("");
}

function renderSportTracker() {
  const monthKey = formatDate(new Date()).slice(0, 7);
  const plannedSports = state.weeklyPlan
    .filter((item) => item.activityCategory && item.activityCategory !== "Running")
    .map((item) => getActivityKey(item));
  const loggedSports = state.workouts
    .filter((item) => item.activityCategory && item.activityCategory !== "Running")
    .map((item) => getActivityKey(item));
  const sports = [...new Set([...plannedSports, ...loggedSports])];

  if (!sports.length) {
    $("#sportSummary").innerHTML = `<div class="empty-state">ยังไม่มีข้อมูลกีฬาเสริม</div>`;
    return;
  }

  $("#sportSummary").innerHTML = sports.map((key) => {
    const monthly = state.workouts.filter((item) => getActivityKey(item) === key && item.date.startsWith(monthKey));
    const sample = monthly[0] || state.weeklyPlan.find((item) => getActivityKey(item) === key) || {};
    const avgDuration = average(monthly.map((item) => item.duration));
    const avgRpe = average(monthly.map((item) => item.rpe));
    const label = sample.activityName || categoryLabels[sample.activityCategory] || key;
    const icon = categoryIcons[sample.activityCategory] || "•";
    return `
      <div class="sport-row">
        <div>
          <strong>${icon} ${escapeHtml(label)}</strong>
          <small>${monthly.length} ครั้งในเดือนนี้</small>
        </div>
        <div>
          <strong>${avgDuration ? Math.round(avgDuration) : 0} นาที</strong>
          <small>RPE เฉลี่ย ${avgRpe ? avgRpe.toFixed(1) : "-"}</small>
        </div>
      </div>
    `;
  }).join("");
}

function renderCoach() {
  $("#coachRecommendations").innerHTML = state.coachRecommendations.map((item) => `
    <div class="recommendation-item">
      <div>
        <strong>${escapeHtml(item.title)}</strong>
        <small>${escapeHtml(item.text)}</small>
      </div>
    </div>
  `).join("");
}

function buildCoachNudge() {
  const today = formatDate(new Date());
  const week = getCurrentWeekWorkouts();
  const load = calculateWeeklyLoad(week);
  const avgRpe = average(week.map((item) => item.rpe));
  const targetDays = Math.max(1, Number(state.userProfile.weeklyTrainingDays || 1));
  const doneDays = new Set(week.map((item) => item.date)).size;
  const todayLogged = week.some((item) => item.date === today);
  const latestWorkout = state.workouts[0];
  const daysSinceLast = latestWorkout ? Math.floor((new Date(`${today}T00:00:00`) - new Date(`${latestWorkout.date}T00:00:00`)) / 86400000) : null;
  const remainingDays = Math.max(0, targetDays - doneDays);
  const goal = state.userProfile.goalCategory || "สุขภาพทั่วไป";

  if (load > 120 || avgRpe > 8) {
    return {
      date: today,
      type: "overload",
      title: "วันนี้ฟื้นตัวก่อนดีไหม",
      message: "โหลดหรือ RPE เริ่มสูงแล้ว การพักหรือ Recovery วันนี้อาจช่วยให้กลับมาซ้อมได้ดีขึ้น",
      actionPage: "coach"
    };
  }
  if (daysSinceLast !== null && daysSinceLast >= 3) {
    return {
      date: today,
      type: "comeback",
      title: "กลับมาแบบเบา ๆ ก็พอ",
      message: `ไม่ได้บันทึก Workout มา ${daysSinceLast} วันแล้ว ลองเริ่มจาก 15-20 นาทีเบา ๆ ก็ถือว่าเดินหน้าแล้ว`,
      actionPage: "add"
    };
  }
  if (doneDays >= targetDays) {
    return {
      date: today,
      type: "goal_done",
      title: "สัปดาห์นี้ทำครบเป้าแล้ว",
      message: "ยอดเยี่ยมมาก รักษาความสม่ำเสมอไว้ และอย่าลืมให้ร่างกายได้ฟื้นตัว",
      actionPage: "running"
    };
  }
  if (remainingDays === 1) {
    return {
      date: today,
      type: "near_goal",
      title: "อีกนิดเดียวก็ถึงเป้า",
      message: "เหลืออีก 1 วันซ้อมก็ครบเป้าหมายสัปดาห์นี้แล้ว ลองเลือกกิจกรรมที่ไม่หนักเกินไป",
      actionPage: "add"
    };
  }
  if (!todayLogged) {
    return {
      date: today,
      type: "today_missing",
      title: "วันนี้เริ่มสั้น ๆ ก็ได้",
      message: "ยังไม่มี Workout วันนี้ ลองเริ่มจากกิจกรรมเบา ๆ 15 นาที เพื่อรักษาจังหวะความสม่ำเสมอ",
      actionPage: "add"
    };
  }
  return {
    date: today,
    type: "goal_tip",
    title: "โฟกัสเป้าหมายของคุณ",
    message: buildGoalNudgeMessage(goal),
    actionPage: "recommend"
  };
}

function buildGoalNudgeMessage(goal) {
  if (goal === "ลดไขมัน / คุมน้ำหนัก") return "วันนี้เน้น Zone 2 หรือ Strength เบา ๆ จะช่วยสนับสนุนเป้าหมายคุมน้ำหนักได้ดี";
  if (goal === "วิ่งระยะสั้น") return "ถ้าวันนี้ขาสด ลองเพิ่ม stride หรือ interval สั้น ๆ แต่ถ้าล้าให้เลือก Easy Run";
  if (goal === "วิ่งระยะไกล") return "เป้าหมายระยะไกลชนะด้วยความสม่ำเสมอ อย่าลืมให้ Long Run คู่กับ Recovery";
  if (goal === "เพิ่มสมรรถนะกีฬา") return "ความอึดกีฬาไม่ได้มาจากซ้อมหนักอย่างเดียว Easy Run และ Strength ก็สำคัญมาก";
  if (goal === "ฟื้นฟูร่างกาย") return "วันนี้ขยับเบา ๆ ก็พอ Mobility หรือเดินสบาย ๆ ยังนับเป็นความก้าวหน้า";
  if (goal === "กำหนดเอง" && state.userProfile.goalDetail) return `จำเป้าหมายไว้: ${state.userProfile.goalDetail} วันนี้ทำก้าวเล็ก ๆ ให้ใกล้ขึ้นอีกนิด`;
  return "เป้าหมายสุขภาพทั่วไปเริ่มจากความสม่ำเสมอ วันนี้ทำได้นิดเดียวก็ยังดีกว่าไม่เริ่ม";
}

function renderCoachNudge() {
  const nudge = state.coachNudge;
  const dismissed = readJson(STORAGE_KEYS.coachNudgeDismissed);
  const isDismissedToday = dismissed && dismissed.date === formatDate(new Date()) && dismissed.type === nudge?.type;
  const element = $("#coachNudge");

  if (!nudge || isDismissedToday) {
    element.classList.add("hidden");
    return;
  }

  $("#coachNudgeTitle").textContent = nudge.title;
  $("#coachNudgeMessage").textContent = nudge.message;
  $("#coachNudgeAction").textContent = nudge.actionPage === "add" ? "บันทึกเลย" : "ดูคำแนะนำ";
  element.classList.remove("hidden");
}

function dismissCoachNudge() {
  if (!state.coachNudge) return;
  localStorage.setItem(STORAGE_KEYS.coachNudgeDismissed, JSON.stringify({
    date: formatDate(new Date()),
    type: state.coachNudge.type
  }));
  $("#coachNudge").classList.add("hidden");
}

function handleCoachNudgeAction() {
  const page = state.coachNudge?.actionPage || "coach";
  dismissCoachNudge();
  showPage(page);
}

function renderLoadSignals(week, previousWeek, load, avgRpe) {
  const thisDistance = sum(week.filter(isRunning).map((item) => item.distance));
  const previousDistance = sum(previousWeek.filter(isRunning).map((item) => item.distance));
  const increase = previousDistance ? ((thisDistance - previousDistance) / previousDistance) * 100 : 0;
  $("#loadSignals").innerHTML = `
    <div class="signal-item"><strong>${Math.round(load)}</strong><span>คะแนนโหลดสัปดาห์นี้</span></div>
    <div class="signal-item"><strong>${avgRpe ? avgRpe.toFixed(1) : "-"}</strong><span>RPE เฉลี่ย</span></div>
    <div class="signal-item"><strong>${thisDistance.toFixed(1)} กม.</strong><span>ระยะวิ่งสัปดาห์นี้</span></div>
    <div class="signal-item"><strong>${previousDistance ? `${increase.toFixed(0)}%` : "-"}</strong><span>เปลี่ยนแปลงจากสัปดาห์ก่อน</span></div>
  `;
}

function buildCoachRecommendations() {
  const week = getCurrentWeekWorkouts();
  const previousWeek = getPreviousWeekWorkouts();
  const load = calculateWeeklyLoad(week);
  const avgRpe = average(week.map((item) => item.rpe));
  const runningDays = new Set(week.filter(isRunning).map((item) => item.date)).size;
  const thisDistance = sum(week.filter(isRunning).map((item) => item.distance));
  const previousDistance = sum(previousWeek.filter(isRunning).map((item) => item.distance));
  const distanceIncrease = previousDistance ? ((thisDistance - previousDistance) / previousDistance) * 100 : 0;
  const friday = state.weeklyPlan.find((item) => item.day === "วันศุกร์" || item.day === "Friday");
  const hasMidweekTeamSport = state.weeklyPlan.some((item) =>
    (item.day === "วันพุธ" || item.day === "Wednesday")
    && item.activityCategory === "Team Sport"
  );
  const recommendations = [];
  recommendations.push(buildGoalRecommendation());

  if (hasMidweekTeamSport && friday && friday.activityCategory === "Running" && friday.intensity === "High") {
    recommendations.push({ title: "กีฬาทีม + Speed Run โหลดสูง", text: "กลางสัปดาห์มีกีฬาทีมและวันศุกร์มี Speed Run อาจทำให้ขาล้าสะสม ถ้าขาหนักให้ลดความหนักวันศุกร์ลง" });
  }
  if (load > 120) {
    recommendations.push({ title: "โหลดสัปดาห์นี้สูง", text: "Weekly Load เกิน 120 แนะนำ Recovery Run, Mobility หรือพัก ก่อนซ้อมหนักครั้งถัดไป" });
  }
  if (runningDays < 3) {
    recommendations.push({ title: "ควรเพิ่ม Easy Run", text: "สัปดาห์นี้วิ่งน้อยกว่า 3 วัน แนะนำเพิ่ม Easy Run 1 วัน เพื่อสนับสนุนเป้าหมายการวิ่งหลัก" });
  }
  if (avgRpe > 8) {
    recommendations.push({ title: "สัญญาณความล้า", text: "RPE เฉลี่ยสูงกว่า 8 ควรให้ความสำคัญกับการนอน น้ำ และการฟื้นตัว" });
  }
  if (distanceIncrease > 30) {
    recommendations.push({ title: "เสี่ยง Overtraining", text: "ระยะวิ่งเพิ่มขึ้นมากกว่า 30% จากสัปดาห์ก่อน แนะนำคุมระยะให้คงที่หรือลดความหนัก" });
  }
  if (!recommendations.length) {
    recommendations.push({ title: "สัปดาห์นี้สมดุลดี", text: "โหลดการซ้อมยังดูจัดการได้ รักษาวันเบาให้เบาจริง และเพิ่มความก้าวหน้าแบบค่อยเป็นค่อยไป" });
  }

  return recommendations;
}

function buildGoalRecommendation() {
  const category = state.userProfile.goalCategory || "สุขภาพทั่วไป";
  const detail = state.userProfile.goalDetail || "";

  if (category === "ลดไขมัน / คุมน้ำหนัก") {
    return { title: "เป้าหมายลดไขมัน / คุมน้ำหนัก", text: "แนะนำ Zone 2 แบบสม่ำเสมอ 2-3 วันต่อสัปดาห์ ร่วมกับ Strength Training เพื่อรักษามวลกล้ามเนื้อ" };
  }
  if (category === "วิ่งระยะสั้น") {
    return { title: "เป้าหมายวิ่งระยะสั้น", text: "เน้น Speed Run, Interval สั้น และ Easy Run เพื่อฟื้นตัว อย่าให้ทุกวันเป็นวันหนัก" };
  }
  if (category === "วิ่งระยะกลาง") {
    return { title: "เป้าหมายวิ่งระยะกลาง", text: "ผสม Easy Run, Tempo และ Long Run ระยะกลาง เพื่อสร้างทั้ง pace และ endurance" };
  }
  if (category === "วิ่งระยะไกล") {
    return { title: "เป้าหมายวิ่งระยะไกล", text: "ให้ Long Run เป็นแกนหลัก เพิ่มระยะอย่างค่อยเป็นค่อยไป และวาง Recovery หลังวันยาวเสมอ" };
  }
  if (category === "เพิ่มสมรรถนะกีฬา") {
    return { title: "เป้าหมายเพิ่มสมรรถนะกีฬา", text: "แนะนำ Agility, Strength และ Sport Session ร่วมกับ Easy Run เพื่อเพิ่มความอึดโดยไม่สะสมความล้าเกินไป" };
  }
  if (category === "ฟื้นฟูร่างกาย") {
    return { title: "เป้าหมายฟื้นฟูร่างกาย", text: "ลดความหนัก ใช้ Recovery, Mobility และ Low Intensity Cardio เป็นหลัก จนกว่าร่างกายจะตอบสนองดีขึ้น" };
  }
  if (category === "กำหนดเอง") {
    return { title: "เป้าหมายเฉพาะของคุณ", text: detail ? `ใช้เป้าหมาย "${detail}" เป็นฐาน แนะนำวางแผนให้มีวันเบา วันหนัก และวันฟื้นตัวชัดเจน` : "ระบุ Goal Detail เพื่อให้โค้ชแนะนำได้ตรงขึ้น" };
  }
  if (category === "เพิ่มความฟิต") {
    return { title: "เป้าหมายเพิ่มความฟิต", text: "ผสม Easy Run, Strength และกิจกรรมกีฬาที่ชอบ เน้นความสม่ำเสมอมากกว่าความหนักทุกวัน" };
  }
  return { title: "เป้าหมายสุขภาพทั่วไป", text: "แนะนำออกกำลังกายสม่ำเสมอ 3-5 วันต่อสัปดาห์ ร่วมกับ Recovery และการนอนให้เพียงพอ" };
}

function calculateWeeklyLoad(list) {
  return list.reduce((total, workout) => total + calculateWorkoutLoad(workout), 0);
}

function calculateWorkoutLoad(workout) {
  const factor = intensityFactors[workout.intensity] || 1;
  if (workout.activityCategory === "Running") return workout.distance * 10 + workout.duration * factor;
  if (workout.activityCategory === "Team Sport") return workout.duration * 0.8 * factor;
  if (workout.activityCategory === "Racket Sport") return workout.duration * 0.7 * factor;
  if (workout.activityCategory === "Strength") return workout.duration * 0.6 * factor;
  if (workout.activityCategory === "Cardio") return workout.duration * 0.65 * factor;
  if (workout.activityCategory === "Mobility / Recovery") return workout.duration * 0.3 * factor;
  return workout.duration * 0.5 * factor;
}

function getLoadStatus(load) {
  if (load <= 40) return "Light";
  if (load <= 80) return "Balanced";
  if (load <= 120) return "Productive";
  return "Overload";
}

function getRecoveryStatus(load, avgRpe) {
  if (load > 120 || avgRpe > 8) return { status: "Overloaded", message: "โหลดหรือ RPE สูง ควรฟื้นตัวให้พอก่อนซ้อมหนักครั้งถัดไป" };
  if (load >= 81) return { status: "Need Recovery", message: "โหลดกำลังพัฒนา แต่ควรเพิ่ม Recovery เพื่อให้ร่างกายรับการซ้อมได้ดี" };
  if (load >= 41) return { status: "Normal", message: "โหลดการซ้อมสมดุล สามารถซ้อมตามแผนต่อได้" };
  return { status: "Ready", message: "โหลดค่อนข้างเบา พร้อมสร้างความสม่ำเสมอเพิ่มขึ้น" };
}

function calculateTrainingScore(load, avgRpe, workoutCount) {
  const loadScore = Math.min(load, 120) * 0.55;
  const consistencyScore = Math.min(workoutCount * 8, 28);
  const rpePenalty = avgRpe > 8 ? (avgRpe - 8) * 10 : 0;
  return Math.max(0, Math.min(100, Math.round(loadScore + consistencyScore - rpePenalty)));
}

function calculatePersonalRecords(workouts) {
  const runs = workouts.filter(isRunning);
  const withPace = runs.filter((run) => run.distance > 0 && run.duration > 0).map((run) => ({
    ...run,
    pace: run.duration / run.distance
  }));
  const fastest1k = withPace.length ? minBy(withPace, "pace") : null;
  const fastest5k = withPace.filter((run) => run.distance >= 5).map((run) => ({
    ...run,
    minutes: run.pace * 5
  })).sort((a, b) => a.minutes - b.minutes)[0] || null;
  const longestRun = runs.length ? runs.slice().sort((a, b) => b.distance - a.distance)[0] : null;
  return { fastest1k, fastest5k, longestRun };
}

function deleteWorkout(id) {
  state.workouts = state.workouts.filter((item) => item.id !== id);
  render();
}

function clearWorkouts() {
  if (!window.confirm("ลบ Workout ทั้งหมดหรือไม่? หากต้องการเก็บข้อมูล ควร Export สำรองก่อน")) return;
  state.workouts = [];
  render();
}

function exportData() {
  const payload = {
    exportedAt: new Date().toISOString(),
    userProfile: state.userProfile,
    workouts: state.workouts,
    weeklyPlan: state.weeklyPlan,
    lineCoach: state.lineCoach,
    personalRecords: state.personalRecords,
    coachRecommendations: state.coachRecommendations
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `nutfit-v2-backup-${formatDate(new Date())}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      if (!Array.isArray(parsed.workouts)) throw new Error("Invalid backup");
      if (!window.confirm("นำเข้าไฟล์สำรองและแทนที่ข้อมูล NutFit V2 ปัจจุบันหรือไม่?")) return;
      state.userProfile = normalizeProfile({ ...defaultProfile, ...(parsed.userProfile || parsed.profile || {}) });
      state.workouts = parsed.workouts.map(normalizeWorkout);
      state.weeklyPlan = Array.isArray(parsed.weeklyPlan) ? parsed.weeklyPlan.map(normalizePlanItem) : emptyWeeklyPlan.map((item) => ({ ...item }));
      state.lineCoach = { ...loadLineCoach(), ...(parsed.lineCoach || {}) };
      render();
      showPage("dashboard");
    } catch {
      window.alert("นำเข้าไม่สำเร็จ กรุณาเลือกไฟล์สำรอง JSON ของ NutFit ที่ถูกต้อง");
    } finally {
      $("#importFileInput").value = "";
    }
  };
  reader.readAsText(file);
}

function handleAvatarUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    window.alert("กรุณาเลือกรูปภาพเท่านั้น");
    return;
  }
  const reader = new FileReader();
  reader.onload = () => resizeAvatar(reader.result).then((dataUrl) => {
    state.userProfile.avatar = dataUrl;
    render();
  }).catch(() => window.alert("ไม่สามารถอ่านรูปนี้ได้ กรุณาลองเลือกรูปอื่น"));
  reader.readAsDataURL(file);
  $("#avatarInput").value = "";
}

function removeAvatar() {
  state.userProfile.avatar = "";
  render();
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

function toggleDistanceField() {
  const show = $("#activityCategoryInput").value === "Running";
  $("#distanceField").style.display = show ? "grid" : "none";
  $("#distanceInput").required = show;
}

function suggestActivityName() {
  const input = $("#activityNameInput");
  if (input.value.trim()) return;
  const category = $("#activityCategoryInput").value;
  const suggestions = {
    Running: "วิ่ง",
    Cardio: "คาร์ดิโอ",
    "Team Sport": "กีฬาทีม",
    "Racket Sport": "กีฬาแร็กเก็ต",
    Strength: "เวท / Strength",
    "Mobility / Recovery": "Recovery",
    Other: "กิจกรรมอื่น ๆ"
  };
  input.value = suggestions[category] || "";
}

function getActivityKey(item) {
  return `${item.activityCategory || "Other"}::${(item.activityName || categoryLabels[item.activityCategory] || "กิจกรรม").trim()}`;
}

function renderBmiPreview() {
  const bmi = calculateBmi(Number($("#profileHeightInput").value), Number($("#profileWeightInput").value));
  $("#profileBmiPreview").textContent = bmi ? bmi.toFixed(1) : "-";
  $("#profileBmiCategory").textContent = bmi ? bmiCategory(bmi) : "กรอกส่วนสูงและน้ำหนักเพื่อคำนวณ BMI";
}

function renderProfileGuidance() {
  renderBmiPreview();
  updateGoalDetailRequirement();

  const profileDraft = {
    ...state.userProfile,
    height: Number($("#profileHeightInput").value || 0),
    weight: Number($("#profileWeightInput").value || 0),
    runningLevel: $("#profileRunningLevelInput").value,
    goalCategory: $("#profileGoalCategoryInput").value,
    goalDetail: $("#profileGoalDetailInput").value.trim(),
    weeklyTrainingDays: Number($("#profileTrainingDaysInput").value || 0)
  };
  const recommendation = buildProfilePlanRecommendation(profileDraft);

  $("#recommendationTitle").textContent = recommendation.title;
  $("#recommendationText").textContent = recommendation.text;
  $("#recommendationTags").innerHTML = recommendation.tags
    .map((tag) => `<span>${escapeHtml(tag)}</span>`)
    .join("");
}

function buildProfilePlanRecommendation(profile) {
  const bmi = calculateBmi(profile.height, profile.weight);
  const category = profile.goalCategory || "สุขภาพทั่วไป";
  const level = profile.runningLevel || "Beginner";
  const days = Math.max(1, Math.min(7, Number(profile.weeklyTrainingDays || 3)));
  const tags = [];
  const plan = [];

  if (!bmi) {
    return {
      title: "กรอกส่วนสูงและน้ำหนักก่อน",
      text: "เมื่อมีข้อมูล BMI ระบบจะแนะนำรูปแบบการซ้อมที่เหมาะกับเป้าหมายและระดับปัจจุบันมากขึ้น",
      tags: ["BMI", "Goal", "Training Days"]
    };
  }

  if (bmi >= 25) {
    plan.push("เน้นคาร์ดิโอแรงกระแทกต่ำหรือ Zone 2 เพื่อสร้างฐานความฟิต");
    plan.push("เพิ่มเวท / Strength 2 วันต่อสัปดาห์เพื่อช่วยคุมน้ำหนักและลดความเสี่ยงบาดเจ็บ");
    tags.push("Zone 2", "เวท / Strength", "แรงกระแทกต่ำ");
  } else if (bmi < 18.5) {
    plan.push("เริ่มด้วยความหนักเบาถึงปานกลาง และให้ความสำคัญกับ Strength Training");
    plan.push("หลีกเลี่ยงการเพิ่มระยะวิ่งเร็วเกินไป เพื่อให้ร่างกายปรับตัวได้ดี");
    tags.push("พื้นฐานกล้ามเนื้อ", "คาร์ดิโอเบา");
  } else {
    plan.push("สามารถใช้แผนผสมระหว่าง Easy Run, Strength และ Recovery ได้ค่อนข้างสมดุล");
    tags.push("โหลดสมดุล");
  }

  if (category === "ลดไขมัน / คุมน้ำหนัก") {
    plan.push("เป้าหมายนี้เหมาะกับ Easy Cardio 2-3 วัน และ Strength 2 วันต่อสัปดาห์");
    tags.push("ลดไขมัน");
  } else if (category === "วิ่งระยะสั้น") {
    plan.push("เพิ่ม Speed / Interval สั้น 1 วันต่อสัปดาห์ และคุมวันหนักไม่ให้ติดกัน");
    tags.push("ความเร็ว");
  } else if (category === "วิ่งระยะกลาง") {
    plan.push("ผสม Easy Run, Tempo และ Long Run ระยะกลาง เพื่อพัฒนาทั้ง pace และ endurance");
    tags.push("Tempo Run");
  } else if (category === "วิ่งระยะไกล") {
    plan.push("ให้ Long Run เป็นแกนหลัก 1 วันต่อสัปดาห์ และมี Recovery หลังวันยาว");
    tags.push("Long Run");
  } else if (category === "เพิ่มสมรรถนะกีฬา") {
    plan.push("ควรมี Agility หรือเวท / Strength ร่วมกับการเล่นกีฬา และ Easy Run เพื่อเพิ่มความอึด");
    tags.push("Agility", "ความอึดกีฬา");
  } else if (category === "ฟื้นฟูร่างกาย") {
    plan.push("ลดความหนัก ใช้ Mobility, Recovery และ Low Intensity Cardio เป็นหลัก");
    tags.push("ฟื้นตัวก่อน");
  } else if (category === "กำหนดเอง" && profile.goalDetail) {
    plan.push(`ใช้เป้าหมาย "${profile.goalDetail}" เป็นแกนในการวางแผน และแบ่งวันหนัก/เบาให้ชัดเจน`);
    tags.push("เป้าหมายเฉพาะ");
  } else {
    plan.push("เน้นความสม่ำเสมอ สลับวันหนักกับวันเบา และมีวันพักชัดเจน");
    tags.push("ความสม่ำเสมอ");
  }

  if (level === "Beginner") {
    plan.push("ระดับเริ่มต้นควรเริ่มจาก 3-4 วันต่อสัปดาห์ และเพิ่มโหลดทีละน้อย");
    tags.push("เริ่มต้น");
  } else if (level === "Advanced") {
    plan.push("ระดับสูงสามารถใช้ quality session ได้มากขึ้น แต่ควรติดตาม RPE และ Recovery ทุกสัปดาห์");
    tags.push("สมรรถนะ");
  }

  if (days <= 3) {
    plan.push("จำนวนวันซ้อมน้อย ควรเลือก session ที่คุ้มค่า: Cardio 1-2 วัน + Strength 1 วัน");
  } else if (days >= 6) {
    plan.push("จำนวนวันซ้อมสูง ควรกำหนดอย่างน้อย 1-2 วันเป็น Recovery หรือ Low intensity");
    tags.push("Recovery");
  }

  return {
    title: `แนวทางเริ่มต้น: ${category}`,
    text: plan.slice(0, 4).join(" • "),
    tags: [...new Set(tags)].slice(0, 5)
  };
}

function renderProgramDescription() {
  const program = $("#profileProgramInput").value || "Balanced Fitness";
  $("#programInfoTitle").textContent = program;
  $("#programInfoText").textContent = programDescriptions[program] || programDescriptions["Balanced Fitness"];
}

function normalizeWorkout(workout) {
  const activityCategory = normalizeActivityCategory(workout.activityCategory || workout.sportType || workout.type);
  const intensity = normalizeIntensity(workout.intensity);
  const activityName = workout.activityName || inferActivityName(workout.sportType || workout.type || activityCategory);
  return {
    id: workout.id || String(Date.now() + Math.random()),
    date: workout.date || formatDate(new Date()),
    activityCategory,
    activityName,
    duration: Number(workout.duration || 0),
    distance: activityCategory === "Running" ? Number(workout.distance || 0) : 0,
    intensity,
    rpe: Number(workout.rpe || workout.feeling || 5),
    feeling: ["Easy", "Good", "Tired", "Exhausted"].includes(workout.feeling) ? workout.feeling : "Good",
    note: workout.note || workout.remark || ""
  };
}

function normalizePlanItem(item, index = 0) {
  const base = emptyWeeklyPlan[index] || emptyWeeklyPlan[0];
  const activityCategory = normalizeActivityCategory(item.activityCategory || item.sportType || item.type || base.activityCategory);
  return {
    day: item.day || base.day,
    title: item.title || base.title,
    activityCategory,
    activityName: item.activityName || inferActivityName(item.sportType || item.type || base.activityName || activityCategory),
    intensity: normalizeIntensity(item.intensity || base.intensity),
    note: item.note || base.note
  };
}

function normalizeActivityCategory(type) {
  if (type === "Run" || type === "Running") return "Running";
  if (type === "Football") return "Team Sport";
  if (type === "Badminton") return "Racket Sport";
  if (type === "Strength" || type === "Strength Training") return "Strength";
  if (type === "Recovery") return "Mobility / Recovery";
  return categoryLabels[type] ? type : "Other";
}

function inferActivityName(type) {
  if (type === "Football") return "ฟุตบอล";
  if (type === "Badminton") return "แบดมินตัน";
  if (type === "Run" || type === "Running") return "วิ่ง";
  if (type === "Strength" || type === "Strength Training") return "เวท / Strength";
  if (type === "Recovery") return "Recovery";
  return categoryLabels[type] || String(type || "กิจกรรม");
}

function normalizeIntensity(intensity) {
  if (intensity === "Easy") return "Low";
  if (intensity === "Moderate") return "Medium";
  if (intensity === "Hard") return "High";
  return intensityFactors[intensity] ? intensity : "Medium";
}

function mapLegacyGoal(goal) {
  if (goal === "ลดไขมัน") return "Fat Loss";
  if (goal === "วิ่งได้นานขึ้น") return "10K";
  if (goal === "เตรียมฟุตบอล/แบดมินตัน") return "Football Stamina";
  return "Football Stamina";
}

function getCurrentWeekWorkouts() {
  const start = getWeekStart(new Date());
  const end = addDays(start, 7);
  return state.workouts.filter((item) => {
    const date = new Date(`${item.date}T00:00:00`);
    return date >= start && date < end;
  });
}

function getPreviousWeekWorkouts() {
  const currentStart = getWeekStart(new Date());
  const start = addDays(currentStart, -7);
  return state.workouts.filter((item) => {
    const date = new Date(`${item.date}T00:00:00`);
    return date >= start && date < currentStart;
  });
}

function getWeekStart(date) {
  const copy = new Date(date);
  const day = copy.getDay() || 7;
  copy.setHours(0, 0, 0, 0);
  copy.setDate(copy.getDate() - day + 1);
  return copy;
}

function getPlanIndex(date) {
  return date.getDay() === 0 ? 6 : date.getDay() - 1;
}

function translateDayToEnglish(day) {
  return {
    "วันจันทร์": "Monday",
    "วันอังคาร": "Tuesday",
    "วันพุธ": "Wednesday",
    "วันพฤหัสบดี": "Thursday",
    "วันศุกร์": "Friday",
    "วันเสาร์": "Saturday",
    "วันอาทิตย์": "Sunday"
  }[day] || day;
}

function translateEnglishDayToThai(day) {
  return {
    Monday: "วันจันทร์",
    Tuesday: "วันอังคาร",
    Wednesday: "วันพุธ",
    Thursday: "วันพฤหัสบดี",
    Friday: "วันศุกร์",
    Saturday: "วันเสาร์",
    Sunday: "วันอาทิตย์"
  }[day] || day;
}

function addDays(date, days) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
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

function isProfileComplete(profile) {
  return Boolean(profile.name && profile.age && profile.height && profile.weight);
}

function isRunning(workout) {
  return workout.activityCategory === "Running";
}

function scoreLabel(score) {
  if (score >= 80) return "Strong";
  if (score >= 60) return "Good";
  if (score >= 35) return "Building";
  return "Start";
}

function average(values) {
  const nums = values.map(Number).filter(Number.isFinite);
  return nums.length ? sum(nums) / nums.length : 0;
}

function sum(values) {
  return values.reduce((total, value) => total + Number(value || 0), 0);
}

function minBy(items, field) {
  return items.slice().sort((a, b) => a[field] - b[field])[0];
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

function formatPace(pace) {
  const minutes = Math.floor(pace);
  const seconds = Math.round((pace - minutes) * 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}/km`;
}

function formatMinutes(minutes) {
  const mins = Math.floor(minutes);
  const secs = Math.round((minutes - mins) * 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

function escapeAttribute(value) {
  return escapeHtml(value);
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}
