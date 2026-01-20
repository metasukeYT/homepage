/*
  タイピング練習テンプレート（ブラウザだけで動くバージョン）

  仕組み（重要な流れ）:
  1) 問題文（text）と「今どこまで打てたか」（index）を状態として持つ
  2) keydown で 1文字ずつ入力を受け取り、期待文字（text[index]）と比較する
  3) 正解なら index を進める、ミスならミス回数を増やす
  4) 状態が変わったら render() で画面（DOM）を更新する
*/

const ROMAJI_WORDS = {
  easy: [
    { ro: "ai", jp: "あい" },
    { ro: "ao", jp: "あお" },
    { ro: "aka", jp: "あか" },
    { ro: "asa", jp: "あさ" },
    { ro: "eki", jp: "えき" },
    { ro: "hana", jp: "はな" },
    { ro: "kasa", jp: "かさ" },
    { ro: "kawa", jp: "かわ" },
    { ro: "kumo", jp: "くも" },
    { ro: "mizu", jp: "みず" },
    { ro: "sora", jp: "そら" },
    { ro: "yama", jp: "やま" },
    { ro: "umi", jp: "うみ" },
    { ro: "tori", jp: "とり" },
    { ro: "inu", jp: "いぬ" },
    { ro: "neko", jp: "ねこ" },
    { ro: "saku", jp: "さく" },
    { ro: "natsu", jp: "なつ" },
    { ro: "haru", jp: "はる" },
    { ro: "fuyu", jp: "ふゆ" },
    { ro: "kaze", jp: "かぜ" },
    { ro: "yuki", jp: "ゆき" },
    { ro: "hi", jp: "ひ" },
    { ro: "tsuki", jp: "つき" },
    { ro: "hoshi", jp: "ほし" },
    { ro: "mori", jp: "もり" },
    { ro: "tane", jp: "たね" },
    { ro: "yume", jp: "ゆめ" },
    { ro: "uta", jp: "うた" },
    { ro: "kibo", jp: "きぼう" },
  ],
  normal: [
    { ro: "shizen", jp: "しぜん" },
    { ro: "tsubasa", jp: "つばさ" },
    { ro: "kibun", jp: "きぶん" },
    { ro: "kakera", jp: "かけら" },
    { ro: "kansha", jp: "かんしゃ" },
    { ro: "yoin", jp: "よいん" },
    { ro: "mirai", jp: "みらい" },
    { ro: "kanata", jp: "かなた" },
    { ro: "tayori", jp: "たより" },
    { ro: "megumi", jp: "めぐみ" },
    { ro: "asahi", jp: "あさひ" },
    { ro: "tasogare", jp: "たそがれ" },
    { ro: "ayumi", jp: "あゆみ" },
    { ro: "kokoro", jp: "こころ" },
    { ro: "kotoba", jp: "ことば" },
    { ro: "yorokobi", jp: "よろこび" },
    { ro: "tsuyosa", jp: "つよさ" },
    { ro: "senaka", jp: "せなか" },
    { ro: "nagare", jp: "ながれ" },
    { ro: "kagayaki", jp: "かがやき" },
    { ro: "tsuduki", jp: "つづき" },
    { ro: "nigiyaka", jp: "にぎやか" },
    { ro: "kakunin", jp: "かくにん" },
    { ro: "kikaku", jp: "きかく" },
    { ro: "yokou", jp: "よこう" },
    { ro: "wakaba", jp: "わかば" },
    { ro: "sukima", jp: "すきま" },
    { ro: "mabushii", jp: "まぶしい" },
    { ro: "terasu", jp: "てらす" },
    { ro: "shinyuu", jp: "しんゆう" },
  ],
  hard: [
    { ro: "ryokou", jp: "りょこう" },
    { ro: "shinkansen", jp: "しんかんせん" },
    { ro: "shinchou", jp: "しんちょう" },
    { ro: "kyuuka", jp: "きゅうか" },
    { ro: "shuunou", jp: "しゅうのう" },
    { ro: "ryoushi", jp: "りょうし" },
    { ro: "ryuusei", jp: "りゅうせい" },
    { ro: "shokubutsu", jp: "しょくぶつ" },
    { ro: "shokunin", jp: "しょくにん" },
    { ro: "kouryuu", jp: "こうりゅう" },
    { ro: "gakushuu", jp: "がくしゅう" },
    { ro: "shouhin", jp: "しょうひん" },
    { ro: "keikaku", jp: "けいかく" },
    { ro: "shinrai", jp: "しんらい" },
    { ro: "junsui", jp: "じゅんすい" },
    { ro: "ryourimono", jp: "りょうりもの" },
    { ro: "shuryou", jp: "しゅりょう" },
    { ro: "ryoute", jp: "りょうて" },
    { ro: "shinjuku", jp: "しんじゅく" },
    { ro: "shinchoku", jp: "しんちょく" },
    { ro: "kyousou", jp: "きょうそう" },
    { ro: "shousai", jp: "しょうさい" },
    { ro: "ryuugi", jp: "りゅうぎ" },
    { ro: "chousa", jp: "ちょうさ" },
    { ro: "shousetsu", jp: "しょうせつ" },
    { ro: "kyoushuu", jp: "きょうしゅう" },
    { ro: "ryokutekina", jp: "りょくてきな" },
    { ro: "shinteki", jp: "しんてき" },
    { ro: "shouchou", jp: "しょうちょう" },
    { ro: "ryuuseigun", jp: "りゅうせいぐん" },
  ],
  gekimuzu: [
    { ro: "yamiwosakujousuruhinohibanakagayaki", jp: "やみをさくじょするひのひばながやく" },
    { ro: "tasogarenosoraokakeruokoriyoru", jp: "たそがれのそらをかけるおこりよる" },
    { ro: "kizutsuitaomoiwosozoguhinooto", jp: "きずついたおもいをそそぐひのおと" },
    { ro: "hohonohikaraumaretahikarinohana", jp: "ほほのひからうまれたひかりのはな" },
    { ro: "sazanamiwokoehashiruyorunohibiki", jp: "さざなみをこえはしるよるのひびき" },
    { ro: "shinsoumadehibikuikazuchinohane", jp: "しんそうまでひびくいかづちのはね" },
    { ro: "mabayukuteheranaihinochikaitoki", jp: "まばゆくてへらないひのちかいとき" },
    { ro: "kuroiamewosakihikiarukuakarinomichi", jp: "くろいあめをさきひきあるくあかりのみち" },
  ],
};

