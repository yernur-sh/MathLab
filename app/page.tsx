import Link from "next/link";
import { ArrowRight, BookOpen, Calculator, CheckCircle2, FlaskConical, Sparkles } from "lucide-react";
import MathDecor from "@/components/MathDecor";

const features = [
  { icon: BookOpen, title: "Теория", text: "Мектеп бағдарламасындағы негізгі тақырыптарды қысқа әрі көрнекі түрде оқы.", href: "/theory", tone: "bg-sky-50 text-sky-700" },
  { icon: Sparkles, title: "Тест", text: "Біліміңді көптеген сұрақ арқылы тексеріп, нәтижені профильде сақта.", href: "/practice", tone: "bg-violet-50 text-violet-700" },
  { icon: FlaskConical, title: "Практика", text: "Мәтін, сан және логикалық есептерді шығарып, жауапты бірден тексер.", href: "/calculator", tone: "bg-emerald-50 text-emerald-700" },
];

const formula = ["a² + b² = c²", "D = b² − 4ac", "S = πr²", "P(A) = m / n"];

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <MathDecor />
      <section className="math-grid relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-16 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:pb-24 lg:pt-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/80 px-4 py-2 text-xs font-bold text-indigo-700 shadow-sm">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-indigo-100">✦</span>
              Математиканы үйренудің ыңғайлы жолы
            </div>
            <h1 className="display-font max-w-4xl text-5xl font-black leading-[0.98] text-slate-900 sm:text-6xl lg:text-7xl">
              Математиканы <span className="text-indigo-600">формуладан</span> тәжірибеге айналдыр.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">MathLab — теорияны оқу, есеп шығару, тест тапсыру және математикалық формулаларды интерактивті зерттеу үшін жасалған оқу платформасы.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/practice" className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3.5 text-sm font-bold text-white shadow-xl shadow-slate-200 hover:bg-slate-800">Тестті бастау <ArrowRight size={18} /></Link>
              <Link href="/theory" className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/90 px-5 py-3.5 text-sm font-bold text-slate-700 shadow-sm hover:bg-white">Тақырыптарды көру</Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-500">
              <span className="inline-flex items-center gap-2"><CheckCircle2 size={17} className="text-emerald-500" /> 5 оқу бөлімі</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 size={17} className="text-emerald-500" /> 8 тест сұрағы</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 size={17} className="text-emerald-500" /> Практикалық құралдар</span>
            </div>
          </div>

          <div className="relative">
            <div className="glass relative mx-auto max-w-xl rounded-[2rem] p-5 sm:p-7">
              <div className="dot-grid rounded-[1.5rem] bg-[#f8fbff] p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <div><div className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-500">MathLab</div><div className="mt-1 text-xl font-black text-slate-900">Формула картасы</div></div>
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white shadow-sm"><Calculator size={21} className="text-indigo-600" /></div>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {formula.map((item, index) => <div key={item} className={`rounded-2xl border border-white px-4 py-5 shadow-sm ${index % 2 === 0 ? "bg-white" : "bg-indigo-50/80"}`}><div className="text-2xl font-black tracking-tight text-slate-800">{item}</div><div className="mt-2 text-xs font-semibold text-slate-400">Формула {index + 1}</div></div>)}
                </div>
                <div className="mt-5 flex items-end justify-between rounded-2xl bg-slate-900 px-5 py-4 text-white">
                  <div><div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Зерттеу режимі</div><div className="mt-1 text-2xl font-black">y = 2x + 3</div></div>
                  <div className="text-right text-xs text-slate-400">x ∈ ℝ<br />f′(x) = 2</div>
                </div>
              </div>
            </div>
            <div className="floaty absolute -right-2 -top-5 hidden rotate-6 rounded-2xl border border-white bg-white/90 px-4 py-3 shadow-xl sm:block"><div className="text-2xl font-black text-indigo-600">π ≈ 3.14</div><div className="text-[11px] font-bold text-slate-400">сүйікті тұрақты сан</div></div>
            <div className="absolute -bottom-5 -left-3 hidden -rotate-6 rounded-2xl border border-white bg-white/90 px-4 py-3 shadow-xl sm:block"><div className="text-2xl font-black text-emerald-600">Σ aᵢ</div><div className="text-[11px] font-bold text-slate-400">қосынды идеясы</div></div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div><div className="text-xs font-black uppercase tracking-[0.2em] text-indigo-500">Бір жобада</div><h2 className="mt-3 display-font text-4xl font-black text-slate-900">Математиканы үш қырынан үйрен.</h2></div>
          <p className="max-w-2xl text-base leading-7 text-slate-600 lg:justify-self-end">Түсіну, қолдану және тексеру — математика үйренудің ең тиімді жолы. Өзіңе қажетті бөлімді таңдап, бірден баста.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {features.map((feature) => { const Icon = feature.icon; return <Link key={feature.href} href={feature.href} className="group rounded-[1.7rem] border border-slate-200/80 bg-white p-6 card-shadow transition hover:-translate-y-1"><div className={`grid h-12 w-12 place-items-center rounded-2xl ${feature.tone}`}><Icon size={22} /></div><h3 className="mt-5 text-xl font-black text-slate-900">{feature.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{feature.text}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-indigo-600">Ашу <ArrowRight size={16} className="transition group-hover:translate-x-1" /></span></Link> })}
        </div>
      </section>
    </div>
  );
}
