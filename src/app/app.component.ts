import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DescopeAuthService, DescopeComponent } from '@descope/angular-sdk';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, NgIf, RouterOutlet, RouterLink, DescopeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  private descopeSvc = inject(DescopeAuthService);

  readonly user$ = this.descopeSvc.user$.pipe(map(descopeUser => descopeUser?.user));

  flowId = 'sign-up-or-in';

  title = 'Descope OIDC for AWS Amplify';

  onSuccess(e: CustomEvent) {
    console.log('login in success', e);
  }

  onError(error: CustomEvent) {
    alert('error logging in');
    console.log('error', error);
  }
}
