import { Injectable, Inject } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Account, AccessToken } from '../sdk/models';
import { AccountApi } from '../sdk/services';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { LOGIN, LOGOUT } from '../reducers/user.reducer';

export const LOGIN_EFFECT = 'LOGIN_EFFECT';
export const LOGOUT_EFFECT = 'LOGOUT_EFFECT';
export const GET_CURRENT_EFFECT = 'GET_CURRENT_EFFECT';
export const LOGIN_EFFECT_FAILED = 'LOGIN_EFFECT_FAILED';
export const LOGOUT_EFFECT_FAILED = 'LOGOUT_EFFECT_FAILED';
export const GET_CURRENT_EFFECT_FAILED = 'GET_CURRENT_EFFECT_FAILED';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private accountApi: AccountApi) {
  }

  @Effect() login$ = this.actions$
      .ofType(LOGIN_EFFECT)
      .map(toPayload)
      .switchMap(payload => this.accountApi.login(payload))
        .map(token => ({ type: LOGIN, payload: token.user }))
        .catch(() => Observable.of({ type: LOGIN_EFFECT_FAILED }));

  @Effect() logout$ = this.actions$
    .ofType(LOGOUT_EFFECT)
    .switchMap(payload => this.accountApi.logout())
      .map(() => ({ type: LOGOUT }))
      .catch(() => Observable.of({ type: LOGOUT_EFFECT_FAILED }));  

  @Effect() getCurrent$ = this.actions$
    .ofType(GET_CURRENT_EFFECT)
    .switchMap(() => this.accountApi.getCurrent())
      .map(user => ({ type: LOGIN, payload: user }))
      .catch(() => Observable.of({ type: GET_CURRENT_EFFECT_FAILED }));
}