"use client";

import Link from "next/link";
import { Award, BarChart3, BookOpen, CheckCircle2, LogOut, Mail, Medal, ShieldCheck, Sparkles, Trophy, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { getProgress, type Progress } from "@/lib/firebase-auth";

export default function ProfilePage() {
  const { user, loading, logoutUser } = useAuth();
  const router = useRouter();
  const [progress, setProgress] = useState<Progress>({ bestScore: 0, quizzesTaken: 0, solvedQuestions: 0 });

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;
    getProgress(user).then(setProgress);
  }, [user]);

  if (loading || !user) return <div className="grid min-h-[70vh] place-items-center"><div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" /></div>;

  const bestPercent = Math.round((progress.bestScore / 8) * 100);
  const level = progress.quizzesTaken >= 5 ? "Зерттеуші" : progress.quizzesTaken >= 2 ? "Практикант" : "Бастаушы";

  return (
    <div className="bg-[linear-gradient(180deg,#f7fbff,#ffffff)] px-5 py-14">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[2rem] bg-slate-900 p-6 text-white sm:p-9"><div className="grid gap-7 md:grid-cols-[auto_1fr_auto] md:items-center"><div className="grid h-24 w-24 place-items-center overflow-hidden rounded-[1.7rem] bg-white/10 ring-1 ring-white/15">{user.photoURL ? <img src={user.photoURL} alt="Профиль" className="h-full w-full object-cover" /> : <UserRound size={38} className="text-indigo-200" />}</div><div><div className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-300">Жеке профиль</div><h1 className="mt-2 text-3xl font-black sm:text-4xl">{user.displayName || user.email?.split("@")[0] || "Оқушы"}</h1><div className="mt-2 flex flex-wrap gap-3 text-sm text-slate-300"><span className="inline-flex items-center gap-1.5"><Mail size={15} />{user.email}</span><span className="inline-flex items-center gap-1.5"><Medal size={15} />{level}</span></div></div><button onClick={async () => { await logoutUser(); router.replace("/"); }} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold text-white hover:bg-white/15"><LogOut size={16} /> Шығу</button></div></div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"><div className="rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Үздік нәтиже</span><Trophy size={18} className="text-amber-500" /></div><div className="mt-3 text-3xl font-black text-slate-900">{bestPercent}%</div><div className="mt-1 text-xs text-slate-500">{progress.bestScore}/8 дұрыс</div></div><div className="rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Тест саны</span><BarChart3 size={18} className="text-indigo-500" /></div><div className="mt-3 text-3xl font-black text-slate-900">{progress.quizzesTaken}</div><div className="mt-1 text-xs text-slate-500">аяқталған</div></div><div className="rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Дұрыс жауап</span><CheckCircle2 size={18} className="text-emerald-500" /></div><div className="mt-3 text-3xl font-black text-slate-900">{progress.solvedQuestions}</div><div className="mt-1 text-xs text-slate-500">барлық тест бойынша</div></div><div className="rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Деңгей</span><Award size={18} className="text-violet-500" /></div><div className="mt-3 text-2xl font-black text-slate-900">{level}</div><div className="mt-1 text-xs text-slate-500">оқу белсенділігіне қарай</div></div></div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_.75fr]">
          <div className="rounded-[1.7rem] border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><div><div className="text-xs font-black uppercase tracking-[0.2em] text-indigo-500">Келесі қадам</div><h2 className="mt-2 text-2xl font-black">Прогресті жалғастыр</h2></div><Sparkles className="text-indigo-500" /></div><div className="mt-6 grid gap-3 sm:grid-cols-2"><Link href="/theory" className="group rounded-2xl border border-slate-200 p-4 hover:bg-slate-50"><BookOpen size={19} className="text-sky-600" /><div className="mt-3 font-black">Теорияны қайталау</div><div className="mt-1 text-xs leading-5 text-slate-500">Формулалар мен анықтамаларды шол</div></Link><Link href="/practice" className="group rounded-2xl border border-slate-200 p-4 hover:bg-slate-50"><Trophy size={19} className="text-amber-600" /><div className="mt-3 font-black">Жаңа тест бастау</div><div className="mt-1 text-xs leading-5 text-slate-500">8 сұрақтық жаттығуды қайтала</div></Link></div></div>
          <div className="rounded-[1.7rem] border border-emerald-100 bg-emerald-50/70 p-6"><div className="flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-emerald-600 shadow-sm"><ShieldCheck size={20} /></div><div><div className="text-xs font-black uppercase tracking-[0.18em] text-emerald-600">Профиль</div><h2 className="mt-1 text-lg font-black text-emerald-950">Нәтижелер сақталады</h2></div></div><p className="mt-4 text-sm leading-6 text-emerald-900/70">Firebase Firestore арқылы өз аккаунтыңыздың оқу прогресі сақталады. Басқа қолданушы сіздің құжатыңызға ереже бойынша қол жеткізе алмайды.</p></div>
        </div>
      </div>
    </div>
  );
}
