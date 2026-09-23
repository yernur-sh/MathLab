export default function MathDecor() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-10 top-12 h-44 w-44 rounded-full bg-[var(--mint)]/70 blur-2xl" />
      <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[var(--lavender)]/70 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-44 w-44 rounded-full bg-[var(--sky)]/70 blur-3xl" />
      <div className="absolute right-[8%] top-[15%] rotate-6 text-7xl font-black text-indigo-100">π</div>
      <div className="absolute left-[7%] top-[26%] rotate-[-10deg] text-6xl font-black text-emerald-100">∑</div>
      <div className="absolute bottom-[22%] right-[15%] text-6xl font-black text-violet-100">√x</div>
    </div>
  );
}
