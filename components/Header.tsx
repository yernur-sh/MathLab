"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Calculator, ChevronDown, FunctionSquare, LogIn, Menu, Shapes, Sigma, Sparkles, UserRound, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "./AuthProvider";

const links = [
  { href: "/", label: "Басты бет" },
  { href: "/theory", label: "Тақырыптар", icon: BookOpen },
  { href: "/practice", label: "Тест", icon: Sparkles },
  { href: "/calculator", label: "Практика", icon: Calculator },
  { href: "/formulas", label: "Формулалар", icon: FunctionSquare },
  { href: "/shapes", label: "Фигуралар", icon: Shapes },
];

export default function Header() {
  const pathname = usePathname();
  const { user, loading, logoutUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/75 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-5">
        <Link href="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
            <Sigma size={23} strokeWidth={2.4} />
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-extrabold text-slate-900">MathLab</div>
            <div className="text-[11px] text-slate-500">математика зертханасы</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.href} href={link.href} className={`rounded-xl px-3.5 py-2 text-sm font-semibold transition ${isActive(link.href) ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}>
                <span className="inline-flex items-center gap-2">{Icon && <Icon size={16} />}{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {loading ? (
            <div className="h-10 w-28 animate-pulse rounded-2xl bg-slate-100" />
          ) : user ? (
            <div className="relative">
              <button onClick={() => setProfileOpen((v) => !v)} className="selection-ring inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-2 py-1.5 shadow-sm" aria-expanded={profileOpen}>
                {user.photoURL ? (
                  <img src={user.photoURL} alt="" className="h-8 w-8 rounded-xl object-cover" />
                ) : (
                  <div className="grid h-8 w-8 place-items-center rounded-xl bg-indigo-100 text-indigo-700"><UserRound size={17} /></div>
                )}
                <span className="hidden max-w-24 truncate text-sm font-bold text-slate-700 sm:block">{user.displayName || user.email?.split("@")[0] || "Профиль"}</span>
                <ChevronDown size={16} className="text-slate-400" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                  <Link onClick={() => setProfileOpen(false)} href="/profile" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                    <UserRound size={17} /> Профиль
                  </Link>
                  <button onClick={async () => { await logoutUser(); setProfileOpen(false); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-rose-600 hover:bg-rose-50">
                    <LogIn size={17} className="rotate-180" /> Шығу
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link href="/login" className="rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">Кіру</Link>
              <Link href="/register" className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-200 hover:bg-slate-800">Тіркелу</Link>
            </div>
          )}
          <button className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white md:hidden" onClick={() => setMenuOpen((v) => !v)} aria-label="Мәзір">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-200 bg-white px-5 py-3 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className={`rounded-xl px-3 py-3 text-sm font-semibold ${isActive(link.href) ? "bg-indigo-50 text-indigo-700" : "text-slate-600"}`}>{link.label}</Link>)}
            {!user && !loading && <div className="mt-2 flex gap-2 border-t border-slate-100 pt-3"><Link className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold" href="/login">Кіру</Link><Link className="flex-1 rounded-xl bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white" href="/register">Тіркелу</Link></div>}
            {user && <Link className="mt-2 rounded-xl bg-indigo-50 px-4 py-3 text-center text-sm font-bold text-indigo-700" href="/profile" onClick={() => setMenuOpen(false)}>Профильге өту</Link>}
          </div>
        </div>
      )}
    </header>
  );
}
