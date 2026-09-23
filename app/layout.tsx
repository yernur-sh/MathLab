import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "./providers";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "MathLab KZ — Математика зертханасы",
  description: "Мектеп математикасын интерактивті түрде зерттеуге арналған ғылыми жоба.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="kk">
      <body>
        <AppProviders>
          <Header />
          <main className="min-h-screen">{children}</main>
          <footer className="border-t border-slate-200/80 bg-white/70">
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
              <span>© {new Date().getFullYear()} MathLab KZ</span>
              <span>Математика • Зерттеу • Тәжірибе</span>
            </div>
          </footer>
        </AppProviders>
      </body>
    </html>
  );
}
