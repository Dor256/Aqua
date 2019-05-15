import {
    Action,
    StreamState,
    FETCH_STREAM,
    FETCH_STREAMS,
    DELETE_STREAM,
    FETCH_USER_STREAMS
} from "../Types";

const mapKeys = (array: any[]) => array.reduce((prev, curr) => {
    return {...prev, [curr._id]: curr};
}, {});

export default (state: StreamState = {}, action: Action): StreamState => {
    switch(action.type) {
        case FETCH_STREAMS:
            return {...state, ...mapKeys(action.payload)};
        case FETCH_STREAM:
            return {...state, [action.payload._id]: action.payload};
        case FETCH_USER_STREAMS:
            return {...state, ...mapKeys(action.payload)};
        case DELETE_STREAM:
            const {[action.payload._id]: omit, ...newState} = state;
            return newState;
        default:
            return state;
    }
}