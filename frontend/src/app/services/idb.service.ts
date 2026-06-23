import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';

@Injectable({ providedIn: 'root' })
export class IdbService {

  private db!: IDBPDatabase;
  private readonly DB_NAME = 'phishing_cache';
  private readonly STORE_NAME = 'results';

private async getDb(): Promise<IDBPDatabase> {
  if (this.db) {
    try {
      this.db.transaction(this.STORE_NAME, 'readonly');
      return this.db;
    } catch {
      this.db = null!;
    }
  }

  const self = this;  // ← fix for 'this' context issue

  this.db = await openDB(this.DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('results')) {
        db.createObjectStore('results', { keyPath: 'key' });
      }
    },
    blocked() {
      console.warn('IDB blocked');
    },
    blocking() {
      self.db?.close();
      self.db = null!;
    },
    terminated() {
      self.db = null!;
    }
  });

  return this.db;
}
  async get(key: string): Promise<any | null> {
    try {
      const db = await this.getDb();
      const result = await db.get(this.STORE_NAME, key);
      return result ?? null;
    } catch (error) {
      console.error('IDB get error:', error);
      return null;
    }
  }

  async set(key: string, value: any): Promise<void> {
    try {
      const db = await this.getDb();
      await db.put(this.STORE_NAME, {
        key,
        ...value,
        cachedAt: Date.now()
      });
    } catch (error) {
      console.error('IDB set error:', error);
    }
  }

  async getAll(): Promise<any[]> {
    try {
      const db = await this.getDb();
      const all = await db.getAll(this.STORE_NAME);
      return all.sort((a, b) => b.cachedAt - a.cachedAt);
    } catch (error) {
      console.error('IDB getAll error:', error);
      return [];
    }
  }

  async clearAll(): Promise<void> {
    try {
      const db = await this.getDb();
      await db.clear(this.STORE_NAME);
    } catch (error) {
      console.error('IDB clearAll error:', error);
    }
  }
}
