import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UrlCheckerComponent } from './components/url-checker/url-checker.component';
import { EmailAnalyzerComponent } from './components/email-analyzer/email-analyzer.component';
import { SmsScannerComponent } from './components/sms-scanner/sms-scanner.component';
import { ResultCardComponent } from './components/result-card/result-card.component';

@NgModule({
  declarations: [
    AppComponent,
    UrlCheckerComponent,
    EmailAnalyzerComponent,
    SmsScannerComponent,
    ResultCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
