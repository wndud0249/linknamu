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

export default function LinkCard({ link }: { link: Link }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackClick(link.id)}
      className="block w-full rounded-xl border border-zinc-200 bg-white px-5 py-4 text-center font-medium shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md active:translate-y-0 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-emerald-600"
    >
      {link.title}
    </a>
  );
}
