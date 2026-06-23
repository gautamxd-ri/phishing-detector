import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';

@Injectable({ providedIn: 'root' })
export class IdbService {

  private db!: IDBPDatabase;
  private readonly DB_NAME = 'phishing_cache';
  private readonly STORE_NAME = 'results';

  // Opens the IndexedDB database (creates it if it doesn't exist)
  private async getDb(): Promise<IDBPDatabase> {
    if (this.db) return this.db;

    this.db = await openDB(this.DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('results')) {
          db.createObjectStore('results', { keyPath: 'key' });
        }
      }
    });

    return this.db;
  }

  // Get a cached result by key
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

  // Save a result to cache
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

  // Get all cached results (for history section)
  async getAll(): Promise<any[]> {
    try {
      const db = await this.getDb();
      const all = await db.getAll(this.STORE_NAME);
      // Return sorted by most recent first
      return all.sort((a, b) => b.cachedAt - a.cachedAt);
    } catch (error) {
      console.error('IDB getAll error:', error);
      return [];
    }
  }

  // Delete a single entry
  async delete(key: string): Promise<void> {
    try {
      const db = await this.getDb();
      await db.delete(this.STORE_NAME, key);
    } catch (error) {
      console.error('IDB delete error:', error);
    }
  }

  // Clear the entire cache
  async clearAll(): Promise<void> {
    try {
      const db = await this.getDb();
      await db.clear(this.STORE_NAME);
    } catch (error) {
      console.error('IDB clearAll error:', error);
    }
  }

  // Check if a key exists (without fetching full data)
  async has(key: string): Promise<boolean> {
    try {
      const result = await this.get(key);
      return result !== null;
    } catch {
      return false;
    }
  }

}