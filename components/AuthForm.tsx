"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Flame, Loader2, Mail, Lock, UserRound } from "lucide-react";
import { useState } from "react";
import { useAuth } from "./AuthProvider";
import MathDecor from "./MathDecor";

function friendlyError(error: unknown) {
  const code = (error as { code?: string })?.code || "";
  const messages: Record<string, string> = {
    "auth/email-already-in-use": "Бұл email бұрын тіркелген.",
    "auth/invalid-credential": "Email немесе құпиясөз қате.",
    "auth/invalid-email": "Email форматы дұрыс емес.",
    "auth/weak-password": "Құпиясөз кемінде 6 таңба болуы керек.",
    "auth/popup-closed-by-user": "Google терезесі жабылды.",
    "auth/operation-not-allowed": "Firebase-де бұл кіру тәсілі қосылмаған.",
    "auth/network-request-failed": "Желі қатесі. Интернетті тексеріңіз.",
  };
  return messages[code] || "Әрекетті орындау кезінде қате шықты. Firebase баптауларын тексеріңіз.";
}

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const isRegister = mode === "register";
  const router = useRouter();
  const { login, register, googleLogin } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (isRegister) await register(name, email, password);
      else await login(email, password);
      router.replace("/profile");
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setBusy(false);
    }
  }

  async function google() {
    setError("");
    setBusy(true);
    try {
      await googleLogin();
      router.replace("/profile");
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative min-h-[calc(100vh-74px)] overflow-hidden bg-[linear-gradient(135deg,#f7fbff,#f6f3ff_48%,#f2fff9)] px-5 py-12">
      <MathDecor />
      <div className="relative mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_430px] lg:items-center">
        <div className="hidden lg:block">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-bold text-indigo-700 shadow-sm ring-1 ring-slate-200">
            <Flame size={15} /> MathLab аккаунты
          </div>
          <h1 className="display-font max-w-xl text-6xl font-black leading-[0.98] text-slate-900">
            Математиканы <span className="text-indigo-600">зерттеп</span>, нәтижеңді бақыла.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">Аккаунт арқылы тест нәтижелерін сақтап, жеке прогресті көріңіз. Google немесе email арқылы кіруге болады.</p>
        </div>

        <div className="glass relative rounded-[2rem] p-6 sm:p-8">
          <div className="mb-6">
            <div className="text-xs font-black uppercase tracking-[0.2em] text-indigo-500">{isRegister ? "Жаңа аккаунт" : "Қош келдіңіз"}</div>
            <h2 className="mt-2 text-3xl font-black text-slate-900">{isRegister ? "Тіркелу" : "Кіру"}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">{isRegister ? "Прогресіңізді сақтау үшін жеке профиль жасаңыз." : "Жеке кабинетіңізге өтіп, оқуды жалғастырыңыз."}</p>
          </div>

          <button onClick={google} disabled={busy} className="selection-ring flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.35 12.23c0-.71-.06-1.4-.18-2.05H12v3.88h5.24a4.48 4.48 0 0 1-1.94 2.94v2.43h3.14c1.84-1.69 2.91-4.18 2.91-7.2Z"/><path fill="#34A853" d="M12 21.75c2.63 0 4.84-.87 6.45-2.35l-3.14-2.43c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.04H3.28v2.51A9.75 9.75 0 0 0 12 21.75Z"/><path fill="#FBBC05" d="M6.53 13.85a5.86 5.86 0 0 1 0-3.7V7.64H3.28a9.75 9.75 0 0 0 0 8.72l3.25-2.51Z"/><path fill="#EA4335" d="M12 6.11c1.43 0 2.72.49 3.73 1.46l2.8-2.8C16.84 3.2 14.63 2.25 12 2.25a9.75 9.75 0 0 0-8.72 5.39l3.25 2.51C7.3 7.83 9.46 6.11 12 6.11Z"/></svg>
            Google арқылы жалғастыру
          </button>

          <div className="my-5 flex items-center gap-3 text-xs font-semibold text-slate-400"><span className="h-px flex-1 bg-slate-200" /> немесе <span className="h-px flex-1 bg-slate-200" /></div>

          <form onSubmit={submit} className="space-y-4">
            {isRegister && <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Атыңыз</span><div className="relative"><UserRound className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input required value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white/90 px-10 py-3.5 text-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100" placeholder="Мысалы, Әлихан" /></div></label>}
            <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Email</span><div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white/90 px-10 py-3.5 text-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100" placeholder="you@example.com" /></div></label>
            <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Құпиясөз</span><div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input required minLength={6} type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white/90 px-10 py-3.5 pr-11 text-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100" placeholder="Кемінде 6 таңба" /><button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" aria-label="Құпиясөзді көрсету">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></label>

            {error && <div className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm leading-6 text-rose-700">{error}</div>}

            <button disabled={busy} className="selection-ring flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700 disabled:opacity-60">
              {busy && <Loader2 size={17} className="animate-spin" />}
              {isRegister ? "Аккаунт жасау" : "Кіру"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            {isRegister ? "Аккаунтыңыз бар ма?" : "Аккаунтыңыз жоқ па?"}{" "}
            <Link href={isRegister ? "/login" : "/register"} className="font-bold text-indigo-600 hover:text-indigo-800">{isRegister ? "Кіру" : "Тіркелу"}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
