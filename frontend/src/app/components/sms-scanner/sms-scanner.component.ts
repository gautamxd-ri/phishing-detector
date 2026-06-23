import { Component } from '@angular/core';
import { AnalyzeService } from '../../services/analyze.service';

@Component({
  selector: 'app-sms-scanner',
  templateUrl: './sms-scanner.component.html',
  styleUrls: ['./sms-scanner.component.css']
})
export class SmsScannerComponent {
  smsText: string = '';
  result: any = null;
  loading: boolean = false;
  error: string = '';

  constructor(private analyzeService: AnalyzeService) {}

  async analyze() {
    if (!this.smsText.trim()) return;

    this.loading = true;
    this.result = null;
    this.error = '';

    try {
      this.result = await this.analyzeService.check('sms', this.smsText);
    } catch (err) {
      this.error = 'Analysis failed. Please try again.';
      console.error(err);
    } finally {
      this.loading = false;
    }
  }

  clear() {
    this.smsText = '';
    this.result = null;
    this.error = '';
  }
}