function buildRomajiSet(words, count) {
  const set = [];
  for (let i = 0; i < count; i += 1) {
    const word = words[(i * 3 + i * 5) % words.length];
    set.push(word);
  }
  return set;
}

const ROMAJI_SETS = {
  easy: buildRomajiSet(ROMAJI_WORDS.easy, 100),
  normal: buildRomajiSet(ROMAJI_WORDS.normal, 100),
  hard: buildRomajiSet(ROMAJI_WORDS.hard, 100),
  gekimuzu: buildRomajiSet(ROMAJI_WORDS.gekimuzu, 100),
};

const ui = {
  modeSelect: document.getElementById("modeSelect"),
  caseSelect: document.getElementById("caseSelect"),
  difficultySelect: document.getElementById("difficultySelect"),
  timeLimitSelect: document.getElementById("timeLimitSelect"),
  startBtn: document.getElementById("startBtn"),
  stopBtn: document.getElementById("stopBtn"),
  nextBtn: document.getElementById("nextBtn"),
  resetBtn: document.getElementById("resetBtn"),
  customArea: document.getElementById("customArea"),
  customText: document.getElementById("customText"),
  targetWrap: document.getElementById("targetWrap"),
  target: document.getElementById("target"),
  typingInput: document.getElementById("typingInput"),
  timeValue: document.getElementById("timeValue"),
  remainValue: document.getElementById("remainValue"),
  correctValue: document.getElementById("correctValue"),
  wrongValue: document.getElementById("wrongValue"),
  accuracyValue: document.getElementById("accuracyValue"),
  result: document.getElementById("result"),
  rTime: document.getElementById("rTime"),
  rWpm: document.getElementById("rWpm"),
  rCpm: document.getElementById("rCpm"),
  rAcc: document.getElementById("rAcc"),
};

const state = {
  mode: "romaji",
  caseMode: "strict",
  difficulty: "normal",
  timeLimitSec: 60,
  text: "",
  jpText: "",
  index: 0,
  correct: 0,
  wrong: 0,
  totalTyped: 0,
  wordsCompleted: 0,
  startedAtMs: null,
  endedAtMs: null,
  rafId: null,
  mistakeFlashTimeoutId: null,
  customWords: [],
  customIndex: 0,
};

