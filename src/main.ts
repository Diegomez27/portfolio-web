import { bootstrapApplication } from '@angular/platform-browser';
import { inject as injectVercelAnalytics } from '@vercel/analytics';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

injectVercelAnalytics();

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
);
