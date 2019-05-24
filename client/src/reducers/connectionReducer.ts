import { Action } from "../Types";
import { GET_STREAM_STATE } from "../Constants";

export default (state: {isStreaming: boolean} = {isStreaming: false}, action: Action) => {
    switch(action.type) { 
        case GET_STREAM_STATE:
            return {...state, isStreaming: action.payload};
        default:
            return state;
    }
}