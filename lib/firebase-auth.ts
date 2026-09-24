import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "./firebase";

export type Progress = {
  bestScore: number;
  bestTotal: number;
  quizzesTaken: number;
  solvedQuestions: number;
  updatedAt?: number;
};

export async function registerWithEmail(name: string, email: string, password: string) {
  const result = await createUserWithEmailAndPassword(auth, email.trim(), password);
  await updateProfile(result.user, { displayName: name.trim() });
  void ensureProgress(result.user);
  return result.user;
}

export async function loginWithEmail(email: string, password: string) {
  const result = await signInWithEmailAndPassword(auth, email.trim(), password);
  void ensureProgress(result.user);
  return result.user;
}

export async function loginWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider);
  void ensureProgress(result.user);
  return result.user;
}

export function logout() {
  return signOut(auth);
}

const progressKey = (user: User) => `mathlab-progress-${user.uid}`;

function readCachedProgress(user: User): Progress | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(progressKey(user));
    return value ? JSON.parse(value) as Progress : null;
  } catch {
    return null;
  }
}

function cacheProgress(user: User, progress: Progress) {
  if (typeof window !== "undefined") window.localStorage.setItem(progressKey(user), JSON.stringify(progress));
}

export async function ensureProgress(user: User) {
  try {
    if (!readCachedProgress(user)) cacheProgress(user, { bestScore: 0, bestTotal: 0, quizzesTaken: 0, solvedQuestions: 0 });
    const ref = doc(db, "users", user.uid);
    const snapshot = await getDoc(ref);
    if (!snapshot.exists()) {
      const initial: Progress = { bestScore: 0, bestTotal: 0, quizzesTaken: 0, solvedQuestions: 0, updatedAt: Date.now() };
      await setDoc(ref, { ...initial, email: user.email, displayName: user.displayName || "Оқушы" });
    }
  } catch {
    // Authentication should not fail if Firestore is temporarily unavailable.
  }
}

export async function getProgress(user: User): Promise<Progress> {
  const cached = readCachedProgress(user);
  if (cached) return cached;
  try {
    const snapshot = await getDoc(doc(db, "users", user.uid));
    if (!snapshot.exists()) return { bestScore: 0, bestTotal: 0, quizzesTaken: 0, solvedQuestions: 0 };
    const data = snapshot.data();
    const progress: Progress = {
      bestScore: Number(data.bestScore || 0),
      bestTotal: Number(data.bestTotal || data.totalQuestionsPerQuiz || 8),
      quizzesTaken: Number(data.quizzesTaken || 0),
      solvedQuestions: Number(data.solvedQuestions || 0),
      updatedAt: data.updatedAt ? Number(data.updatedAt) : undefined,
    };
    cacheProgress(user, progress);
    return progress;
  } catch {
    return { bestScore: 0, bestTotal: 0, quizzesTaken: 0, solvedQuestions: 0 };
  }
}

export async function saveQuizResult(user: User, score: number, total: number) {
  const current = readCachedProgress(user) || { bestScore: 0, bestTotal: 0, quizzesTaken: 0, solvedQuestions: 0 };
  const ref = doc(db, "users", user.uid);
  const next: Progress = {
    bestScore: Math.max(current.bestScore, score),
    bestTotal: score > current.bestScore ? total : current.bestTotal || total,
    quizzesTaken: current.quizzesTaken + 1,
    solvedQuestions: current.solvedQuestions + score,
    updatedAt: Date.now(),
  };
  cacheProgress(user, next);
  await setDoc(ref, { ...next, totalQuestionsPerQuiz: total, email: user.email, displayName: user.displayName || "Оқушы" }, { merge: true });
  return next;
}
