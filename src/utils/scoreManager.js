const KEY = 'matka_highscore';

export function getHighScore() {
  return parseInt(localStorage.getItem(KEY) || '0', 10);
}

export function saveHighScore(score) {
  if (score > getHighScore()) {
    localStorage.setItem(KEY, String(score));
  }
}
