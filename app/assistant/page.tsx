"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Bot, RotateCcw, Send, Sparkles, UserRound } from "lucide-react";
import { SectionTitle } from "@/components/ui";
import { useAuth } from "@/components/AuthProvider";
import MathMessage from "@/components/MathMessage";

type Message = { role: "user" | "assistant"; content: string };

export default function AssistantPage() {
  const { user, loading } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }); }, [messages, pending]);

  async function sendQuestion(question: string) {
    const trimmed = question.trim();
    if (!trimmed || pending || !user) return;
    const nextMessages: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setError("");
    setPending(true);

    try {
      const idToken = await user.getIdToken();
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` },
        body: JSON.stringify({ messages: nextMessages.slice(-12) }),
      });
      const data = await response.json();
      if (!response.ok || typeof data.answer !== "string") throw new Error(data.error || "Жауап алу мүмкін болмады.");
      setMessages((current) => [...current, { role: "assistant", content: data.answer }]);
    } catch (caught) {
      setMessages((current) => current.slice(0, -1));
      setInput((current) => current || trimmed);
      setError(caught instanceof Error ? caught.message : "Жауап алу мүмкін болмады.");
    } finally {
      setPending(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendQuestion(input);
  }

  if (loading) {
    return <div className="mx-auto max-w-4xl px-5 py-14"><div className="h-12 w-56 animate-pulse rounded-2xl bg-slate-200" /><div className="mt-8 h-96 animate-pulse rounded-[1.8rem] bg-slate-100" /></div>;
  }

  if (!user) {
    return (
      <div className="bg-[linear-gradient(180deg,#f8fbff,#fffdf9)] px-5 py-12 sm:py-14">
        <div className="mx-auto max-w-4xl">
          <SectionTitle eyebrow="Жаңа бөлім" title="ЖИ-көмекші" description="Математика туралы сұрақ қою үшін аккаунтқа кіріңіз немесе тіркеліңіз." />
          <section className="mt-9 rounded-[1.8rem] border border-indigo-100 bg-white px-6 py-12 text-center shadow-sm">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-indigo-50 text-indigo-600"><Bot size={28} /></span>
            <h2 className="mt-5 text-2xl font-black text-slate-900">Көмекшіні қолдану үшін кіріңіз</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">ЖИ-көмекші тек тіркелген қолданушыларға қолжетімді.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/login?next=/assistant" className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white hover:bg-indigo-700">Кіру</Link>
              <Link href="/register?next=/assistant" className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50">Тіркелу</Link>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[linear-gradient(180deg,#f8fbff,#fffdf9)] px-5 py-12 sm:py-14">
      <div className="mx-auto max-w-4xl">
        <SectionTitle eyebrow="Жаңа бөлім" title="ЖИ-көмекші" description="Математика туралы сұрағыңды жаз. Көмекші есепті қадамдап түсіндіруге және формулаларды ұғынуға көмектеседі." />

        <div className="mt-9">
          <section className="flex h-[calc(100dvh-330px)] min-h-[390px] max-h-[760px] flex-col overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-sm" aria-label="Математика көмекшісімен чат">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-indigo-600 text-white"><Bot size={22} /></span>
                <div><h2 className="font-black text-slate-900">MathLab көмекшісі</h2><p className="text-xs text-slate-500">Тек математика сұрақтары</p></div>
              </div>
              <button type="button" onClick={() => { setMessages([]); setError(""); }} disabled={pending || messages.length === 0} className="selection-ring inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40" aria-label="Чатты тазалау"><RotateCcw size={16} /><span className="hidden sm:inline">Тазалау</span></button>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto px-5 py-6 sm:px-6" role="log" aria-live="polite" aria-relevant="additions">
              {messages.length === 0 && (
                <div className="mx-auto flex max-w-md flex-col items-center py-3 text-center">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-indigo-50 text-indigo-600"><Sparkles size={24} /></span>
                  <h3 className="mt-3 text-lg font-black text-slate-900">Қай есепті бірге шығарамыз?</h3>
                  <p className="mt-1 text-sm leading-5 text-slate-500">Алгебра, геометрия, статистика немесе басқа математикалық тақырып бойынша сұрақ қой.</p>
                </div>
              )}
              {messages.map((message, index) => <div key={index} className={`flex items-start gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}><span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${message.role === "user" ? "bg-slate-100 text-slate-600" : "bg-indigo-50 text-indigo-600"}`}>{message.role === "user" ? <UserRound size={18} /> : <Bot size={18} />}</span><div className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-sm leading-7 sm:max-w-[78%] ${message.role === "user" ? "bg-indigo-600 text-white" : "bg-slate-50 text-slate-800"}`}>{message.role === "assistant" ? <MathMessage content={message.content} /> : message.content}</div></div>)}
              {pending && <div className="flex items-center gap-3 text-sm text-slate-500"><span className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-50 text-indigo-600"><Bot size={18} /></span><span className="animate-pulse">Жауап дайындалып жатыр…</span></div>}
              <div ref={bottomRef} />
            </div>

            <div className="border-t border-slate-100 p-4 sm:p-5">
              {error && <div role="alert" className="mb-3 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>}
              <form onSubmit={handleSubmit} className="flex items-end gap-2">
                <label htmlFor="math-question" className="sr-only">Математика сұрағы</label>
                <textarea id="math-question" value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); void sendQuestion(input); } }} maxLength={3000} rows={2} placeholder="Математика сұрағын жазыңыз…" className="selection-ring min-h-14 max-h-40 flex-1 resize-y rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white" />
                <button type="submit" disabled={!input.trim() || pending} className="selection-ring grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50" aria-label="Сұрақты жіберу"><Send size={20} /></button>
              </form>
              <p className="mt-2 text-xs text-slate-400">Enter — жіберу · Shift + Enter — жаңа жол</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
