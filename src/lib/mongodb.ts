import { MongoClient, type Db } from "mongodb";

const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

// MONGODB_URI가 없으면 null을 반환해 호출 측에서 안전하게 처리하도록 합니다.
export async function getDb(): Promise<Db | null> {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;

  // 개발 모드 HMR로 모듈이 다시 로드돼도 연결을 재사용하도록 global에 캐시합니다.
  globalForMongo._mongoClientPromise ??= new MongoClient(uri).connect();
  const client = await globalForMongo._mongoClientPromise;
  return client.db(process.env.MONGODB_DB ?? "linknamu");
}
