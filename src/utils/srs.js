// Spaced Repetition System — Anki-style intervals with localStorage persistence

const INTERVALS = {
  again: 60,        // 1 minute
  hard: 600,        // 10 minutes
  good: 86400,      // 1 day
  easy: 259200,     // 3 days
};

const EASE_MULTIPLIERS = {
  again: 0.5,
  hard: 0.8,
  good: 1.5,
  easy: 2.5,
};

const STORAGE_KEY = 'nihongo-srs-data';

export function loadSRSData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveSRSData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    
    // Sync with backend if token exists
    const token = localStorage.getItem('nihongo-auth-token');
    if (token) {
      fetch('http://localhost:3001/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ srsData: data })
      }).catch(console.error);
    }
  } catch { /* quota exceeded — silent */ }
}

export function getNextInterval(currentInterval, grade) {
  if (!currentInterval || currentInterval === 0) return INTERVALS[grade];
  return Math.round(currentInterval * EASE_MULTIPLIERS[grade]);
}

export function isDue(item) {
  if (!item || !item.nextReview) return true;
  return Date.now() >= item.nextReview;
}

export function gradeItem(itemKey, grade) {
  const data = loadSRSData();
  const item = data[itemKey] || { interval: 0, nextReview: 0, reviewCount: 0 };

  item.interval = getNextInterval(item.interval, grade);
  item.nextReview = Date.now() + item.interval * 1000;
  item.lastReview = Date.now();
  item.reviewCount = (item.reviewCount || 0) + 1;
  item.lastGrade = grade;

  data[itemKey] = item;
  saveSRSData(data);
  return item;
}

export function getDueItems(allKeys) {
  const data = loadSRSData();
  return allKeys.filter(key => {
    const item = data[key];
    return !item || isDue(item);
  });
}

export function getDueCount(allKeys) {
  return getDueItems(allKeys).length;
}

export function getItemData(itemKey) {
  const data = loadSRSData();
  return data[itemKey] || null;
}

export function getReviewedCount(allKeys) {
  const data = loadSRSData();
  return allKeys.filter(key => data[key] && data[key].reviewCount > 0).length;
}
