import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoopBackConfig } from '../../sdk/index';
import { BASE_URL, API_VERSION } from '../environment';
import { Account, AccessToken, Products, Users } from '../../sdk/models';
import { AccountApi, UserApi, ProductsApi, UsersApi } from '../../sdk/services';
import { LOGIN, LOGOUT, USER } from '../../reducers/user.reducer';
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
  template: `
    <login-form (tryLogin)="login($event)" ></login-form>
    <signup-form (trySignup)="signup($event)" ></signup-form>
    {{ user1 | async | json }}
  `
})
export class LoginComponent {

  localState: any;
  // Create model instances and set the right type effortless
  private user: Users = new Users();
  private user1: Observable<Users>;

  // Configure LoopBack Once or Individually by Component
  constructor(public route: ActivatedRoute, private usersApi: UsersApi, private productsApi: ProductsApi, private store: Store<AppState>) {
      LoopBackConfig.setBaseURL(BASE_URL);
      LoopBackConfig.setApiVersion(API_VERSION);
      this.user1 = store.select(USER);
  }

  ngOnInit() {
    this.route
      .data
      .subscribe((data: any) => {
        // your resolved data from route
        this.localState = data.yourData;
      });
    console.log('hello `Login` component');
  }
    // Start making API calls right away
  private signup(user: Users): void {
    this.usersApi.create(this.user).subscribe((user: Users) => (this.user = user) && this.login(user));
  }

  // Built-in LoopBack Authentication accountApiand Typings like Account and TokenInterface
  private login(user: Users): void {
    console.log('login');
    this.usersApi.login(user).subscribe((token: AccessToken) => alert('Fake Redirect') || this.store.dispatch({ type: LOGIN, payload: token.user }));
    this.productsApi.findOne().subscribe(console.log);
  }
}