import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { IdbService } from './idb.service';
import { environment } from '../environments/environment';
@Injectable({ providedIn: 'root' })
export class AnalyzeService {

 private API_BASE = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private idb: IdbService
  ) {}

  async check(type: string, text: string): Promise<any> {
    const key = type + ':' + text.trim();

    const cached = await this.idb.get(key);
    if (cached) {
      console.log('IDB cache hit!');
      return { ...cached, source: cached.source || 'idb' };
    }

    const result: any = await firstValueFrom(
      this.http.post(`${this.API_BASE}/analyze`, { type, text: text.trim() })
    );

    const enriched = {
      ...result,
      key,
      source: result.fromCache
        ? 'mongodb'
        : (result.modelSource === 'mock' ? 'mock' : 'huggingface')
    };

    await this.idb.set(key, enriched);

    return enriched;
  }

  async submitFeedback(
    feedback: 'up' | 'down',
    scanId?: string,
    key?: string,
    correctedVerdict?: string
  ): Promise<any> {
    const body: any = { feedback };
    if (scanId) body.scanId = scanId;
    if (key) body.key = key;
    if (correctedVerdict) body.correctedVerdict = correctedVerdict;

    const response: any = await firstValueFrom(
      this.http.post(`${this.API_BASE}/feedback`, body)
    );

    if (key) {
      const cached = await this.idb.get(key);
      if (cached) {
        await this.idb.set(key, {
          ...cached,
          feedback,
          correctedVerdict: response.scan?.correctedVerdict,
          feedbackAt: response.scan?.feedbackAt
        });
      }
    }

    return response;
  }

  async getHistory(): Promise<any[]> {
    return this.idb.getAll();
  }

  async clearHistory(): Promise<void> {
    return this.idb.clearAll();
  }
}
