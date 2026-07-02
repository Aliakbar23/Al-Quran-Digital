import Dexie, { type EntityTable } from "dexie";

export interface CachedSurah {
  id: number;
  data: unknown;
  cachedAt: number;
}

export interface Bookmark {
  id?: number;
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  text: string;
  savedAt: number;
}

export interface LastRead {
  id: 1;
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  updatedAt: number;
}

export interface TasbihRecord {
  id?: number;
  date: string;
  count: number;
}

const db = new Dexie("QuranDB") as Dexie & {
  cachedSurahs: EntityTable<CachedSurah, "id">;
  bookmarks: EntityTable<Bookmark, "id">;
  lastRead: EntityTable<LastRead, "id">;
  tasbih: EntityTable<TasbihRecord, "id">;
};

db.version(1).stores({
  cachedSurahs: "id, cachedAt",
  bookmarks: "++id, surahNumber, savedAt",
  lastRead: "id",
  tasbih: "++id, date",
});

export default db;

// ---- Helpers ----

export async function saveLastRead(surahNumber: number, surahName: string, ayahNumber: number) {
  await db.lastRead.put({ id: 1, surahNumber, surahName, ayahNumber, updatedAt: Date.now() });
}

export async function getLastRead() {
  return db.lastRead.get(1);
}

export async function toggleBookmark(surahNumber: number, surahName: string, ayahNumber: number, text: string) {
  const existing = await db.bookmarks
    .where("surahNumber").equals(surahNumber)
    .and((b) => b.ayahNumber === ayahNumber)
    .first();

  if (existing?.id !== undefined) {
    await db.bookmarks.delete(existing.id);
    return false;
  } else {
    await db.bookmarks.add({ surahNumber, surahName, ayahNumber, text, savedAt: Date.now() });
    return true;
  }
}

export async function isBookmarked(surahNumber: number, ayahNumber: number) {
  const b = await db.bookmarks
    .where("surahNumber").equals(surahNumber)
    .and((b) => b.ayahNumber === ayahNumber)
    .first();
  return !!b;
}

export async function getAllBookmarks() {
  return db.bookmarks.orderBy("savedAt").reverse().toArray();
}

export async function getBookmarkedAyahsForSurah(surahNumber: number) {
  return db.bookmarks.where("surahNumber").equals(surahNumber).toArray();
}
