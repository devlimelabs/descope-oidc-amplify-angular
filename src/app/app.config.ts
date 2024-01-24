import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { DescopeAuthConfig, DescopeAuthService } from '@descope/angular-sdk';
import { initDescopeAuth } from './init-descope-auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    { provide: DescopeAuthConfig, useValue: { projectId: 'DESCOPE_PROJECT_ID' } },
    {
			provide: APP_INITIALIZER,
			useFactory: initDescopeAuth,
			deps: [DescopeAuthService],
			multi: true
		}
  ]
};
