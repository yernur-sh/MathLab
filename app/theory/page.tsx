"use client";

import { BookOpenCheck, Calculator, CheckCircle2, ChevronDown, CircleHelp, Filter, FunctionSquare, Percent, Search, Shapes, Sparkles, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";
import { SectionTitle } from "@/components/ui";

const topics = [
  {
    id: "alg", icon: FunctionSquare, title: "Алгебра және теңдеулер", category: "Алгебра", color: "bg-violet-50 text-violet-700",
    intro: "Белгісіз шаманы өрнек пен теңдеу арқылы табу.",
    definition: "Теңдеу — құрамында белгісіз саны бар және екі өрнектің теңдігін көрсететін математикалық жазба. Теңдеуді шешу үшін белгісіздің теңдікті дұрыс ететін мәнін табамыз.",
    formulas: ["ax + b = 0", "D = b² − 4ac", "x = (−b ± √D) / 2a"],
    examples: [
      { question: "3x + 7 = 22 теңдеуін шеш.", steps: ["3x = 22 − 7", "3x = 15", "x = 5"], answer: "Жауабы: x = 5" },
      { question: "x² − 5x + 6 = 0 теңдеуін шеш.", steps: ["D = 25 − 24 = 1", "x₁ = (5 + 1) / 2 = 3", "x₂ = (5 − 1) / 2 = 2"], answer: "Жауабы: x₁ = 3, x₂ = 2" },
    ],
  },
  {
    id: "geo", icon: Shapes, title: "Геометрия", category: "Геометрия", color: "bg-sky-50 text-sky-700",
    intro: "Фигуралардың өлшемдерін сызба және формула арқылы анықтау.",
    definition: "Геометрия — жазықтықтағы және кеңістіктегі фигураларды, олардың пішінін, өлшемін және өзара орналасуын зерттейтін математика бөлімі.",
    formulas: ["Sүшбұрыш = ½ah", "a² + b² = c²", "Sшеңбер = πr²"],
    examples: [
      { question: "Катеттері 6 см және 8 см болатын үшбұрыштың гипотенузасын тап.", steps: ["c² = 6² + 8²", "c² = 36 + 64 = 100", "c = √100 = 10 см"], answer: "Жауабы: 10 см" },
      { question: "Радиусы 4 см шеңбердің ауданын тап.", steps: ["S = πr²", "S = π · 4²", "S = 16π ≈ 50,24 см²"], answer: "Жауабы: 16π см² (шамамен 50,24 см²)" },
    ],
  },
  {
    id: "func", icon: TrendingUp, title: "Функциялар", category: "Алгебра", color: "bg-emerald-50 text-emerald-700",
    intro: "Бір шаманың өзгерісі екінші шамаға қалай әсер ететінін зерттеу.",
    definition: "Функция — әрбір x мәніне бір ғана y мәнін сәйкестендіретін тәуелділік. x — тәуелсіз айнымалы, y — тәуелді айнымалы.",
    formulas: ["y = kx + b", "k = (y₂ − y₁) / (x₂ − x₁)", "y = f(x)"],
    examples: [
      { question: "y = 2x − 3 функциясында x = 4 болғандағы y мәнін тап.", steps: ["y = 2 · 4 − 3", "y = 8 − 3", "y = 5"], answer: "Жауабы: y = 5" },
      { question: "y = 3x + 1 функциясының графигі y осін қай нүктеде қиып өтеді?", steps: ["y осінде x = 0", "y = 3 · 0 + 1", "y = 1"], answer: "Жауабы: (0; 1) нүктесі" },
    ],
  },
  {
    id: "prob", icon: CircleHelp, title: "Ықтималдық", category: "Статистика", color: "bg-amber-50 text-amber-700",
    intro: "Кездейсоқ оқиғаның орындалу мүмкіндігін сандық түрде бағалау.",
    definition: "Ықтималдық — оқиғаның орындалу мүмкіндігін көрсететін сан. Барлық нәтижелер тең мүмкіндікті болса, ықтималдық қолайлы нәтижелер санының барлық нәтижелер санына қатынасына тең.",
    formulas: ["P(A) = m / n", "0 ≤ P(A) ≤ 1", "P(Ā) = 1 − P(A)"],
    examples: [
      { question: "Қапта 3 қызыл және 2 көк шар бар. Кездейсоқ алынған шардың қызыл болу ықтималдығын тап.", steps: ["Барлық шар: n = 3 + 2 = 5", "Қолайлы нәтиже: m = 3", "P = 3 / 5"], answer: "Жауабы: 3/5 немесе 0,6 (60%)" },
      { question: "Кубикті бір рет лақтырғанда жұп сан түсу ықтималдығы қандай?", steps: ["Барлық нәтиже: 1, 2, 3, 4, 5, 6", "Жұп нәтижелер: 2, 4, 6, яғни m = 3", "P = 3 / 6"], answer: "Жауабы: 1/2 немесе 50%" },
    ],
  },
  {
    id: "percent", icon: Percent, title: "Пайыздар", category: "Күнделікті математика", color: "bg-rose-50 text-rose-700",
    intro: "Санның жүзден бір бөлігін табу және салыстыру.",
    definition: "Пайыз — қандай да бір шаманың жүзден бір бөлігі. 1% = 1/100 = 0,01. Пайыз есептерінде негізгі шаманы, пайызды және оның мәнін ажырату маңызды.",
    formulas: ["p% = p / 100", "Бөлік = сан · p / 100", "Пайыз = бөлік / сан · 100%"],
    examples: [
      { question: "240 санының 15%-ын тап.", steps: ["15% = 15 / 100 = 0,15", "240 · 0,15", "= 36"], answer: "Жауабы: 36" },
      { question: "Бағасы 12 000 тг тауарға 20% жеңілдік жасалды. Жаңа бағасы қанша?", steps: ["Жеңілдік: 12 000 · 0,2 = 2 400 тг", "Жаңа баға: 12 000 − 2 400", "= 9 600 тг"], answer: "Жауабы: 9 600 теңге" },
    ],
  },
  {
    id: "sequence", icon: Sparkles, title: "Прогрессиялар", category: "Алгебра", color: "bg-indigo-50 text-indigo-700",
    intro: "Сандар тізбегіндегі заңдылықты анықтау және жалғастыру.",
    definition: "Сандар тізбегі — белгілі бір ретпен орналасқан сандар жиыны. Арифметикалық прогрессияда көршілес мүшелердің айырмасы тұрақты болады.",
    formulas: ["aₙ = a₁ + (n − 1)d", "Sₙ = n(a₁ + aₙ) / 2", "d = aₙ₊₁ − aₙ"],
    examples: [
      { question: "5, 8, 11, ... арифметикалық прогрессиясының 10-мүшесін тап.", steps: ["a₁ = 5, d = 8 − 5 = 3", "a₁₀ = 5 + (10 − 1) · 3", "a₁₀ = 32"], answer: "Жауабы: 32" },
      { question: "2, 5, 8, 11, 14 сандарының қосындысын тап.", steps: ["n = 5, a₁ = 2, a₅ = 14", "S₅ = 5(2 + 14) / 2", "S₅ = 40"], answer: "Жауабы: 40" },
    ],
  },
  {
    id: "system", icon: FunctionSquare, title: "Теңдеулер жүйесі", category: "Алгебра", color: "bg-cyan-50 text-cyan-700",
    intro: "Бірнеше теңдеуді бірге қанағаттандыратын белгісіздерді табу.",
    definition: "Теңдеулер жүйесінің шешімі — жүйедегі барлық теңдеуді бір уақытта дұрыс ететін айнымалылар мәндерінің жұбы немесе жиыны.",
    formulas: ["x + y = a", "kx + my = b", "Алмастыру және қосу әдісі"],
    examples: [
      { question: "x + y = 10 және x − y = 2 жүйесін шеш.", steps: ["Екі теңдеуді қосамыз: 2x = 12", "x = 6", "6 + y = 10, сондықтан y = 4"], answer: "Жауабы: (x; y) = (6; 4)" },
      { question: "2x + y = 7 және x = 2 жүйесін шеш.", steps: ["x мәнін бірінші теңдеуге қоямыз", "2 · 2 + y = 7", "y = 3"], answer: "Жауабы: (x; y) = (2; 3)" },
    ],
  },
  {
    id: "stats", icon: Calculator, title: "Статистика", category: "Статистика", color: "bg-orange-50 text-orange-700",
    intro: "Деректерді жинақтау, салыстыру және қорытынды жасау.",
    definition: "Орташа арифметикалық мән — барлық деректердің қосындысын олардың санына бөлгенде шығатын көрсеткіш. Ол деректердің жалпы деңгейін сипаттайды.",
    formulas: ["x̄ = (x₁ + x₂ + ... + xₙ) / n", "Размах = max − min", "Медиана — ортадағы мән"],
    examples: [
      { question: "6, 8, 10, 12 сандарының орташа мәнін тап.", steps: ["Қосындысы: 6 + 8 + 10 + 12 = 36", "Сандар саны: n = 4", "x̄ = 36 / 4 = 9"], answer: "Жауабы: 9" },
      { question: "3, 7, 9, 12, 15 деректерінің размахын тап.", steps: ["Ең үлкен мән: 15", "Ең кіші мән: 3", "Размах = 15 − 3"], answer: "Жауабы: 12" },
    ],
  },
];

const quickFormulas = [
  ["Квадрат теңдеу", "D = b² − 4ac"],
  ["Пифагор", "a² + b² = c²"],
  ["Шеңбер ауданы", "S = πr²"],
  ["Орташа мән", "x̄ = (x₁ + … + xₙ) / n"],
];

export default function TheoryPage() {
  const [open, setOpen] = useState("alg");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Барлығы");
  const categories = ["Барлығы", ...Array.from(new Set(topics.map((topic) => topic.category)))];
  const filteredTopics = useMemo(() => topics.filter((topic) => {
    const matchesCategory = category === "Барлығы" || topic.category === category;
    const text = `${topic.title} ${topic.intro} ${topic.definition}`.toLowerCase();
    return matchesCategory && text.includes(query.toLowerCase().trim());
  }), [category, query]);

  return (
    <div className="bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_50%,#faf8ff_100%)]">
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-12 sm:pt-16">
        <SectionTitle eyebrow="01 · Теория" title="Тақырыптар кабинеті" description="Қажетті тақырыпты таңда. Әр бөлімде анықтама, негізгі формулалар және қадамдап шығарылған мысал есеп бар." />

        <div className="mt-9 rounded-[1.7rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <label className="relative block flex-1">
              <Search size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Тақырыпты іздеу..." className="selection-ring w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm font-semibold text-slate-700 outline-none placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white" />
            </label>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <Filter size={17} className="shrink-0 text-slate-400" />
              {categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`whitespace-nowrap rounded-xl px-3 py-2 text-sm font-bold transition ${category === item ? "bg-indigo-600 text-white shadow-sm" : "bg-slate-50 text-slate-500 hover:bg-indigo-50 hover:text-indigo-700"}`}>{item}</button>)}
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-400"><BookOpenCheck size={15} className="text-indigo-500" /> {filteredTopics.length} тақырып • Анықтама және есептермен</div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_.85fr]">
          <div className="space-y-3">
            {filteredTopics.length === 0 && <div className="rounded-[1.6rem] border border-dashed border-slate-300 bg-white p-10 text-center"><Search size={28} className="mx-auto text-slate-300" /><h2 className="mt-3 font-black text-slate-800">Тақырып табылмады</h2><p className="mt-1 text-sm text-slate-500">Іздеу сөзін өзгертіп немесе басқа санатты таңда.</p></div>}
            {filteredTopics.map((topic) => {
              const Icon = topic.icon;
              const expanded = open === topic.id;
              return <article key={topic.id} className="overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
                <button onClick={() => setOpen(expanded ? "" : topic.id)} className="selection-ring flex w-full items-center gap-4 p-5 text-left sm:p-6" aria-expanded={expanded}>
                  <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${topic.color}`}><Icon size={22} /></div>
                  <div className="min-w-0 flex-1"><div className="mb-1 text-[11px] font-black uppercase tracking-[0.15em] text-slate-400">{topic.category}</div><h2 className="text-lg font-black text-slate-900">{topic.title}</h2><p className="mt-1 text-sm leading-6 text-slate-500">{topic.intro}</p></div>
                  <ChevronDown size={20} className={`shrink-0 text-slate-400 transition ${expanded ? "rotate-180" : ""}`} />
                </button>
                {expanded && <div className="border-t border-slate-100 px-5 pb-6 pt-5 sm:px-6">
                  <div className="rounded-2xl bg-indigo-50/70 p-5"><div className="flex items-center gap-2 text-sm font-black text-indigo-800"><BookOpenCheck size={17} /> Анықтама</div><p className="mt-2 text-sm leading-7 text-indigo-950/75">{topic.definition}</p></div>
                  <div className="mt-5"><div className="mb-3 text-sm font-black text-slate-800">Негізгі формулалар</div><div className="grid gap-2 sm:grid-cols-3">{topic.formulas.map((formula) => <div key={formula} className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-3 text-center text-sm font-black text-slate-700">{formula}</div>)}</div></div>
                  <div className="mt-6"><div className="mb-3 flex items-center gap-2 text-sm font-black text-slate-800"><Sparkles size={17} className="text-amber-500" /> Мысал есептер</div><div className="grid gap-4">{topic.examples.map((example) => <div key={example.question} className="rounded-2xl border border-slate-200 p-4 sm:p-5"><div className="font-bold leading-6 text-slate-800">{example.question}</div><div className="mt-3 space-y-1.5 text-sm text-slate-500">{example.steps.map((step) => <div key={step} className="flex items-start gap-2"><span className="mt-1 text-indigo-500">→</span><span>{step}</span></div>)}</div><div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2.5 text-sm font-black text-emerald-800"><CheckCircle2 size={17} /> {example.answer}</div></div>)}</div></div>
                </div>}
              </article>;
            })}
          </div>

          <div className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[1.7rem] border border-indigo-100 bg-indigo-50/70 p-6"><div className="flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-indigo-600 shadow-sm"><BookOpenCheck size={21} /></div><div><div className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-500">Оқу алгоритмі</div><div className="mt-1 text-lg font-black text-slate-900">Түсін → Байқа → Шеш</div></div></div><p className="mt-4 text-sm leading-6 text-slate-600">Анықтаманы оқы, формуланы қара, мысалды қадамдап талда. Содан кейін практикада өзің шешіп көр.</p></div>
            <div className="rounded-[1.7rem] border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-center gap-2"><Calculator size={18} className="text-indigo-600" /><h3 className="text-lg font-black">Жылдам формулалар</h3></div><div className="mt-4 grid gap-3">{quickFormulas.map(([label, formula]) => <div key={label} className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3"><span className="text-sm font-semibold text-slate-500">{label}</span><span className="font-black text-slate-800">{formula}</span></div>)}</div></div>
            <div className="rounded-[1.7rem] border border-emerald-100 bg-emerald-50/70 p-6"><div className="flex items-center gap-3"><Sparkles size={20} className="text-emerald-600" /><div className="text-sm font-bold text-emerald-900">Келесі қадам</div></div><p className="mt-2 text-sm leading-6 text-emerald-900/70">Теориядан кейін тест бетіне өтіп, біліміңді жаңа сұрақтармен тексер.</p></div>
          </div>
        </div>
      </section>
    </div>
  );
}
