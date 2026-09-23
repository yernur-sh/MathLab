"use client";

import { CheckCircle2, Copy, FunctionSquare, Search, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { SectionTitle } from "@/components/ui";

const formulaGroups = [
  {
    title: "Қысқаша көбейту формулалары", tone: "bg-violet-50 text-violet-700", formulas: [
      ["Қосындының квадраты", "(a + b)² = a² + 2ab + b²", "(x + 3)² = x² + 6x + 9"],
      ["Айырманың квадраты", "(a − b)² = a² − 2ab + b²", "(x − 5)² = x² − 10x + 25"],
      ["Квадраттар айырмасы", "a² − b² = (a − b)(a + b)", "x² − 16 = (x − 4)(x + 4)"],
      ["Кубтар қосындысы", "a³ + b³ = (a + b)(a² − ab + b²)", "x³ + 8 = (x + 2)(x² − 2x + 4)"],
      ["Кубтар айырмасы", "a³ − b³ = (a − b)(a² + ab + b²)", "x³ − 27 = (x − 3)(x² + 3x + 9)"],
    ],
  },
  {
    title: "Теңдеулер", tone: "bg-sky-50 text-sky-700", formulas: [
      ["Сызықтық теңдеу", "ax + b = 0 → x = −b / a", "3x − 12 = 0 → x = 4"],
      ["Квадрат теңдеу", "ax² + bx + c = 0", "2x² − 5x + 2 = 0"],
      ["Дискриминант", "D = b² − 4ac", "D > 0 — екі түбір, D = 0 — бір түбір"],
      ["Квадрат теңдеу түбірлері", "x₁,₂ = (−b ± √D) / 2a", "x² − 5x + 6 = 0 → x₁ = 2, x₂ = 3"],
      ["Виет теоремасы", "x₁ + x₂ = −b/a,  x₁x₂ = c/a", "x² − 7x + 12 = 0 → 3 және 4"],
    ],
  },
  {
    title: "Дәреже және түбір", tone: "bg-emerald-50 text-emerald-700", formulas: [
      ["Бірдей негізді көбейту", "aᵐ · aⁿ = aᵐ⁺ⁿ", "2³ · 2² = 2⁵ = 32"],
      ["Бөлінді дәрежесі", "aᵐ : aⁿ = aᵐ⁻ⁿ", "5⁴ : 5² = 5² = 25"],
      ["Дәреженің дәрежесі", "(aᵐ)ⁿ = aᵐⁿ", "(x²)³ = x⁶"],
      ["Көбейтіндінің түбірі", "√(ab) = √a · √b", "√36 = √(4 · 9) = 6"],
    ],
  },
  {
    title: "Пропорция және пайыз", tone: "bg-amber-50 text-amber-700", formulas: [
      ["Пропорцияның негізгі қасиеті", "a/b = c/d → ad = bc", "x/4 = 6/8 → x = 3"],
      ["Санның пайызын табу", "Бөлік = сан · p / 100", "240-тың 15%-ы = 36"],
      ["Пайыздық өзгеріс", "p = (жаңа − бастапқы) / бастапқы · 100%", "100-ден 120-ға: 20% өсті"],
      ["Орташа арифметикалық", "x̄ = (x₁ + x₂ + ... + xₙ) / n", "4, 6, 8 → x̄ = 6"],
    ],
  },
];

export default function FormulasPage() {
  const [query, setQuery] = useState("");
  const visibleGroups = useMemo(() => formulaGroups.map((group) => ({ ...group, formulas: group.formulas.filter(([name, formula, example]) => `${name} ${formula} ${example}`.toLowerCase().includes(query.toLowerCase().trim())) })).filter((group) => group.formulas.length), [query]);

  return <div className="bg-[linear-gradient(180deg,#faf8ff_0%,#ffffff_55%,#f8fbff_100%)] px-5 py-12 sm:py-16"><div className="mx-auto max-w-7xl"><SectionTitle eyebrow="04 · Алгебра" title="Алгебралық формулалар" description="Негізгі алгебралық формулаларды бір жерден тауып, мысалымен бірге қайтала. Формуланы есеп шығарғанда дұрыс қолдануға тырыс." /><div className="mt-9 rounded-[1.7rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-5"><div className="relative"><Search size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Формула іздеу..." className="selection-ring w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm font-semibold text-slate-700 outline-none placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white" /></div><div className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-400"><FunctionSquare size={15} className="text-violet-500" /> Формуладан кейін мысалды міндетті түрде қарап шық</div></div><div className="mt-8 grid gap-6 lg:grid-cols-2">{visibleGroups.map((group) => <section key={group.title} className="overflow-hidden rounded-[1.7rem] border border-slate-200 bg-white shadow-sm"><div className={`flex items-center gap-3 px-6 py-5 ${group.tone}`}><div className="grid h-10 w-10 place-items-center rounded-xl bg-white/80"><FunctionSquare size={20} /></div><h2 className="text-xl font-black">{group.title}</h2></div><div className="divide-y divide-slate-100">{group.formulas.map(([name, formula, example]) => <div key={name} className="p-5 sm:p-6"><div className="flex items-start justify-between gap-3"><h3 className="font-black text-slate-900">{name}</h3><button onClick={() => navigator.clipboard?.writeText(formula)} className="selection-ring rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-indigo-600" aria-label={`${name} формуласын көшіру`}><Copy size={15} /></button></div><div className="mt-3 rounded-2xl bg-slate-900 px-4 py-4 text-center text-lg font-black tracking-wide text-white sm:text-xl">{formula}</div><div className="mt-3 flex items-start gap-2 rounded-xl bg-emerald-50 px-3 py-2.5 text-sm text-emerald-900"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-600" /><span><b>Мысал:</b> {example}</span></div></div>)}</div></section>)}{visibleGroups.length === 0 && <div className="rounded-[1.7rem] border border-dashed border-slate-300 bg-white p-10 text-center lg:col-span-2"><Search size={28} className="mx-auto text-slate-300" /><h2 className="mt-3 font-black text-slate-800">Формула табылмады</h2><p className="mt-1 text-sm text-slate-500">Іздеу сөзін өзгертіп көр.</p></div>}</div><div className="mt-8 flex items-center gap-3 rounded-[1.5rem] border border-indigo-100 bg-indigo-50/80 p-5 text-sm leading-6 text-indigo-900"><Sparkles size={20} className="shrink-0 text-indigo-600" /><span><b>Есте сақта:</b> формуланы жаттаудан бұрын оның әрбір таңбасы нені білдіретінін түсініп ал.</span></div></div></div>;
}
