"use client";

import { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { Link } from "@/data/profile";

type Counts = Record<string, number>;

export default function LinkList({ links }: { links: Link[] }) {
  const [counts, setCounts] = useState<Counts>({});

  // 페이지가 열릴 때 모든 링크의 클릭 수를 한 번에 가져옵니다.
  useEffect(() => {
    let ignore = false;
    fetch("/api/click", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { counts: Counts } | null) => {
        if (ignore || !data) return;
        // 응답 전에 눌린 클릭이 덮어써지지 않도록 큰 값을 유지합니다.
        setCounts((prev) => {
          const next = { ...data.counts };
          for (const [id, n] of Object.entries(prev)) {
            next[id] = Math.max(next[id] ?? 0, n);
          }
          return next;
        });
      })
      .catch(() => {});
    return () => {
      ignore = true;
    };
  }, []);

  function handleClick(linkId: string) {
    setCounts((prev) => ({ ...prev, [linkId]: (prev[linkId] ?? 0) + 1 }));
  }

  return (
    <ul className="mt-12 flex flex-col gap-4">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard
            link={link}
            count={counts[link.id] ?? 0}
            onClick={() => handleClick(link.id)}
          />
        </li>
      ))}
    </ul>
  );
}
