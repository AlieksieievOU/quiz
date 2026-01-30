// Sounds
import uiNotificationSound from '../assets/sounds/ui_notification.wav';
import uiRejectSound from '../assets/sounds/ui_reject.wav';
import uiCoinSound from '../assets/sounds/ui_coin.wav';
import uiDiamondSound from '../assets/sounds/ui_diamond.wav';
import uiLevelSplashSound from '../assets/sounds/ui_notification_2.wav';
import uiWinSound from '../assets/sounds/ui_win.mp3';

export const audioFiles = {
  notification: new Audio(uiNotificationSound),
  reject: new Audio(uiRejectSound),
  coin: new Audio(uiCoinSound),
  diamond: new Audio(uiDiamondSound),
  levelSplash: new Audio(uiLevelSplashSound),
  win: new Audio(uiWinSound),
};

// Initialize audio properties
Object.values(audioFiles).forEach(audio => {
  audio.preload = 'auto';
  audio.volume = 0.5;
});

export const playSound = (soundName, isMuted) => {
  if (isMuted || !audioFiles[soundName]) return;
  const sound = audioFiles[soundName];
  sound.currentTime = 0;
  sound.play().catch(e => console.error(`Audio play failed for ${soundName}:`, e));
};

export const UI_ASSETS = [
  'bg_transparent.png',
  '1768855134283-new.png',
  'image7-new.png',
  'image11-new.png',
  'win_transparent-new.png',
  'errors.png',
  ...Array.from({ length: 41 }, (_, i) => {
    const id = i + 1;
    const ext = id >= 26 && id <= 39 ? 'jpg' : 'png';
    return `quiz-images/${id}.${ext}`;
  })
];

export const preloadAssets = () => {
  UI_ASSETS.forEach(src => {
    const img = new Image();
    img.src = `${import.meta.env.BASE_URL}assets/${src}`;
  });
};
