import { AuthState, SIGN_IN, SIGN_OUT, Action } from "../Types";

const INITIAL_STATE = {
    isSignedIn: null,
    userId: null
};

export default (state: AuthState = INITIAL_STATE, action: Action): AuthState => {
    switch(action.type) {
        case SIGN_IN:
            return {...state, isSignedIn: true, userId: action.payload};
        case SIGN_OUT:
            return {...state, isSignedIn: false, userId: null};
        default:
            return state;
    }       
}