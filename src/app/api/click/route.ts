import { connection } from "next/server";
import { links } from "@/data/profile";
import { getDb } from "@/lib/mongodb";

type ClickDoc = { linkId: string; count: number };

const linkIds = new Set(links.map((link) => link.id));

function dbUnavailable() {
  return Response.json(
    { error: "MONGODB_URI가 설정되지 않았습니다." },
    { status: 503 },
  );
}

// 링크별 클릭 수 조회
export async function GET() {
  // 빌드 시 정적으로 프리렌더되지 않도록 요청 시점에 실행합니다.
  await connection();

  const db = await getDb();
  if (!db) return dbUnavailable();

  const docs = await db
    .collection<ClickDoc>("clicks")
    .find({}, { projection: { _id: 0, linkId: 1, count: 1 } })
    .toArray();

  const counts = Object.fromEntries(links.map((link) => [link.id, 0]));
  for (const doc of docs) counts[doc.linkId] = doc.count;

  return Response.json({ counts });
}

// 클릭 1회 기록
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const linkId = body?.linkId;
  if (typeof linkId !== "string" || !linkIds.has(linkId)) {
    return Response.json({ error: "알 수 없는 링크입니다." }, { status: 400 });
  }

  const db = await getDb();
  if (!db) return dbUnavailable();

  await db
    .collection<ClickDoc>("clicks")
    .updateOne({ linkId }, { $inc: { count: 1 } }, { upsert: true });

  return new Response(null, { status: 204 });
}
