import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoopBackConfig } from '../../sdk/index';
import { BASE_URL, API_VERSION } from '../environment';
import { Account, AccessToken, Products, Users } from '../../sdk/models';
import { AccountApi, UserApi, ProductsApi, UsersApi } from '../../sdk/services';
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
    <div>
      <h1>Login</h1>
      <input type="text" name="user.username" [(ngModel)]="user.username">
      <input type="password" name="user.password" [(ngModel)]="user.password">
      <button (click)="login()">LOGIN</button>
    </div>
  `
})
export class LoginComponent {

  localState: any;
  // Create model instances and set the right type effortless
  private user: Users = new Users();

  // Configure LoopBack Once or Individually by Component
  constructor(public route: ActivatedRoute, private usersApi: UsersApi, private productsApi: ProductsApi) {
      LoopBackConfig.setBaseURL(BASE_URL);
      LoopBackConfig.setApiVersion(API_VERSION);
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
  private signup(): void {
    this.usersApi.create(this.user).subscribe((user: Users) => (this.user = user) && this.login());
  }

  // Built-in LoopBack Authentication accountApiand Typings like Account and TokenInterface
  private login(): void {
    console.log('login');
    this.productsApi.findOne().subscribe(console.log);
    this.usersApi.login(this.user).subscribe((token: AccessToken) => alert('Fake Redirect'));
  }
}