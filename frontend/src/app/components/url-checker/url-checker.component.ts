import { Component } from '@angular/core';
import { AnalyzeService } from '../../services/analyze.service';

@Component({
  selector: 'app-url-checker',
  templateUrl: './url-checker.component.html',
  styleUrls: ['./url-checker.component.css']
})
export class UrlCheckerComponent {
  url: string = '';
  result: any = null;
  loading: boolean = false;
  error: string = '';

  constructor(private analyzeService: AnalyzeService) {}

  async analyze() {
    if (!this.url.trim()) return;

    this.loading = true;
    this.result = null;
    this.error = '';

    try {
      this.result = await this.analyzeService.check('url', this.url);
    } catch (err) {
      this.error = 'Analysis failed. Please try again.';
      console.error(err);
    } finally {
      this.loading = false;
    }
  }

  clear() {
    this.url = '';
    this.result = null;
    this.error = '';
  }
}