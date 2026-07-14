import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/client.js';

export async function load(uid) {
  const snap = await getDoc(doc(db, 'progress', uid));
  return snap.exists() ? snap.data() : null;
}

export async function save(uid, data) {
  await setDoc(doc(db, 'progress', uid), data);
}
