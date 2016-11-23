import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BASE_URL, API_VERSION } from '../environment';
import { Account, AccessToken, Products } from '../../sdk/models';
import { AccountApi, ProductsApi } from '../../sdk/services';
import { USER } from '../../reducers/user.reducer';
import { LOGIN_EFFECT, LOGOUT_EFFECT, GET_CURRENT_EFFECT } from '../../effects/user.effect';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../../states/index';
/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`Login` component loaded asynchronously');

@Component({
  selector: 'login',
  styles: [`
  `],
  encapsulation: ViewEncapsulation.Emulated,
  template: `
    <login-form (tryLogin)="login($event)" (tryLogout)="logout($event)" [loggedUser]="user | async"></login-form>
    <signup-form (trySignup)="signup($event)" [loggedUser]="user | async"></signup-form>
    {{ user | async | json }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  localState: any;
  // Create model instances and set the right type effortless
  private user: Observable<Account>;

  // Configure LoopBack Once or Individually by Component
  constructor(public route: ActivatedRoute, private accountApi: AccountApi, private productsApi: ProductsApi, private store: Store<AppState>) {
      this.user = store.select(USER);
  }

  ngOnInit() {
    this.route
      .data
      .subscribe((data: any) => {
        // your resolved data from route
        this.localState = data.yourData;
      });
    this.store.dispatch({ type: GET_CURRENT_EFFECT });
    console.log('hello `Login` component');
  }
    // Start making API calls right away
  private signup(user: Account): void {
    this.accountApi.create(user).subscribe((user: Account) => this.login(user));
  }

  // Built-in LoopBack Authentication accountApiand Typings like Account and TokenInterface
  private login(user: Account): void {
    //this.usersApi.login(user).subscribe((token: AccessToken) => alert('Fake Redirect') || this.store.dispatch({ type: LOGIN, payload: token.user }));
    //this.productsApi.findOne().subscribe(console.log);
    this.store.dispatch({ type: LOGIN_EFFECT, payload: user });
  }

  private logout(): void {
    //this.usersApi.logout().subscribe( () => this.store.dispatch({ type: LOGOUT }));
    this.store.dispatch({ type: LOGOUT_EFFECT });
  }
}
