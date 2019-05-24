import { Action, Dispatch } from "redux";
import { FormState } from "redux-form";
import { RouteComponentProps } from "react-router";

type AuthObject = {
    clientId: string,
    scope: string
}

export type Action = 
| {type: "FETCH_STREAMS" | "FETCH_USER_STREAMS", payload: Payload[]}
| {type: "FETCH_STREAM" | "DELETE_STREAM" | "MAYBE_DELETE", payload: Payload}
| {type: "SIGN_IN", payload: string}
| {type: "SIGN_OUT"}
| {type: "GET_STREAM_STATE", payload: boolean}
| {type: "CREATE_STREAM" | "EDIT_STREAM"}

export type AuthState = {
    isSignedIn: boolean | null,
    userId: string | null
}

export type StreamState = {
    [key: string]: Payload
}

export type ConnectionState = {
    isStreaming: boolean
}

export type Payload = {
    _id: string,
    title: string,
    description: string
}

export interface Stream extends Payload {
    __v: number
    userId: string
}

export type API = {
    load: Function,
        client: {
            init: ({}: AuthObject) => Promise<any>
        },
        auth2: {
            getAuthInstance: Function
        }
}

export type FormValues = {
    [key: string]: string
}

export type State = {
    auth: AuthState,
    form: FormState,
    streams: StreamState,
    connection: ConnectionState
}

export interface RouteComponentProps {
    match: {
        params: {
            id: string
        }
    },
    fetchStream: (id: string) => (dispatch: Dispatch) => Promise<void>,
    stream: Stream
}
