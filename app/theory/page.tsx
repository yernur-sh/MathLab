"use client";

import { BookOpenCheck, Calculator, ChevronDown, CircleHelp, FunctionSquare, Shapes, Sparkles } from "lucide-react";
import { useState } from "react";
import { SectionTitle } from "@/components/ui";

const topics = [
  { id: "alg", icon: FunctionSquare, title: "Алгебра және теңдеулер", color: "bg-violet-50 text-violet-700", intro: "Айнымалы, теңдеу, өрнек және квадрат теңдеудің негізгі логикасы.", bullets: ["Сызықтық теңдеу: ax + b = 0", "Квадрат теңдеу: ax² + bx + c = 0", "Дискриминант: D = b² − 4ac"] },
  { id: "geo", icon: Shapes, title: "Геометрия", color: "bg-sky-50 text-sky-700", intro: "Фигуралардың өлшемдерін формула арқылы байланыстыру.", bullets: ["Үшбұрыштың ауданы: S = ½ah", "Пифагор теоремасы: a² + b² = c²", "Шеңбер: C = 2πr, S = πr²"] },
  { id: "func", icon: FunctionSquare, title: "Функциялар", color: "bg-emerald-50 text-emerald-700", intro: "x өзгергенде y қалай өзгеретінін график және формула арқылы түсіну.", bullets: ["y = kx + b сызықтық функциясы", "Координаталық жазықтық", "Өсу, кему және нөлдік мәндер"] },
  { id: "prob", icon: CircleHelp, title: "Ықтималдық", color: "bg-amber-50 text-amber-700", intro: "Кездейсоқ оқиғаның мүмкіндігін сандық түрде бағалау.", bullets: ["P(A) = m/n негізгі формуласы", "Барлық нәтижелердің тең ықтималдығы", "Тәжірибе мен теориялық ықтималдық"] },
];

const quickFormulas = [
  ["Квадрат теңдеу", "D = b² − 4ac"],
  ["Пифагор", "a² + b² = c²"],
  ["Шеңбер ауданы", "S = πr²"],
  ["Орташа мән", "x̄ = (x₁ + … + xₙ) / n"],
];

export default function TheoryPage() {
  const [open, setOpen] = useState("alg");
  return (
    <div className="bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_50%,#faf8ff_100%)]">
      <section className="mx-auto max-w-7xl px-5 pb-10 pt-16">
        <SectionTitle eyebrow="01 · Теория" title="Тақырыптар кабинеті" description="Әр бөлімді ашып, негізгі идеяларды қайтала. Формуланы жаттап қана қоймай, оның қай жерде қолданылатынын бірге қарастыр." />
        <div className="mt-9 grid gap-8 lg:grid-cols-[1.15fr_.85fr]">
          <div className="space-y-3">
            {topics.map((topic) => {
              const Icon = topic.icon;
              const expanded = open === topic.id;
              return <div key={topic.id} className="overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-sm"><button onClick={() => setOpen(expanded ? "" : topic.id)} className="selection-ring flex w-full items-center gap-4 p-5 text-left sm:p-6"><div className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${topic.color}`}><Icon size={22} /></div><div className="min-w-0 flex-1"><h2 className="text-lg font-black text-slate-900">{topic.title}</h2><p className="mt-1 text-sm leading-6 text-slate-500">{topic.intro}</p></div><ChevronDown size={20} className={`shrink-0 text-slate-400 transition ${expanded ? "rotate-180" : ""}`} /></button>{expanded && <div className="border-t border-slate-100 px-5 pb-6 pt-2 sm:px-6"><div className="grid gap-3 sm:grid-cols-3">{topic.bullets.map((bullet, index) => <div key={bullet} className="rounded-2xl bg-slate-50 p-4"><div className="text-xs font-black text-indigo-500">{index + 1}</div><div className="mt-2 text-sm font-semibold leading-6 text-slate-700">{bullet}</div></div>)}</div></div>}</div>
            })}
          </div>

          <div className="space-y-5">
            <div className="rounded-[1.7rem] border border-indigo-100 bg-indigo-50/70 p-6"><div className="flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-indigo-600 shadow-sm"><BookOpenCheck size={21} /></div><div><div className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-500">Оқу алгоритмі</div><div className="mt-1 text-lg font-black text-slate-900">Түсін → Байқа → Шеш</div></div></div><p className="mt-4 text-sm leading-6 text-slate-600">Алдымен анықтаманы оқы, кейін мысалдан құрылымын байқа, соңында практикада өзің шешіп көр.</p></div>
            <div className="rounded-[1.7rem] border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-center gap-2"><Calculator size={18} className="text-indigo-600" /><h3 className="text-lg font-black">Жылдам формулалар</h3></div><div className="mt-4 grid gap-3">{quickFormulas.map(([label, formula]) => <div key={label} className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3"><span className="text-sm font-semibold text-slate-500">{label}</span><span className="font-black text-slate-800">{formula}</span></div>)}</div></div>
            <div className="rounded-[1.7rem] border border-emerald-100 bg-emerald-50/70 p-6"><div className="flex items-center gap-3"><Sparkles size={20} className="text-emerald-600" /><div className="text-sm font-bold text-emerald-900">Келесі қадам</div></div><p className="mt-2 text-sm leading-6 text-emerald-900/70">Теориядан кейін практика бетіне өтіп, 8 сұрақтық шағын тестті орында.</p></div>
          </div>
        </div>
      </section>
    </div>
  );
}
