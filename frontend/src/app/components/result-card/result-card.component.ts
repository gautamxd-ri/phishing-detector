import { Component, Input } from '@angular/core';
import { AnalyzeService } from '../../services/analyze.service';

@Component({
  selector: 'app-result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.css']
})
export class ResultCardComponent {
  @Input() result: any = null;

  showCorrection = false;
  feedbackLoading = false;
  feedbackError = '';

  constructor(private analyzeService: AnalyzeService) {}

  get feedbackGiven(): boolean {
    return this.result?.feedback === 'up' || this.result?.feedback === 'down';
  }

  async thumbsUp(): Promise<void> {
    await this.sendFeedback('up');
  }

  thumbsDown(): void {
    this.showCorrection = true;
  }

  async submitCorrection(correctedVerdict: string): Promise<void> {
    await this.sendFeedback('down', correctedVerdict);
    this.showCorrection = false;
  }

  cancelCorrection(): void {
    this.showCorrection = false;
  }

  private async sendFeedback(feedback: 'up' | 'down', correctedVerdict?: string): Promise<void> {
    if (!this.result || this.feedbackGiven) return;

    this.feedbackLoading = true;
    this.feedbackError = '';

    try {
      const response = await this.analyzeService.submitFeedback(
        feedback,
        this.result._id,
        this.result.key,
        correctedVerdict
      );

      this.result = {
        ...this.result,
        feedback: response.scan.feedback,
        correctedVerdict: response.scan.correctedVerdict,
        feedbackAt: response.scan.feedbackAt
      };
    } catch (err) {
      this.feedbackError = 'Could not save feedback. Please try again.';
      console.error(err);
    } finally {
      this.feedbackLoading = false;
    }
  }
}