let audioContext = null;
let lastTypeSoundAt = 0;

function nowMs() {
  return performance.now();
}

function isTypingFinished() {
  return state.index >= state.text.length && state.text.length > 0;
}

function isRunning() {
  return state.startedAtMs !== null && state.endedAtMs === null;
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function formatSeconds(seconds) {
  const safe = Number.isFinite(seconds) ? seconds : 0;
  return `${safe.toFixed(1)}s`;
}

function getAccuracyPercent() {
  if (state.totalTyped === 0) return 0;
  return (state.correct / state.totalTyped) * 100;
}

function pickRandomFromMode() {
  if (state.mode === "custom") {
    const custom = ui.customText.value ?? "";
    return {
      ro: custom.trim().length > 0 ? custom : "type your custom text here",
      jp: "",
    };
  }
  const items = ROMAJI_SETS[state.difficulty] ?? ROMAJI_SETS.normal;
  const idx = Math.floor(Math.random() * items.length);
  return items[idx];
}

function pickTextFromMode() {
  if (state.mode !== "custom") {
    return pickRandomFromMode();
  }
  if (state.customWords.length === 0) {
    return { ro: "type your custom text here", jp: "" };
  }
  const word = state.customWords[state.customIndex % state.customWords.length];
  state.customIndex += 1;
  return { ro: word, jp: "" };
}

function resetRound({ keepMode = true } = {}) {
  stopTimer();
  if (state.mode === "custom") {
    state.customWords = (ui.customText.value || "")
      .split(/\s+/)
      .map((w) => w.trim())
      .filter(Boolean);
    state.customIndex = 0;
  }
  const next = pickTextFromMode();
  state.text = next.ro;
  state.jpText = next.jp;
  state.index = 0;
  state.correct = 0;
  state.wrong = 0;
  state.totalTyped = 0;
  state.wordsCompleted = 0;
  state.startedAtMs = null;
  state.endedAtMs = null;
  ui.result.hidden = true;
  ui.target.classList.remove("mistake");

  if (!keepMode) {
    state.mode = "romaji";
    state.caseMode = "strict";
    state.difficulty = "normal";
    state.timeLimitSec = 60;
    ui.modeSelect.value = state.mode;
    ui.caseSelect.value = state.caseMode;
    ui.difficultySelect.value = state.difficulty;
    ui.timeLimitSelect.value = String(state.timeLimitSec);
  }

  render();
}

function normalizeChar(ch) {
  if (state.caseMode === "ignore") return ch.toLowerCase();
  return ch;
}

function startIfNeeded() {
  if (state.startedAtMs !== null) return;
  state.startedAtMs = nowMs();
  state.endedAtMs = null;
  startTimer();
}

function stopRound() {
  if (!isRunning()) return;
  state.endedAtMs = nowMs();
  stopTimer();
  render();
  showResult();
}

function finishRound() {
  if (state.startedAtMs === null) return;
  if (state.endedAtMs !== null) return;
  state.endedAtMs = nowMs();
  stopTimer();
  render();
  showResult();
}

function startTimer() {
  stopTimer();
  const tick = () => {
    renderStats();
    if (state.timeLimitSec > 0) {
      const remain = getRemainingSeconds();
      if (remain <= 0 && isRunning()) {
        stopRound();
        return;
      }
    }
    state.rafId = requestAnimationFrame(tick);
  };
  state.rafId = requestAnimationFrame(tick);
}

function stopTimer() {
  if (state.rafId !== null) cancelAnimationFrame(state.rafId);
  state.rafId = null;
}

function flashMistake() {
  ui.target.classList.add("mistake");
  if (state.mistakeFlashTimeoutId !== null) clearTimeout(state.mistakeFlashTimeoutId);
  state.mistakeFlashTimeoutId = setTimeout(() => {
    ui.target.classList.remove("mistake");
  }, 140);
}

function isIgnorableKey(e) {
  if (e.ctrlKey || e.metaKey || e.altKey) return true;
  const ignorable = new Set([
    "Shift",
    "Control",
    "Alt",
    "Meta",
    "CapsLock",
    "Tab",
    "Backspace",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "PageUp",
    "PageDown",
    "Home",
    "End",
    "Insert",
    "Delete",
    "F1",
    "F2",
    "F3",
    "F4",
    "F5",
    "F6",
    "F7",
    "F8",
    "F9",
    "F10",
    "F11",
    "F12",
  ]);
  return ignorable.has(e.key);
}

function applyTypedChar(typed) {
  if (state.endedAtMs !== null) return;
  if (isTypingFinished()) return;
  const expected = state.text[state.index] ?? "";
  const expectedN = normalizeChar(expected);
  const typedN = normalizeChar(typed);

  startIfNeeded();
  state.totalTyped += 1;
  playTypeSound();

  if (typedN === expectedN) {
    state.correct += 1;
    state.index += 1;
    if (isTypingFinished()) {
      state.wordsCompleted += 1;
      const next = pickTextFromMode();
      state.text = next.ro;
      state.jpText = next.jp;
      state.index = 0;
    }
    render();
    return;
  }

  state.wrong += 1;
  flashMistake();
  renderStats();
}

function handleKeydown(e) {
  if (e.target === ui.customText && state.mode === "custom" && !isRunning()) return;

  if (isIgnorableKey(e)) return;

  if (e.key === "Escape") {
    e.preventDefault();
    resetRound();
    return;
  }

  if (e.key === "Enter" && ui.result.hidden === false) {
    e.preventDefault();
    nextRound();
    return;
  }
}

function renderTarget() {
  ui.target.innerHTML = "";
  const frag = document.createDocumentFragment();

  const jpLine = document.createElement("div");
  jpLine.className = "targetLine jpLine";
  const roLine = document.createElement("div");
  roLine.className = "targetLine roLine";

  const jpText = state.jpText || "";
  const jpDone = jpText.length
    ? Math.floor((state.index / Math.max(state.text.length, 1)) * jpText.length)
    : 0;

  for (let i = 0; i < jpText.length; i += 1) {
    const span = document.createElement("span");
    span.className = "ch";
    span.textContent = jpText[i];

    if (i < jpDone) span.classList.add("done");
    else if (i === jpDone) span.classList.add("next");
    else span.classList.add("todo");

    jpLine.append(span);
  }

  for (let i = 0; i < state.text.length; i += 1) {
    const span = document.createElement("span");
    span.className = "ch";
    span.textContent = state.text[i];

    if (i < state.index) span.classList.add("done");
    else if (i === state.index) span.classList.add("next");
    else span.classList.add("todo");

    roLine.append(span);
  }

  if (state.text.length === 0) {
    const span = document.createElement("span");
    span.className = "ch todo";
    span.textContent = "（問題が空です）";
    roLine.append(span);
  }

  frag.append(jpLine, roLine);
  ui.target.append(frag);
}

function getElapsedSeconds() {
  if (state.startedAtMs === null) return 0;
  const end = state.endedAtMs ?? nowMs();
  return clamp((end - state.startedAtMs) / 1000, 0, 99999);
}

function getRemainingSeconds() {
  if (state.timeLimitSec <= 0) return 0;
  const remaining = state.timeLimitSec - getElapsedSeconds();
  return clamp(remaining, 0, state.timeLimitSec);
}

function renderStats() {
  const elapsed = getElapsedSeconds();
  ui.timeValue.textContent = formatSeconds(elapsed);
  ui.remainValue.textContent = formatSeconds(getRemainingSeconds());
  ui.correctValue.textContent = String(state.correct);
  ui.wrongValue.textContent = String(state.wrong);
  ui.accuracyValue.textContent = `${getAccuracyPercent().toFixed(0)}%`;
}

function render() {
  renderTarget();
  renderStats();

  const mode = ui.modeSelect.value;
  const isCustom = mode === "custom";
  ui.customArea.hidden = !isCustom;

  const running = isRunning();
  ui.startBtn.classList.toggle("running", running);
  ui.startBtn.textContent = running ? "開始中" : "開始";
  ui.stopBtn.disabled = !running;
}

function showResult() {
  const elapsed = getElapsedSeconds();
  const acc = getAccuracyPercent();
  const cpm = elapsed > 0 ? (state.correct / elapsed) * 60 : 0;
  const wpm = elapsed > 0 ? (state.correct / 5 / elapsed) * 60 : 0;

  ui.rTime.textContent = formatSeconds(elapsed);
  ui.rCpm.textContent = String(Math.round(cpm));
  ui.rWpm.textContent = String(Math.round(wpm));
  ui.rAcc.textContent = `${acc.toFixed(0)}%`;

  ui.result.hidden = false;
}

function nextRound() {
  resetRound();
}

function handleModeChange() {
  state.mode = ui.modeSelect.value;
  resetRound();
}

function handleCaseChange() {
  state.caseMode = ui.caseSelect.value;
  render();
}

function handleDifficultyChange() {
  state.difficulty = ui.difficultySelect.value;
  resetRound();
}

function handleTimeLimitChange() {
  const value = Number(ui.timeLimitSelect.value);
  state.timeLimitSec = Number.isFinite(value) ? value : 60;
  resetRound();
}

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}

