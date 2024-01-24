import { DescopeAuthService } from '@descope/angular-sdk';
import { Amplify } from 'aws-amplify';
import { TokenProvider, decodeJWT } from 'aws-amplify/auth';
import { lastValueFrom, zip } from 'rxjs';
import amplifyconfig from '../amplifyconfiguration.json';

export function initDescopeAuth(descopeAuthSvc: DescopeAuthService) {
	return async () => {
    await lastValueFrom(zip([descopeAuthSvc.refreshSession(), descopeAuthSvc.refreshUser()]));

    const descopeTokenProvider: TokenProvider = {
      async getTokens({ forceRefresh } = {}) {

        if (forceRefresh) {
          await lastValueFrom(descopeAuthSvc.refreshSession());
        }

        const token = descopeAuthSvc.getSessionToken();
        const accessTokenString = token ? `Bearer ${token}` : '';

        return {
          accessToken: decodeJWT(accessTokenString)
        };
      },
    };

    Amplify.configure(amplifyconfig, { Auth: { tokenProvider: descopeTokenProvider } });

    return;
  };
}
