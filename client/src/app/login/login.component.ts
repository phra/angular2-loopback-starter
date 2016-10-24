import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoopBackConfig } from '../../sdk/index';
import { BASE_URL, API_VERSION } from '../environment';
import { Account, AccessToken } from '../../sdk/models';
import { AccountApi, UserApi } from '../../sdk/services';
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
      <input type="text" name="account.username" [(ngModel)]="account.username">
      <input type="password" name="account.password" [(ngModel)]="account.password">
      <button (click)="login()">LOGIN</button>
    </div>
  `
})
export class LoginComponent {

  localState: any;
  // Create model instances and set the right type effortless
  private account: Account = new Account();

  // Configure LoopBack Once or Individually by Component
  constructor(public route: ActivatedRoute, private accountApi: AccountApi) {
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
    this.accountApi.create(this.account).subscribe((account: Account) => (this.account = account) && this.login());
  }

  // Built-in LoopBack Authentication and Typings like Account and TokenInterface
  private login(): void {
    console.log('login');
    this.accountApi.login(this.account).subscribe((token: AccessToken) => alert('Fake Redirect'));
  }
}