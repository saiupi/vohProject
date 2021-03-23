import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import 'hammerjs';
import Amplify, { Auth, Analytics } from 'aws-amplify';
import awsconfig from './aws-exports';

if (environment.production) {
  enableProdMode();
  if (window) {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    window.console.log = () => {};
  }
}
const storage = {
  bucket: environment.bucket,
  region: environment.region,
  identityPoolId: environment.aws_identity_pool_id,
};

Amplify.configure(awsconfig);
Amplify.configure({
  Storage: {
    AWSS3: storage,
  },
  Auth: environment.auth,
  Analytics: environment.Analytics,
});

// You can get the current config object
const currentConfig = Auth.configure();
Analytics.configure(environment.Analytics);
Analytics.autoTrack('pageView', {
  enable: true,
  eventName: 'pageView',
  type: 'multiPageApp',
  getUrl: () => {
    return window.location.href;
  },
});

Analytics.autoTrack('event', {
  enable: true,
  events: ['click'],
  selectorPrefix: 'data-amplify-analytics-',
});

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.log(err));
});
