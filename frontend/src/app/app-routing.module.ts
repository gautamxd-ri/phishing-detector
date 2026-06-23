import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UrlCheckerComponent } from './components/url-checker/url-checker.component';
import { EmailAnalyzerComponent } from './components/email-analyzer/email-analyzer.component';
import { SmsScannerComponent } from './components/sms-scanner/sms-scanner.component';

const routes: Routes = [
  { path: '', redirectTo: 'url', pathMatch: 'full' },
  { path: 'url', component: UrlCheckerComponent },
  { path: 'email', component: EmailAnalyzerComponent },
  { path: 'sms', component: SmsScannerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
