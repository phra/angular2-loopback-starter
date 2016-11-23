import { ActionReducer, Action } from '@ngrx/store';
import { Account } from '../sdk/models';

export const USER = 'USER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

const INITIAL_STATE : Account = null;

export const userReducer: ActionReducer<Account> = (user: Account = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        case LOGIN:
            return action.payload;

        case LOGOUT:
        default:
            return INITIAL_STATE;
    }
}