function playClickSound() {
  const ctx = getAudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.value = 640;
  gain.gain.value = 0.0001;
  osc.connect(gain);
  gain.connect(ctx.destination);
  const now = ctx.currentTime;
  gain.gain.exponentialRampToValueAtTime(0.08, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
  osc.start(now);
  osc.stop(now + 0.2);
}

function playTypeSound() {
  const now = nowMs();
  if (now - lastTypeSoundAt < 18) return;
  lastTypeSoundAt = now;
  const ctx = getAudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const noise = ctx.createOscillator();
  osc.type = "square";
  osc.frequency.value = 220 + Math.random() * 120;
  noise.type = "triangle";
  noise.frequency.value = 1200 + Math.random() * 400;
  gain.gain.value = 0.0001;
  osc.connect(gain);
  noise.connect(gain);
  gain.connect(ctx.destination);
  const t = ctx.currentTime;
  gain.gain.exponentialRampToValueAtTime(0.05, t + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);
  osc.start(t);
  noise.start(t);
  osc.stop(t + 0.09);
  noise.stop(t + 0.09);
}

function focusTypingInput() {
  if (ui.typingInput) {
    ui.typingInput.focus({ preventScroll: true });
  }
}

function handleInput(e) {
  if (e.inputType === "insertCompositionText") return;
  const value = ui.typingInput.value;
  if (!value) return;
  ui.typingInput.value = "";
  for (const ch of value) {
    if (!/^[a-zA-Z]$/.test(ch)) continue;
    applyTypedChar(ch);
  }
}

function bindEvents() {
  window.addEventListener("keydown", handleKeydown, true);
  ui.typingInput.addEventListener("keydown", handleKeydown);
  ui.typingInput.addEventListener("input", handleInput);
  ui.typingInput.addEventListener("blur", () => {
    if (isRunning()) focusTypingInput();
  });

  ui.startBtn.addEventListener("click", () => {
    playClickSound();
    if (isTypingFinished()) resetRound();
    startIfNeeded();
    focusTypingInput();
    render();
  });

  ui.stopBtn.addEventListener("click", () => {
    playClickSound();
    stopRound();
  });

  ui.nextBtn.addEventListener("click", () => {
    playClickSound();
    nextRound();
  });

  ui.resetBtn.addEventListener("click", () => {
    playClickSound();
    resetRound();
  });

  ui.modeSelect.addEventListener("change", handleModeChange);
  ui.caseSelect.addEventListener("change", handleCaseChange);
  ui.difficultySelect.addEventListener("change", handleDifficultyChange);
  ui.timeLimitSelect.addEventListener("change", handleTimeLimitChange);

  ui.targetWrap.addEventListener("pointerdown", () => focusTypingInput());
  document.addEventListener("pointerdown", (e) => {
    if (e.target === ui.customText) return;
    if (e.target === ui.modeSelect) return;
    if (e.target === ui.caseSelect) return;
    if (e.target === ui.difficultySelect) return;
    if (e.target === ui.timeLimitSelect) return;
    if (e.target instanceof HTMLElement && e.target.closest(".panel")) {
      focusTypingInput();
    }
  });

  ui.customText.addEventListener("input", () => {
    if (state.mode !== "custom") return;
    if (state.startedAtMs !== null) return;
    const next = pickTextFromMode();
    state.text = next.ro;
    state.jpText = next.jp;
    render();
  });
}

bindEvents();
resetRound({ keepMode: true });

(() => {
  const img = new Image();
  img.decoding = "async";
  img.src = "./bg.png";
  img.onload = () => {
    document.documentElement.classList.add("hasBgImage");
  };
})();
