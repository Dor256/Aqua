import { Dispatch } from "redux"; 
import streams from "../apis/streams";
import history from "../history";
import { 
    SIGN_IN,
    SIGN_OUT,
    CREATE_STREAM,
    DELETE_STREAM,
    EDIT_STREAM,
    FETCH_STREAM,
    FETCH_STREAMS,
    Action, 
    FormValues, 
    State
} from "../Types";
import thanosFade from "../thanosFade";


export const signIn = (userId: string): Action => {
    return {
        type: SIGN_IN,
        payload: userId
    };
}

export const signOut = (): Action => {
    return {
        type: SIGN_OUT
    };
}

export const createStream = (formValues: FormValues) => async (dispatch: Dispatch, getState: () => State) => {
    const {userId} = getState().auth;
    const response = await streams.post("/streams", {...formValues, userId});
    if(response.status === 200) {
        dispatch({type: CREATE_STREAM});
        history.push("/");
    }
}

export const fetchStreams = () => async (dispatch: Dispatch) => {
    const response = await streams.get("/streams");
    if(response.status === 200) {
        dispatch({type: FETCH_STREAMS, payload: response.data});
    }
}

export const fetchStream = (id: string) => async (dispatch: Dispatch) => {
    const response = await streams.get(`/streams/${id}`);
    if(response.status === 200) {
        dispatch({type: FETCH_STREAM, payload: response.data});
    }
}

export const editStream = (id: string, formValues: FormValues) => async (dispatch: Dispatch) => {
    const response = await streams.patch(`/streams/${id}`, formValues);
    if(response.status === 200) {
        dispatch({type: EDIT_STREAM});
        history.push("/");
    }
}

export const deleteStream = (id: string) => async (dispatch: Dispatch) => {
    const response = await streams.delete(`/streams/${id}`);
    if(response.status === 200) {
        history.push("/");
        thanosFade(id)
        setTimeout(() => dispatch({type: DELETE_STREAM, payload: response.data}), 1300);
    }
}