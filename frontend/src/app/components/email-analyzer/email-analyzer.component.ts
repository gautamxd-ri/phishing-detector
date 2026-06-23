import { Component } from '@angular/core';
import { AnalyzeService } from '../../services/analyze.service';

@Component({
  selector: 'app-email-analyzer',
  templateUrl: './email-analyzer.component.html',
  styleUrls: ['./email-analyzer.component.css']
})
export class EmailAnalyzerComponent {
  emailText: string = '';
  result: any = null;
  loading: boolean = false;
  error: string = '';

  constructor(private analyzeService: AnalyzeService) {}

  async analyze() {
    if (!this.emailText.trim()) return;

    this.loading = true;
    this.result = null;
    this.error = '';

    try {
      this.result = await this.analyzeService.check('email', this.emailText);
    } catch (err) {
      this.error = 'Analysis failed. Please try again.';
      console.error(err);
    } finally {
      this.loading = false;
    }
  }

  clear() {
    this.emailText = '';
    this.result = null;
    this.error = '';
  }
}
