"use client";

import { CheckCircle2, ChevronDown, Eye, EyeOff, Filter, ListChecks, Search, Sigma, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { SectionTitle } from "@/components/ui";

type Problem = {
  id: number;
  type: string;
  title: string;
  level: "A" | "B" | "C";
  question: string;
  solution: string[];
  answer: string;
};

const problems: Problem[] = [
  { id: 1, type: "Сан есептері", title: "Бөлшектерді қосу", level: "A", question: "3/4 + 2/3 өрнегінің мәнін тап.", solution: ["4 пен 3 сандарының ең кіші ортақ еселігі — 12.", "3/4 = 9/12, ал 2/3 = 8/12.", "9/12 + 8/12 = 17/12 = 1 5/12."], answer: "1 5/12" },
  { id: 2, type: "Сан есептері", title: "Пайызды есептеу", level: "A", question: "480 санының 25%-ын тап.", solution: ["25% = 25/100 = 0,25.", "480 · 0,25 = 120."], answer: "120" },
  { id: 3, type: "Мәтін есептері", title: "Қозғалыс есебі", level: "A", question: "Автобус 60 км/сағ жылдамдықпен 3 сағат жүрді. Ол қанша жол жүрді?", solution: ["Жол формуласы: s = v · t.", "s = 60 · 3 = 180 км."], answer: "180 км" },
  { id: 4, type: "Мәтін есептері", title: "Жұмыс өнімділігі", level: "A", question: "Бір жұмысшы жұмысты 6 күнде, екіншісі 3 күнде бітіреді. Екеуі бірге неше күнде бітіреді?", solution: ["Бірінші жұмысшы бір күнде жұмыстың 1/6 бөлігін, екіншісі 1/3 бөлігін орындайды.", "Бірлескен өнімділік: 1/6 + 1/3 = 1/2.", "Толық жұмысқа кететін уақыт: 1 ÷ 1/2 = 2 күн."], answer: "2 күн" },
  { id: 5, type: "Алгебра", title: "Сызықтық теңдеу", level: "A", question: "5x − 12 = 3x + 8 теңдеуін шеш.", solution: ["Айнымалыларды сол жаққа, сандарды оң жаққа жинаймыз: 5x − 3x = 8 + 12.", "2x = 20.", "x = 20 ÷ 2 = 10."], answer: "x = 10" },
  { id: 6, type: "Алгебра", title: "Квадрат теңдеу", level: "A", question: "x² − 7x + 12 = 0 теңдеуін шеш.", solution: ["Қосындысы 7, көбейтіндісі 12 болатын сандар — 3 және 4.", "x² − 7x + 12 = (x − 3)(x − 4).", "(x − 3)(x − 4) = 0 болғандықтан, x = 3 немесе x = 4."], answer: "x₁ = 3, x₂ = 4" },
  { id: 7, type: "Геометрия", title: "Үшбұрыш ауданы", level: "A", question: "Табаны 14 см, биіктігі 5 см үшбұрыштың ауданын тап.", solution: ["Үшбұрыш ауданының формуласы: S = a · h / 2.", "S = 14 · 5 / 2 = 70 / 2 = 35 см²."], answer: "35 см²" },
  { id: 8, type: "Геометрия", title: "Тік төртбұрыш", level: "A", question: "Ұзындығы 12 см, ені 7 см тік төртбұрыштың периметрін тап.", solution: ["Тік төртбұрыш периметрі: P = 2(a + b).", "P = 2(12 + 7) = 2 · 19 = 38 см."], answer: "38 см" },
  { id: 9, type: "Геометрия", title: "Пифагор теоремасы", level: "A", question: "Катеттері 9 см және 12 см болатын үшбұрыштың гипотенузасын тап.", solution: ["Пифагор теоремасы: c² = a² + b².", "c² = 9² + 12² = 81 + 144 = 225.", "c = √225 = 15 см."], answer: "15 см" },
  { id: 10, type: "Функциялар", title: "Функция мәні", level: "A", question: "f(x) = 4x − 1 болса, f(6) мәнін тап.", solution: ["Формуладағы x орнына 6 қоямыз.", "f(6) = 4 · 6 − 1 = 24 − 1 = 23."], answer: "23" },
  { id: 11, type: "Прогрессия", title: "Арифметикалық прогрессия", level: "B", question: "7, 11, 15, ... прогрессиясының 8-мүшесін тап.", solution: ["Бірінші мүшесі a₁ = 7, айырмасы d = 4.", "aₙ = a₁ + (n − 1)d формуласын қолданамыз.", "a₈ = 7 + (8 − 1) · 4 = 7 + 28 = 35."], answer: "35" },
  { id: 12, type: "Статистика", title: "Орташа арифметикалық", level: "B", question: "12, 15, 9, 14, 10 сандарының орташа мәнін тап.", solution: ["Сандардың қосындысы: 12 + 15 + 9 + 14 + 10 = 60.", "Сандар саны — 5.", "Орташа мән: 60 ÷ 5 = 12."], answer: "12" },
  { id: 13, type: "Ықтималдық", title: "Кездейсоқ таңдау", level: "B", question: "Қорапта 4 ақ және 6 қара қалам бар. Ақ қалам алу ықтималдығы қандай?", solution: ["Барлығы 4 + 6 = 10 қалам.", "Қолайлы нәтиже саны — 4.", "P = 4/10 = 2/5 = 0,4."], answer: "2/5 немесе 40%" },
  { id: 14, type: "Логикалық есептер", title: "Жас туралы есеп", level: "B", question: "Әкесінің жасы баласының жасынан 3 есе үлкен. Екеуінің жасы қосқанда 48. Баласы неше жаста?", solution: ["Баланың жасын x деп аламыз, әкесінің жасы — 3x.", "x + 3x = 48, яғни 4x = 48.", "x = 48 ÷ 4 = 12."], answer: "12 жаста" },
  { id: 15, type: "Логикалық есептер", title: "Заңдылықты тап", level: "B", question: "2, 6, 12, 20, 30, ... тізбегінің келесі мүшесін тап.", solution: ["Көршілес мүшелердің айырмалары: 4, 6, 8, 10.", "Айырмалар әр жолы 2-ге артады, сондықтан келесі айырма — 12.", "30 + 12 = 42."], answer: "42" },
  { id: 16, type: "Сан есептері", title: "Ондық бөлшектер", level: "B", question: "12,5 · 0,8 − 3,4 өрнегінің мәнін тап.", solution: ["Алдымен көбейтуді орындаймыз: 12,5 · 0,8 = 10.", "Содан кейін азайтамыз: 10 − 3,4 = 6,6."], answer: "6,6" },
  { id: 17, type: "Мәтін есептері", title: "Жеңілдікпен сатып алу", level: "B", question: "Бағасы 18 000 теңге тауарға 15% жеңілдік жасалды. Жаңа бағасын тап.", solution: ["Жеңілдік мөлшері: 18 000 · 15/100 = 2 700 теңге.", "Жаңа баға: 18 000 − 2 700 = 15 300 теңге."], answer: "15 300 теңге" },
  { id: 18, type: "Алгебра", title: "Теңдеулер жүйесі", level: "B", question: "x + y = 14 және x − y = 4 жүйесін шеш.", solution: ["Теңдеулерді қосамыз: (x + y) + (x − y) = 14 + 4.", "2x = 18, сондықтан x = 9.", "9 + y = 14 теңдеуінен y = 5."], answer: "x = 9, y = 5" },
  { id: 19, type: "Алгебра", title: "Квадрат түбірлі теңдеу", level: "B", question: "√(x + 4) = 5 теңдеуін шеш.", solution: ["Екі жағын квадраттаймыз: x + 4 = 25.", "x = 25 − 4 = 21.", "Тексеру: √(21 + 4) = √25 = 5."], answer: "x = 21" },
  { id: 20, type: "Геометрия", title: "Трапеция ауданы", level: "B", question: "Табандары 8 см және 14 см, биіктігі 5 см трапецияның ауданын тап.", solution: ["Трапеция ауданы: S = (a + b) · h / 2.", "S = (8 + 14) · 5 / 2 = 22 · 5 / 2 = 55 см²."], answer: "55 см²" },
  { id: 21, type: "Геометрия", title: "Кеңістік диагоналі", level: "C", question: "Өлшемдері 3 см, 4 см және 12 см параллелепипедтің диагоналін тап.", solution: ["Кеңістік диагоналі: d = √(a² + b² + c²).", "d = √(3² + 4² + 12²) = √(9 + 16 + 144).", "d = √169 = 13 см."], answer: "13 см" },
  { id: 22, type: "Функциялар", title: "Функция қиылысуы", level: "C", question: "y = 2x + 1 және y = x + 4 түзулерінің қиылысу нүктесін тап.", solution: ["Қиылысу нүктесінде y мәндері тең: 2x + 1 = x + 4.", "x = 3.", "y = 2 · 3 + 1 = 7."], answer: "(3; 7)" },
  { id: 23, type: "Прогрессия", title: "Прогрессия қосындысы", level: "C", question: "3, 7, 11, ... арифметикалық прогрессиясының алғашқы 10 мүшесінің қосындысын тап.", solution: ["a₁ = 3, d = 4. Оныншы мүше: a₁₀ = 3 + 9 · 4 = 39.", "Қосынды формуласы: Sₙ = n(a₁ + aₙ) / 2.", "S₁₀ = 10(3 + 39) / 2 = 5 · 42 = 210."], answer: "210" },
  { id: 24, type: "Статистика", title: "Медиана", level: "C", question: "4, 9, 2, 11, 7, 5, 8 сандарының медианасын тап.", solution: ["Сандарды өсу ретімен жазамыз: 2, 4, 5, 7, 8, 9, 11.", "Барлығы 7 сан, ортасындағы төртінші сан — медиана."], answer: "7" },
  { id: 25, type: "Ықтималдық", title: "Екі қадамды ықтималдық", level: "C", question: "Қаптан қайтармай екі шар алынады: 3 ақ, 2 қара. Екеуінің де ақ болу ықтималдығын тап.", solution: ["Бірінші ақ шардың ықтималдығы: 3/5.", "Бір ақ шар алынған соң, қалған 4 шардың 2-еуі ақ: 2/4.", "P = 3/5 · 2/4 = 6/20 = 3/10."], answer: "3/10 немесе 30%" },
  { id: 26, type: "Логикалық есептер", title: "Жұмыс жылдамдығы", level: "C", question: "Бір құбыр бассейнді 4 сағатта, екіншісі 6 сағатта толтырады. Екеуі бірге неше сағатта толтырады?", solution: ["Бір сағаттағы өнімділіктері: 1/4 және 1/6 бассейн.", "Бірлескен өнімділік: 1/4 + 1/6 = 5/12.", "Уақыт: 1 ÷ 5/12 = 12/5 = 2,4 сағат = 2 сағат 24 минут."], answer: "2 сағат 24 минут" },
  { id: 27, type: "Мәтін есептері", title: "Қоспа есебі", level: "C", question: "20% тұзды 5 кг ерітіндіде қанша килограмм тұз бар?", solution: ["20% = 20/100 = 0,2.", "Тұз массасы: 5 · 0,2 = 1 кг."], answer: "1 кг" },
  { id: 28, type: "Геометрия", title: "Шар көлемі", level: "C", question: "Радиусы 3 см шардың көлемін π арқылы өрнекте.", solution: ["Шар көлемінің формуласы: V = 4πr³/3.", "V = 4π · 3³ / 3 = 4π · 27 / 3.", "V = 36π см³."], answer: "36π см³" },
  { id: 29, type: "Алгебра", title: "Параметрлі өрнек", level: "C", question: "a = 3, b = −2 болса, 2a² − 3b өрнегінің мәнін тап.", solution: ["a және b мәндерін өрнекке қоямыз: 2 · 3² − 3 · (−2).", "2 · 9 + 6 = 18 + 6 = 24."], answer: "24" },
  { id: 30, type: "Аралас", title: "Қорытынды есеп", level: "C", question: "Санның 30%-ы 24-ке тең. Осы санның 5/8 бөлігін тап.", solution: ["Ізделетін санды x дейміз: 0,3x = 24.", "x = 24 ÷ 0,3 = 80.", "80 санының 5/8 бөлігі: 80 · 5/8 = 50."], answer: "50" },
];

export default function PracticePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Барлығы");
  const [level, setLevel] = useState("Барлығы");
  const [open, setOpen] = useState<number | null>(null);
  const [answerOpen, setAnswerOpen] = useState<number | null>(null);
  const categories = ["Барлығы", ...Array.from(new Set(problems.map((problem) => problem.type)))];
  const levels = ["Барлығы", "A", "B", "C"];
  const filtered = useMemo(() => problems.filter((problem) => {
    const matchesCategory = category === "Барлығы" || problem.type === category;
    const matchesLevel = level === "Барлығы" || problem.level === level;
    const text = `${problem.title} ${problem.question} ${problem.type}`.toLowerCase();
    return matchesCategory && matchesLevel && text.includes(query.toLowerCase().trim());
  }), [category, level, query]);

  function toggleProblem(id: number) {
    if (open === id) {
      setOpen(null);
      setAnswerOpen(null);
      return;
    }

    setOpen(id);
    setAnswerOpen(null);
  }

  return (
    <div className="bg-[linear-gradient(180deg,#f8fbff,#fffdf9)] px-5 py-12 sm:py-14">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="03 · Практика" title="Есептер жинағы" description="Есепті ашып, алдымен өз бетіңше шығарып көр. Содан кейін қадамдық шығару жолы мен дұрыс жауабыңды тексер." />
        <div className="mt-9 rounded-[1.7rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-5"><div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><label className="relative block flex-1"><Search size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Есепті немесе тақырыпты іздеу..." className="selection-ring w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm font-semibold text-slate-700 outline-none placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white" /></label><div className="flex items-center gap-2 overflow-x-auto pb-1"><Filter size={17} className="shrink-0 text-slate-400" />{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`whitespace-nowrap rounded-xl px-3 py-2 text-sm font-bold transition ${category === item ? "bg-indigo-600 text-white shadow-sm" : "bg-slate-50 text-slate-500 hover:bg-indigo-50 hover:text-indigo-700"}`}>{item}</button>)}<span className="mx-1 h-6 w-px shrink-0 bg-slate-200" />{levels.map((item) => <button key={item} onClick={() => setLevel(item)} className={`whitespace-nowrap rounded-xl px-3 py-2 text-sm font-bold transition ${level === item ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-500 hover:bg-slate-100"}`}>{item === "Барлығы" ? item : `${item} — ${item === "A" ? "Жеңіл" : item === "B" ? "Орташа" : "Қиын"}`}</button>)}</div></div><div className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-400"><Sigma size={15} className="text-indigo-500" /> {filtered.length} есеп • A — Жеңіл • B — Орташа • C — Қиын</div></div>
        <div className="mt-8 grid items-start gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((problem) => {
            const expanded = open === problem.id;
            const solutionVisible = answerOpen === problem.id;
            const contentId = `problem-${problem.id}-content`;
            const solutionId = `problem-${problem.id}-solution`;

            return (
              <article
                key={problem.id}
                className={`overflow-hidden rounded-[1.6rem] border bg-white shadow-sm transition hover:shadow-md ${expanded ? "border-indigo-300 ring-2 ring-indigo-100" : "border-slate-200"}`}
              >
                <button
                  onClick={() => toggleProblem(problem.id)}
                  className="selection-ring flex w-full items-start gap-4 p-5 text-left"
                  aria-expanded={expanded}
                  aria-controls={contentId}
                >
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-indigo-50 text-indigo-600">
                    <Sigma size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2 text-[11px] font-black uppercase tracking-[0.12em]">
                      <span className="text-indigo-500">{problem.type}</span>
                      <span className={`rounded-full px-2 py-1 tracking-normal ${problem.level === "A" ? "bg-emerald-50 text-emerald-700" : problem.level === "B" ? "bg-amber-50 text-amber-700" : "bg-rose-50 text-rose-700"}`}>
                        {problem.level} — {problem.level === "A" ? "Жеңіл" : problem.level === "B" ? "Орташа" : "Қиын"}
                      </span>
                    </div>
                    <h2 className="font-black text-slate-900">{problem.title}</h2>
                  </div>
                  <ChevronDown size={18} className={`mt-1 shrink-0 text-slate-400 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
                </button>

                {expanded && (
                  <div id={contentId} className="border-t border-slate-100 px-5 pb-5 pt-4">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <div className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">Есеп</div>
                      <p className="mt-2 text-base font-semibold leading-7 text-slate-800">{problem.question}</p>
                    </div>

                    <button
                      onClick={() => setAnswerOpen(solutionVisible ? null : problem.id)}
                      className="selection-ring mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-100 transition hover:bg-indigo-700"
                      aria-expanded={solutionVisible}
                      aria-controls={solutionId}
                    >
                      {solutionVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                      {solutionVisible ? "Жауапты жасыру" : "Дұрыс жауабын көру"}
                    </button>

                    {solutionVisible && (
                      <div id={solutionId} className="mt-4 overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50/70">
                        <div className="flex items-center gap-2 border-b border-emerald-200 px-4 py-3 text-sm font-black text-emerald-800">
                          <ListChecks size={18} /> Шығару жолы
                        </div>
                        <ol className="space-y-3 px-4 py-4">
                          {problem.solution.map((step, stepIndex) => (
                            <li key={step} className="flex gap-3 text-sm leading-6 text-slate-700">
                              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-white text-xs font-black text-emerald-700 shadow-sm">{stepIndex + 1}</span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                        <div className="flex items-start gap-3 bg-emerald-600 px-4 py-3 text-white">
                          <CheckCircle2 size={20} className="mt-0.5 shrink-0" />
                          <div>
                            <div className="text-xs font-bold uppercase tracking-[0.12em] text-emerald-100">Дұрыс жауап</div>
                            <div className="mt-0.5 font-black">{problem.answer}</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
        {filtered.length === 0 && <div className="mt-8 rounded-[1.6rem] border border-dashed border-slate-300 bg-white p-10 text-center"><Search size={28} className="mx-auto text-slate-300" /><h2 className="mt-3 font-black text-slate-800">Есеп табылмады</h2><p className="mt-1 text-sm text-slate-500">Іздеу сөзін өзгертіп немесе басқа санатты таңда.</p></div>}
        <div className="mt-8 flex items-center gap-3 rounded-[1.5rem] border border-indigo-100 bg-indigo-50/80 p-5 text-sm leading-6 text-indigo-900"><Sparkles size={20} className="shrink-0 text-indigo-600" /><span><b>Кеңес:</b> карточканы ашып, есепті өзің шығар. Дайын болған соң «Дұрыс жауабын көру» батырмасымен қадамдарыңды тексер.</span></div>
      </div>
    </div>
  );
}
