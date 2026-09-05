"use client";

import {
  Bot,
  FolderKanban,
  Home,
  MessageSquareText,
  MoreHorizontal,
  Network,
  Send,
  Settings2,
  ShieldCheck,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const navItems = [
  { icon: Home, id: "home", label: "Home" },
  { icon: MessageSquareText, id: "chat", label: "Chat" },
  { icon: Workflow, id: "agents", label: "Agents" },
  { icon: FolderKanban, id: "projects", label: "Projects" },
  { icon: Settings2, id: "settings", label: "Settings" },
] as const;

type PageId = (typeof navItems)[number]["id"];

const agents = [
  ["01", "Planner", "แตก requirement เป็นแผนที่ทำได้จริง", "DONE"],
  ["02", "Researcher", "ค้นข้อมูลและตรวจแหล่งอ้างอิง", "DONE"],
  ["03", "Executor", "สร้าง/แก้โค้ดและเชื่อม Tool Hub", "RUNNING"],
  ["04", "Reviewer", "ตรวจคุณภาพ ความปลอดภัย และ regression", "QUEUED"],
  ["05", "Deliver", "สรุปผลและเตรียมส่งมอบ", "QUEUED"],
] as const;

const models = [
  ["Gemini Flash", "Primary • Fast"],
  ["GPT-OSS 120B", "Fallback • Strong"],
  ["Groq", "Fallback • Speed"],
] as const;

function StatusBadge({ status }: { status: string }) {
  const active = status === "DONE" || status === "RUNNING";
  return (
    <span
      className={`rounded-lg px-2 py-1 text-[9px] font-bold tracking-wide ${active ? "bg-emerald-400/15 text-emerald-300" : "bg-white/[0.06] text-white/45"}`}
    >
      {status}
    </span>
  );
}

export default function Page() {
  const [page, setPage] = useState<PageId>("home");
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([
    "รับทราบครับ ผมพร้อมวางแผนงาน แยก Agent และตรวจ QA ให้ครบวงจร",
  ]);

  const navigate = (next: PageId) => {
    setPage(next);
    window.scrollTo({ behavior: "smooth", top: 0 });
  };

  const sendPrompt = (value = prompt) => {
    const clean = value.trim();
    if (!clean) {
      toast.error("พิมพ์คำสั่งก่อนครับ");
      return;
    }
    setMessages((current) => [...current, clean]);
    setPrompt("");
    toast.success("GT40 รับคำสั่งแล้ว กำลังวางแผน");
    navigate("chat");
  };

  return (
    <main className="min-h-dvh bg-[#05060b] text-white">
      <div className="mx-auto min-h-dvh w-full max-w-[430px] overflow-hidden bg-[radial-gradient(circle_at_80%_-5%,#30205c_0,#0b0c17_30%,#080912_58%)] pb-24 shadow-2xl shadow-violet-950/20">
        <div className="flex items-center justify-between px-5 pb-1 pt-3 text-xs text-white/60">
          <span>คิดก่อนน่ะ</span>
          <span className="tracking-[0.25em]">● ● ▰</span>
        </div>

        <header className="flex items-center justify-between px-5 py-3">
          <button
            className="flex items-center gap-2.5 text-left"
            onClick={() => navigate("home")}
            type="button"
          >
            <span className="flex size-10 items-center justify-center rounded-[13px] bg-gradient-to-br from-violet-500 to-cyan-400 shadow-lg shadow-violet-500/30">
              <Sparkles className="size-5" />
            </span>
            <span>
              <strong className="block text-base">คิดก่อนน่ะ</strong>
              <span className="block text-[11px] text-white/45">
                Bossnu Neo-Connect
              </span>
            </span>
          </button>
          <button
            className="flex size-10 items-center justify-center rounded-[13px] border border-white/10 bg-white/[0.04]"
            onClick={() => toast.success("ระบบปกติ")}
            type="button"
          >
            <MoreHorizontal className="size-5" />
          </button>
        </header>

        <div className="px-4">
          {page === "home" && (
            <section>
              <div className="px-0.5 pb-5 pt-2">
                <p className="text-[11px] font-bold tracking-[0.16em] text-cyan-300">
                  AI AGENT CENTER
                </p>
                <h1 className="mt-1.5 text-[27px] font-extrabold leading-tight tracking-tight">
                  พร้อมลุยงานต่อเลย
                </h1>
                <p className="mt-1 text-[13px] text-white/45">
                  วางแผน → ลงมือทำ → ตรวจสอบ → ส่งมอบ ในที่เดียว
                </p>
              </div>
              <div className="relative mb-3 overflow-hidden rounded-[20px] border border-violet-300/15 bg-gradient-to-br from-[#15182aee] to-[#0e1020ee] p-4 shadow-xl shadow-black/20">
                <div className="absolute -right-14 -top-16 size-40 rounded-full bg-violet-500/20 blur-sm" />
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-white/45">ACTIVE AGENT</p>
                    <p className="mt-1 font-extrabold">GT40 Orchestrator</p>
                  </div>
                  <span className="rounded-lg bg-emerald-400/15 px-2 py-1 text-[9px] font-bold text-emerald-300">
                    ONLINE
                  </span>
                </div>
                <div className="relative my-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
                </div>
                <div className="relative flex justify-between text-[11px] text-white/40">
                  <span>Model Pool • 8-attempt fallback</span>
                  <span>68%</span>
                </div>
              </div>
              <h2 className="mb-2 mt-4 px-0.5 text-sm font-extrabold">
                ทำอะไรต่อดี?
              </h2>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  {
                    description: "คุยและสั่งงาน Agent",
                    Icon: MessageSquareText,
                    target: "chat",
                    title: "GT40 Chat",
                  },
                  {
                    description: "Planner → QA → Deliver",
                    Icon: Workflow,
                    target: "agents",
                    title: "Agent Workflow",
                  },
                  {
                    description: "Web • Code • Files • APIs",
                    Icon: Network,
                    target: "settings",
                    title: "AI Tools Hub",
                  },
                  {
                    description: "State • Build • Review",
                    Icon: FolderKanban,
                    target: "projects",
                    title: "Project Control",
                  },
                ].map(({ title, description, Icon, target }) => (
                  <button
                    className="rounded-[15px] border border-white/10 bg-[#121525] p-3 text-left transition hover:border-violet-400/40 hover:bg-violet-500/10"
                    key={title}
                    onClick={() => navigate(target as PageId)}
                    type="button"
                  >
                    <Icon className="mb-2 size-4 text-cyan-300" />
                    <b className="block text-xs">{title}</b>
                    <span className="mt-1 block text-[10px] text-white/40">
                      {description}
                    </span>
                  </button>
                ))}
              </div>
              <h2 className="mb-2 mt-5 px-0.5 text-sm font-extrabold">
                Model Router
              </h2>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {models.map(([name, detail]) => (
                  <div
                    className="min-w-[132px] rounded-[15px] border border-white/10 bg-[#101321] p-3"
                    key={name}
                  >
                    <span className="mr-1.5 inline-block size-1.5 rounded-full bg-emerald-300" />
                    <span className="text-xs">{name}</span>
                    <small className="mt-1.5 block text-[10px] text-white/40">
                      {detail}
                    </small>
                  </div>
                ))}
              </div>
            </section>
          )}

          {page === "chat" && (
            <section>
              <div className="px-0.5 pb-5 pt-2">
                <p className="text-[11px] font-bold tracking-[0.16em] text-cyan-300">
                  GT40 CHAT
                </p>
                <h1 className="mt-1.5 text-[27px] font-extrabold leading-tight">
                  สั่งงานได้ตรงนี้
                </h1>
                <p className="mt-1 text-[13px] text-white/45">
                  Orchestrator จะเลือก Agent และ Model ที่เหมาะที่สุด
                </p>
              </div>
              <div className="mb-3 rounded-[20px] border border-violet-300/15 bg-gradient-to-br from-[#201c3c] to-[#15192b] p-4">
                <p className="text-[11px] text-white/45">GT40</p>
                {messages.map((message, index) => (
                  <div
                    className={`mt-2 rounded-[15px] border p-3 text-[13px] leading-relaxed ${index === 0 ? "border-violet-400/30 bg-violet-400/10" : "border-white/10 bg-white/[0.04]"}`}
                    key={message}
                  >
                    {message}
                  </div>
                ))}
              </div>
              <div className="rounded-[20px] border border-white/10 bg-[#111321] p-3">
                <textarea
                  className="min-h-24 w-full resize-none rounded-[14px] border border-white/10 bg-[#0b0d17] p-3 text-xs outline-none placeholder:text-white/30 focus:border-violet-400/60"
                  onChange={(event) => setPrompt(event.target.value)}
                  placeholder="พิมพ์คำสั่ง… เช่น สร้างหน้า Project Control"
                  value={prompt}
                />
                <button
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-[13px] bg-gradient-to-r from-violet-500 to-indigo-500 p-3 text-sm font-extrabold"
                  onClick={() => sendPrompt()}
                  type="button"
                >
                  <Send className="size-4" /> ส่งคำสั่งให้ GT40
                </button>
              </div>
              <h2 className="mb-2 mt-5 px-0.5 text-sm font-extrabold">
                Quick Commands
              </h2>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  className="rounded-[15px] border border-white/10 bg-[#121525] p-3 text-left"
                  onClick={() => sendPrompt("วิเคราะห์โปรเจกต์")}
                  type="button"
                >
                  <b className="text-xs">Analyze</b>
                  <span className="mt-1 block text-[10px] text-white/40">
                    ตรวจจุดเสี่ยง
                  </span>
                </button>
                <button
                  className="rounded-[15px] border border-white/10 bg-[#121525] p-3 text-left"
                  onClick={() => sendPrompt("สร้างแผนงาน")}
                  type="button"
                >
                  <b className="text-xs">Plan</b>
                  <span className="mt-1 block text-[10px] text-white/40">
                    แตกงานเป็น Agent
                  </span>
                </button>
              </div>
            </section>
          )}

          {page === "agents" && (
            <section>
              <PageIntro
                description="แต่ละขั้นมีหน้าที่ชัดเจน พร้อม fallback อัตโนมัติ"
                eyebrow="AGENT WORKFLOW"
                title="ทีม Agent ของคุณ"
              />
              <div className="grid gap-2.5">
                {agents.map(([number, name, description, status]) => (
                  <div
                    className="rounded-[15px] border border-white/10 bg-[#101321] p-3.5"
                    key={name}
                  >
                    <div className="flex items-center justify-between">
                      <b className="text-xs">
                        {number} • {name}
                      </b>
                      <StatusBadge status={status} />
                    </div>
                    <p className="mt-1.5 text-[10px] text-white/40">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
          {page === "projects" && (
            <section>
              <PageIntro
                description="สถานะเดียวกันทั้ง Chat, Agents และ Build"
                eyebrow="PROJECT CONTROL"
                title="โปรเจกต์"
              />
              <div className="grid gap-2.5">
                {[
                  [
                    "Bossnu Neo-Connect",
                    "Mobile refresh • main branch protected",
                    "ACTIVE",
                  ],
                  ["คิดก่อนน่ะ", "Agent Hub • Model Router • QA", "SYNCED"],
                  ["Recent Build", "Build passed • QA ready", "v1.0.8"],
                ].map(([name, detail, status]) => (
                  <div
                    className="rounded-[15px] border border-white/10 bg-[#101321] p-3.5"
                    key={name}
                  >
                    <div className="flex items-center justify-between">
                      <b className="text-xs">{name}</b>
                      <StatusBadge status={status} />
                    </div>
                    <p className="mt-1.5 text-[10px] text-white/40">{detail}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-[20px] border border-white/10 bg-[#111321] p-4">
                <div className="flex justify-between text-xs font-bold">
                  <span>68 / 100 credits</span>
                  <span className="text-white/40">MONTHLY</span>
                </div>
                <div className="my-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
                </div>
                <span className="text-[10px] text-white/40">
                  Smart routing ช่วยลดการใช้ model ที่แพงโดยไม่จำเป็น
                </span>
              </div>
            </section>
          )}
          {page === "settings" && (
            <section>
              <PageIntro
                description="ควบคุม Model Pool, Security และ Automation"
                eyebrow="SETTINGS"
                title="ระบบ"
              />
              <div className="grid gap-2.5">
                {[
                  [
                    "8× Retry / Fallback",
                    "ลองต่อจนได้ผลลัพธ์หรือครบเพดาน",
                    "ON",
                    Zap,
                  ],
                  [
                    "Multi-Model Memory",
                    "แชร์บริบทที่จำเป็นระหว่าง Model",
                    "ON",
                    Bot,
                  ],
                  [
                    "Security Preflight",
                    "ตรวจ policy ก่อน Tool ที่มีผลกระทบ",
                    "ON",
                    ShieldCheck,
                  ],
                ].map(([name, detail, status, Icon]) => (
                  <div
                    className="flex items-start gap-3 rounded-[15px] border border-white/10 bg-[#101321] p-3.5"
                    key={name as string}
                  >
                    <Icon className="mt-0.5 size-4 text-cyan-300" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <b className="text-xs">{name as string}</b>
                        <StatusBadge status={status as string} />
                      </div>
                      <p className="mt-1.5 text-[10px] text-white/40">
                        {detail as string}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <nav className="fixed bottom-0 left-1/2 z-10 grid w-full max-w-[430px] -translate-x-1/2 grid-cols-5 border-t border-white/10 bg-[#090a12]/90 px-3 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] backdrop-blur-xl">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              className={`flex flex-col items-center gap-0.5 py-1 text-[10px] ${page === id ? "text-white" : "text-white/40"}`}
              key={id}
              onClick={() => navigate(id)}
              type="button"
            >
              <Icon
                className={`size-[18px] ${page === id ? "text-cyan-300" : ""}`}
              />
              {label}
            </button>
          ))}
        </nav>
      </div>
    </main>
  );
}

function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="px-0.5 pb-5 pt-2">
      <p className="text-[11px] font-bold tracking-[0.16em] text-cyan-300">
        {eyebrow}
      </p>
      <h1 className="mt-1.5 text-[27px] font-extrabold leading-tight">
        {title}
      </h1>
      <p className="mt-1 text-[13px] text-white/45">{description}</p>
    </div>
  );
}
