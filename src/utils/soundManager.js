// src/utils/soundManager.js
const sounds = {
  click: new Audio("https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3"),
  correct: new Audio("https://assets.mixkit.co/sfx/preview/mixkit-winning-notification-2018.mp3"),
  error: new Audio("https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3"),
  login: new Audio("https://assets.mixkit.co/sfx/preview/mixkit-game-level-completed-2059.mp3"),
  background: new Audio("https://assets.mixkit.co/sfx/preview/mixkit-futuristic-ambient-1173.mp3"),
};

// Optional: loop background sound
sounds.background.loop = true;

export const playSound = (type) => {
  const sound = sounds[type];
  if (sound) {
    sound.currentTime = 0;
    sound.play().catch(() => {}); // avoid autoplay
  }
};

// Control background sound
export const startBackground = () => {
  sounds.background.volume = 0.2;
  sounds.background.play().catch(() => {});
};

export const stopBackground = () => {
  sounds.background.pause();
  sounds.background.currentTime = 0;
};
