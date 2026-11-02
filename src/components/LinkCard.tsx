"use client";

import type { Link } from "@/data/profile";

function trackClick(linkId: string) {
  const body = JSON.stringify({ linkId });
  // sendBeacon은 새 탭으로 이동해도 요청이 끊기지 않습니다.
  if (navigator.sendBeacon?.("/api/click", new Blob([body], { type: "application/json" }))) {
    return;
  }
  fetch("/api/click", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}

type LinkCardProps = {
  link: Link;
  count: number;
  onClick?: () => void;
};

export default function LinkCard({ link, count, onClick }: LinkCardProps) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        trackClick(link.id);
        onClick?.();
      }}
      className="relative block w-full rounded-2xl border border-white/70 bg-white/45 px-16 py-[18px] text-center text-[15px] font-semibold shadow-[0_4px_24px_-10px_rgba(150,80,40,0.25)] backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-px hover:bg-white/65 hover:shadow-[0_8px_28px_-10px_rgba(150,80,40,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70 active:translate-y-0 active:scale-[0.99] motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_4px_24px_-10px_rgba(0,0,0,0.6)] dark:hover:bg-white/10"
    >
      {link.title}
      <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-medium tabular-nums text-muted">
        {count.toLocaleString("ko-KR")}회
      </span>
    </a>
  );
}
