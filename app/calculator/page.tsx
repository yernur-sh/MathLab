"use client";

import { Calculator, Equal, FlaskConical, Percent, RotateCcw, Sigma, Triangle } from "lucide-react";
import { useMemo, useState } from "react";
import { SectionTitle } from "@/components/ui";

function NumberInput({ label, value, setValue }: { label: string; value: string; setValue: (v: string) => void }) {
  return <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-500">{label}</span><input inputMode="decimal" value={value} onChange={(e) => setValue(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100" /></label>;
}

export default function CalculatorPage() {
  const [a, setA] = useState("6");
  const [b, setB] = useState("8");
  const [c, setC] = useState("3");
  const [dA, setDA] = useState("1");
  const [dB, setDB] = useState("-5");
  const [dC, setDC] = useState("6");
  const [amount, setAmount] = useState("120");
  const [percent, setPercent] = useState("15");
  const [values, setValues] = useState("12, 8, 15, 10");

  const hypotenuse = useMemo(() => Math.sqrt(Number(a || 0) ** 2 + Number(b || 0) ** 2), [a, b]);
  const discriminant = useMemo(() => Number(dB || 0) ** 2 - 4 * Number(dA || 0) * Number(dC || 0), [dA, dB, dC]);
  const percentage = useMemo(() => Number(amount || 0) * Number(percent || 0) / 100, [amount, percent]);
  const mean = useMemo(() => { const list = values.split(",").map((v) => Number(v.trim())).filter((v) => Number.isFinite(v)); return list.length ? list.reduce((s, v) => s + v, 0) / list.length : 0; }, [values]);

  function reset() { setA("6"); setB("8"); setC("3"); setDA("1"); setDB("-5"); setDC("6"); setAmount("120"); setPercent("15"); setValues("12, 8, 15, 10"); }

  return (
    <div className="bg-[linear-gradient(180deg,#f8fbff,#fffdf9)] px-5 py-14">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><SectionTitle eyebrow="03 · Зертхана" title="Математикалық құралдар" description="Сандарды өзгертіп, формуланың нәтижеге қалай әсер ететінін бірден бақыла." /><button onClick={reset} className="inline-flex self-start items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600 shadow-sm hover:bg-slate-50"><RotateCcw size={16} /> Бастапқы мәндер</button></div>
        <div className="mt-9 grid gap-5 lg:grid-cols-2">
          <div className="rounded-[1.7rem] border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-2xl bg-sky-50 text-sky-700"><Triangle size={20} /></div><div><h2 className="text-lg font-black">Пифагор теоремасы</h2><p className="text-sm text-slate-500">c = √(a² + b²)</p></div></div><div className="mt-6 grid gap-4 sm:grid-cols-2"><NumberInput label="a қабырғасы" value={a} setValue={setA} /><NumberInput label="b қабырғасы" value={b} setValue={setB} /></div><div className="mt-5 rounded-2xl bg-sky-50 p-5"><div className="text-xs font-bold uppercase tracking-[0.16em] text-sky-600">Нәтиже</div><div className="mt-2 flex items-end gap-2"><span className="text-4xl font-black text-sky-900">{hypotenuse.toFixed(2)}</span><span className="pb-1 text-sm font-semibold text-sky-700">c</span></div></div></div>
          <div className="rounded-[1.7rem] border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-2xl bg-violet-50 text-violet-700"><Equal size={20} /></div><div><h2 className="text-lg font-black">Квадрат теңдеу</h2><p className="text-sm text-slate-500">D = b² − 4ac</p></div></div><div className="mt-6 grid gap-4 sm:grid-cols-3"><NumberInput label="a" value={dA} setValue={setDA} /><NumberInput label="b" value={dB} setValue={setDB} /><NumberInput label="c" value={dC} setValue={setDC} /></div><div className="mt-5 rounded-2xl bg-violet-50 p-5"><div className="text-xs font-bold uppercase tracking-[0.16em] text-violet-600">Дискриминант</div><div className="mt-2 text-4xl font-black text-violet-900">{Number.isFinite(discriminant) ? discriminant.toFixed(2) : "—"}</div><div className="mt-2 text-xs font-semibold text-violet-700">{discriminant > 0 ? "Екі нақты түбір" : discriminant === 0 ? "Бір нақты түбір" : "Нақты түбір жоқ"}</div></div></div>
          <div className="rounded-[1.7rem] border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-50 text-emerald-700"><Percent size={20} /></div><div><h2 className="text-lg font-black">Пайыз калькуляторы</h2><p className="text-sm text-slate-500">Санның белгілі пайызын есептеу</p></div></div><div className="mt-6 grid gap-4 sm:grid-cols-2"><NumberInput label="Сан" value={amount} setValue={setAmount} /><NumberInput label="Пайыз (%)" value={percent} setValue={setPercent} /></div><div className="mt-5 rounded-2xl bg-emerald-50 p-5"><div className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600">Нәтиже</div><div className="mt-2 text-4xl font-black text-emerald-900">{percentage.toFixed(2)}</div><div className="mt-2 text-xs font-semibold text-emerald-700">{amount} санының {percent}% мөлшері</div></div></div>
          <div className="rounded-[1.7rem] border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-2xl bg-amber-50 text-amber-700"><Sigma size={20} /></div><div><h2 className="text-lg font-black">Арифметикалық орта</h2><p className="text-sm text-slate-500">Бірнеше санның орташа мәні</p></div></div><label className="mt-6 block"><span className="mb-1.5 block text-xs font-bold text-slate-500">Сандарды үтірмен жазыңыз</span><input value={values} onChange={(e) => setValues(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100" placeholder="12, 8, 15" /></label><div className="mt-5 rounded-2xl bg-amber-50 p-5"><div className="text-xs font-bold uppercase tracking-[0.16em] text-amber-600">Орташа мән</div><div className="mt-2 text-4xl font-black text-amber-900">{mean.toFixed(2)}</div></div></div>
        </div>
        <div className="mt-6 flex items-center gap-3 rounded-[1.5rem] border border-indigo-100 bg-indigo-50/80 p-5 text-sm leading-6 text-indigo-900"><FlaskConical size={20} className="shrink-0 text-indigo-600" /><span><b>Зерттеу идеясы:</b> бір ғана мәнді өзгертіп көр. Мысалы, a қабырғасын өсіргенде гипотенузаның қалай өзгеретінін байқап, математикалық тәуелділікті сипатта.</span></div>
      </div>
    </div>
  );
}
