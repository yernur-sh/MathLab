"use client";

import { CheckCircle2, ChevronDown, Filter, Lightbulb, Search, Sigma, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { SectionTitle } from "@/components/ui";

const problems = [
  { id: 1, type: "Сан есептері", title: "Бөлшектерді қосу", question: "3/4 + 2/3 өрнегінің мәнін тап.", steps: ["Ортақ бөлім: 12", "3/4 = 9/12, 2/3 = 8/12", "9/12 + 8/12 = 17/12"], answer: "Жауабы: 17/12 = 1 5/12" },
  { id: 2, type: "Сан есептері", title: "Пайызды есептеу", question: "480 санының 25%-ын тап.", steps: ["25% = 25/100 = 0,25", "480 · 0,25 = 120"], answer: "Жауабы: 120" },
  { id: 3, type: "Мәтін есептері", title: "Қозғалыс есебі", question: "Автобус 60 км/сағ жылдамдықпен 3 сағат жүрді. Ол қанша жол жүрді?", steps: ["Жол формуласы: s = v · t", "s = 60 · 3 = 180 км"], answer: "Жауабы: 180 км" },
  { id: 4, type: "Мәтін есептері", title: "Жұмыс өнімділігі", question: "Бір жұмысшы жұмысты 6 күнде, екіншісі 3 күнде бітіреді. Екеуі бірге неше күнде бітіреді?", steps: ["Бір күндік жұмыс: 1/6 + 1/3 = 1/2", "Бүкіл жұмысты орындау уақыты: 1 : 1/2"], answer: "Жауабы: 2 күн" },
  { id: 5, type: "Алгебра", title: "Сызықтық теңдеу", question: "5x − 12 = 3x + 8 теңдеуін шеш.", steps: ["5x − 3x = 8 + 12", "2x = 20", "x = 10"], answer: "Жауабы: x = 10" },
  { id: 6, type: "Алгебра", title: "Квадрат теңдеу", question: "x² − 7x + 12 = 0 теңдеуін шеш.", steps: ["12-нің көбейтіндісі, 7-нің қосындысы: 3 және 4", "(x − 3)(x − 4) = 0"], answer: "Жауабы: x₁ = 3, x₂ = 4" },
  { id: 7, type: "Геометрия", title: "Үшбұрыш ауданы", question: "Табаны 14 см, биіктігі 5 см үшбұрыштың ауданын тап.", steps: ["S = 1/2 · a · h", "S = 1/2 · 14 · 5 = 35 см²"], answer: "Жауабы: 35 см²" },
  { id: 8, type: "Геометрия", title: "Тік төртбұрыш", question: "Ұзындығы 12 см, ені 7 см тік төртбұрыштың периметрін тап.", steps: ["P = 2(a + b)", "P = 2(12 + 7) = 38 см"], answer: "Жауабы: 38 см" },
  { id: 9, type: "Геометрия", title: "Пифагор теоремасы", question: "Катеттері 9 см және 12 см болатын үшбұрыштың гипотенузасын тап.", steps: ["c² = 9² + 12² = 81 + 144 = 225", "c = √225 = 15 см"], answer: "Жауабы: 15 см" },
  { id: 10, type: "Функциялар", title: "Функция мәні", question: "f(x) = 4x − 1 болса, f(6) мәнін тап.", steps: ["f(6) = 4 · 6 − 1", "f(6) = 24 − 1 = 23"], answer: "Жауабы: 23" },
  { id: 11, type: "Прогрессия", title: "Арифметикалық прогрессия", question: "7, 11, 15, ... прогрессиясының 8-мүшесін тап.", steps: ["a₁ = 7, d = 4", "a₈ = 7 + (8 − 1) · 4 = 35"], answer: "Жауабы: 35" },
  { id: 12, type: "Статистика", title: "Орташа арифметикалық", question: "12, 15, 9, 14, 10 сандарының орташа мәнін тап.", steps: ["Қосынды: 12 + 15 + 9 + 14 + 10 = 60", "n = 5, сондықтан 60 : 5 = 12"], answer: "Жауабы: 12" },
  { id: 13, type: "Ықтималдық", title: "Кездейсоқ таңдау", question: "Қорапта 4 ақ және 6 қара қалам бар. Ақ қалам алу ықтималдығы қандай?", steps: ["Барлық қалам: 10", "Қолайлы нәтиже: 4", "P = 4/10 = 2/5"], answer: "Жауабы: 2/5 немесе 40%" },
  { id: 14, type: "Логикалық есептер", title: "Жас туралы есеп", question: "Әкесінің жасы баласының жасынан 3 есе үлкен. Екеуінің жасы қосқанда 48. Баласы неше жаста?", steps: ["Бала жасы x, әке жасы 3x", "x + 3x = 48", "4x = 48, x = 12"], answer: "Жауабы: бала 12 жаста, әке 36 жаста" },
  { id: 15, type: "Логикалық есептер", title: "Заңдылықты тап", question: "2, 6, 12, 20, 30, ... тізбегінің келесі мүшесін тап.", steps: ["Айырмалар: 4, 6, 8, 10", "Келесі айырма 12 болады", "30 + 12 = 42"], answer: "Жауабы: 42" },
];

export default function PracticePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Барлығы");
  const [open, setOpen] = useState<number | null>(null);
  const categories = ["Барлығы", ...Array.from(new Set(problems.map((problem) => problem.type)))];
  const filtered = useMemo(() => problems.filter((problem) => {
    const matchesCategory = category === "Барлығы" || problem.type === category;
    const text = `${problem.title} ${problem.question} ${problem.type}`.toLowerCase();
    return matchesCategory && text.includes(query.toLowerCase().trim());
  }), [category, query]);

  return (
    <div className="bg-[linear-gradient(180deg,#f8fbff,#fffdf9)] px-5 py-12 sm:py-14">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="03 · Практика" title="Есептер жинағы" description="Әртүрлі тақырыптағы сан, мәтін және логикалық есептерді өз бетіңше шығарып көр. Жауабын тексеру үшін есепті аш." />
        <div className="mt-9 rounded-[1.7rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-5"><div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><label className="relative block flex-1"><Search size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Есепті немесе тақырыпты іздеу..." className="selection-ring w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm font-semibold text-slate-700 outline-none placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white" /></label><div className="flex items-center gap-2 overflow-x-auto pb-1"><Filter size={17} className="shrink-0 text-slate-400" />{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`whitespace-nowrap rounded-xl px-3 py-2 text-sm font-bold transition ${category === item ? "bg-indigo-600 text-white shadow-sm" : "bg-slate-50 text-slate-500 hover:bg-indigo-50 hover:text-indigo-700"}`}>{item}</button>)}</div></div><div className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-400"><Sigma size={15} className="text-indigo-500" /> {filtered.length} есеп • Шешу жолы және жауаппен</div></div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{filtered.map((problem) => { const expanded = open === problem.id; return <article key={problem.id} className="overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"><button onClick={() => setOpen(expanded ? null : problem.id)} className="selection-ring flex w-full items-start gap-4 p-5 text-left"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-indigo-50 text-indigo-600"><Sigma size={20} /></div><div className="min-w-0 flex-1"><div className="mb-2 text-[11px] font-black uppercase tracking-[0.15em] text-indigo-500">{problem.type}</div><h2 className="font-black text-slate-900">{problem.title}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{problem.question}</p></div><ChevronDown size={18} className={`mt-1 shrink-0 text-slate-400 transition ${expanded ? "rotate-180" : ""}`} /></button>{expanded && <div className="border-t border-slate-100 px-5 pb-5 pt-4"><div className="rounded-2xl bg-slate-50 p-4"><div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-slate-500"><Lightbulb size={15} className="text-amber-500" /> Шешу жолы</div><div className="mt-3 space-y-2 text-sm leading-6 text-slate-600">{problem.steps.map((step) => <div key={step} className="flex items-start gap-2"><span className="font-black text-indigo-500">→</span><span>{step}</span></div>)}</div></div><div className="mt-3 flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-800"><CheckCircle2 size={18} /> {problem.answer}</div></div>}</article>; })}</div>
        {filtered.length === 0 && <div className="mt-8 rounded-[1.6rem] border border-dashed border-slate-300 bg-white p-10 text-center"><Search size={28} className="mx-auto text-slate-300" /><h2 className="mt-3 font-black text-slate-800">Есеп табылмады</h2><p className="mt-1 text-sm text-slate-500">Іздеу сөзін өзгертіп немесе басқа санатты таңда.</p></div>}
        <div className="mt-8 flex items-center gap-3 rounded-[1.5rem] border border-indigo-100 bg-indigo-50/80 p-5 text-sm leading-6 text-indigo-900"><Sparkles size={20} className="shrink-0 text-indigo-600" /><span><b>Кеңес:</b> алдымен есепті өзің шығарып көр, содан кейін карточканы ашып, шешу жолымен салыстыр.</span></div>
      </div>
    </div>
  );
}
