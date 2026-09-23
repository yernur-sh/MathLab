"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, Sparkles, Trophy, XCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { SectionTitle } from "@/components/ui";
import { saveQuizResult } from "@/lib/firebase-auth";

const questions = [
  { question: "3x + 6 = 21 теңдеуінің шешімі қандай?", options: ["x = 3", "x = 5", "x = 7", "x = 9"], answer: 1, hint: "Алдымен 6-ны азайтып, кейін 3-ке бөл." },
  { question: "a = 6, b = 8 болса, тікбұрышты үшбұрыштың гипотенузасы қандай?", options: ["10", "12", "14", "16"], answer: 0, hint: "Пифагор формуласын қолдан: c² = a² + b²." },
  { question: "x² − 5x + 6 = 0 теңдеуінің түбірлері?", options: ["1 және 6", "2 және 3", "−2 және −3", "0 және 5"], answer: 1, hint: "Көбейтіндісі 6, қосындысы 5 болатын сандарды ізде." },
  { question: "Радиусы 3 болатын шеңбердің ауданы қайсы?", options: ["3π", "6π", "9π", "12π"], answer: 2, hint: "S = πr²." },
  { question: "2, 4, 6, 8 сандарының арифметикалық ортасы?", options: ["4", "5", "6", "20"], answer: 1, hint: "Барлығын қосып, сандар санына бөл." },
  { question: "P(A)=0.25 нені білдіреді?", options: ["25% ықтималдық", "2.5% ықтималдық", "75% ықтималдық", "4% ықтималдық"], answer: 0, hint: "0.25 × 100% = 25%." },
  { question: "y = 2x + 1 функциясының көлбеулік коэффициенті қандай?", options: ["1", "2", "−2", "3"], answer: 1, hint: "y = kx + b формуласында x алдындағы санды тап." },
  { question: "D = b² − 4ac, a=1, b=4, c=4 болса, D неге тең?", options: ["0", "4", "8", "16"], answer: 0, hint: "16 − 16 = 0." },
];

export default function PracticePage() {
  const { user } = useAuth();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const question = questions[index];
  const progress = Math.round(((index + (selected !== null ? 1 : 0)) / questions.length) * 100);
  const percent = useMemo(() => Math.round((score / questions.length) * 100), [score]);

  useEffect(() => {
    if (!done || !user || saved) return;
    let ignore = false;
    setSaving(true);
    saveQuizResult(user, score, questions.length).then(() => { if (!ignore) setSaved(true); }).catch(() => {}).finally(() => { if (!ignore) setSaving(false); });
    return () => { ignore = true; };
  }, [done, user, score, saved]);

  function choose(option: number) {
    if (selected !== null) return;
    setSelected(option);
    if (option === question.answer) setScore(v => v + 1);
  }

  function next() {
    if (selected === null) return;
    if (index === questions.length - 1) setDone(true);
    else { setIndex(v => v + 1); setSelected(null); }
  }

  function restart() {
    setIndex(0); setSelected(null); setScore(0); setDone(false); setSaved(false); setSaving(false);
  }

  if (done) {
    return <div className="bg-[linear-gradient(180deg,#f7fbff,#ffffff)] px-5 py-16"><div className="mx-auto max-w-3xl"><div className="rounded-[2rem] border border-slate-200 bg-white p-7 text-center shadow-xl shadow-slate-200/50 sm:p-10"><div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-amber-50 text-amber-500"><Trophy size={30} /></div><div className="mt-5 text-xs font-black uppercase tracking-[0.2em] text-indigo-500">Нәтиже</div><h1 className="mt-2 display-font text-5xl font-black text-slate-900">{score} / {questions.length}</h1><p className="mx-auto mt-3 max-w-md text-slate-500">Сіз {percent}% нәтиже көрсеттіңіз. Қателерді қайта қарап, тестті тағы бір рет орындауға болады.</p><div className="mt-8 grid gap-3 sm:grid-cols-3"><div className="rounded-2xl bg-emerald-50 p-4"><div className="text-xs font-bold text-emerald-600">Дұрыс</div><div className="mt-1 text-2xl font-black text-emerald-800">{score}</div></div><div className="rounded-2xl bg-rose-50 p-4"><div className="text-xs font-bold text-rose-600">Қате</div><div className="mt-1 text-2xl font-black text-rose-800">{questions.length - score}</div></div><div className="rounded-2xl bg-indigo-50 p-4"><div className="text-xs font-bold text-indigo-600">Пайыз</div><div className="mt-1 text-2xl font-black text-indigo-800">{percent}%</div></div></div><div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><button onClick={restart} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-5 py-3 font-bold text-slate-700 hover:bg-slate-50"><RotateCcw size={17} /> Қайта орындау</button><Link href="/profile" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 font-bold text-white">Профильді көру <ArrowRight size={17} /></Link></div>{user && <div className="mt-5 text-xs text-slate-400">{saving ? "Нәтиже сақталуда..." : saved ? "✓ Нәтиже Firebase профиліңізге сақталды." : ""}</div>}</div></div></div>;
  }

  return (
    <div className="bg-[linear-gradient(180deg,#f8fbff,#fff)] px-5 py-14">
      <div className="mx-auto max-w-4xl">
        <SectionTitle eyebrow="02 · Практика" title="Өзіңді тексер" description="8 қысқа есеп. Әр сұраққа бір жауап таңда. Дұрыс жауаптан кейін келесі қадамға өтесің." />
        <div className="mt-9 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
          <div className="h-2 bg-slate-100"><div className="h-full rounded-full bg-indigo-500 transition-all" style={{ width: `${Math.max(8, progress)}%` }} /></div>
          <div className="p-6 sm:p-9">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.15em] text-slate-400"><span>Сұрақ {index + 1} / {questions.length}</span><span>{Math.min(progress, 100)}%</span></div>
            <h2 className="mt-6 text-2xl font-black leading-9 text-slate-900 sm:text-3xl">{question.question}</h2>
            <div className="mt-7 grid gap-3">{question.options.map((option, i) => { const answered = selected !== null; const correct = i === question.answer; const chosen = i === selected; let cls = "border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/40"; if (answered && correct) cls = "border-emerald-300 bg-emerald-50"; else if (answered && chosen) cls = "border-rose-300 bg-rose-50"; return <button key={option} onClick={() => choose(i)} className={`selection-ring flex items-center gap-4 rounded-2xl border px-4 py-4 text-left transition ${cls}`}><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-slate-100 text-sm font-black text-slate-600">{String.fromCharCode(65 + i)}</span><span className="font-semibold text-slate-700">{option}</span>{answered && correct && <CheckCircle2 className="ml-auto shrink-0 text-emerald-500" size={19} />}{answered && chosen && !correct && <XCircle className="ml-auto shrink-0 text-rose-500" size={19} />}</button> })}</div>
            {selected !== null && <div className={`mt-5 rounded-2xl px-4 py-3 text-sm leading-6 ${selected === question.answer ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-900"}`}><span className="font-bold">Түсіндірме:</span> {question.hint}</div>}
            <div className="mt-7 flex items-center justify-between gap-3"><Link href="/theory" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800"><ArrowLeft size={16} /> Теорияға</Link><button disabled={selected === null} onClick={next} className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 disabled:opacity-40">{index === questions.length - 1 ? "Нәтижені көру" : "Келесі"} <ArrowRight size={17} /></button></div>
          </div>
        </div>
        <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-400"><Sparkles size={14} /> Дұрыс жауаптарды профильге сақтау үшін аккаунтқа кіріңіз.</div>
      </div>
    </div>
  );
}
