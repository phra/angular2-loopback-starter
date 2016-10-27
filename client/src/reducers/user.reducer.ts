import { ActionReducer, Action } from '@ngrx/store';
import { Users } from '../sdk/models/Users';

export const USER = 'USER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

const INITIAL_STATE : Users = Object.create(null);

export const userReducer: ActionReducer<Users> = (user: Users = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        case LOGIN:
            return action.payload;

        case LOGOUT:
        default:
            return INITIAL_STATE;
    }
}