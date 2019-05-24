import { Dispatch } from "redux"; 
import streams from "../apis/streams";
import history from "../history";
import thanosFade from "../thanosFade";
import { Action, FormValues, State,Stream } from "../Types";
import { 
    SIGN_IN,
    SIGN_OUT,
    CREATE_STREAM,
    DELETE_STREAM,
    EDIT_STREAM,
    FETCH_STREAM,
    FETCH_STREAMS,
    FETCH_USER_STREAMS,
    GET_STREAM_STATE,
} from "../Constants";

export const signIn = (userId: string): Action => {
    return {
        type: SIGN_IN,
        payload: userId
    };
}

export const signOut = (): Action => {
    return {type: SIGN_OUT};
}

export const getStreamState = (streamStatus: boolean) => {
    return {type: GET_STREAM_STATE, payload: streamStatus};
}

export const createStream = (formValues: FormValues | Stream) => async (dispatch: Dispatch, getState: () => State) => {
    const {userId} = getState().auth;
    const response = await streams.post("/streams", {...formValues, userId});
    if(response.status === 200) {
        dispatch({type: CREATE_STREAM});
        history.push(`/dashboard/${userId}`);
    }
}

export const fetchStreams = () => async (dispatch: Dispatch) => {
    const response = await streams.get("/streams");
    if(response.status === 200) {
        dispatch({type: FETCH_STREAMS, payload: response.data});
    }
}

export const fetchUserStreams = (userId: string) => async (dispatch: Dispatch) => {
    if(userId) {
        const response = await streams.get(`/dashboard/${userId}`);
        if(response.status === 200) {
            dispatch({type: FETCH_USER_STREAMS, payload: response.data});
        }
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

export const deleteStream = (id: string, userId: string | null = null) => async (dispatch: Dispatch) => {
    const response = await streams.delete(`/streams/${id}`);
    if(response.status === 200) {
        userId ? history.push(`/dashboard/${userId}`) : history.push("/");
        thanosFade(id);
        setTimeout(() => dispatch({type: DELETE_STREAM, payload: response.data}), 1300);
    }
}