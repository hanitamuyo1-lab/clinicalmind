const KEY_PREFIX = 'clinicalmind_progress_';

export async function load(uid) {
  try {
    const raw = localStorage.getItem(KEY_PREFIX + uid);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function save(uid, data) {
  try {
    localStorage.setItem(KEY_PREFIX + uid, JSON.stringify(data));
  } catch {
    /* storage unavailable (private mode / quota) — progress just won't persist */
  }
}
