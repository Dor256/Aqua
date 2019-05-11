import { Action, Dispatch } from "redux";
import { FormState } from "redux-form";
import { RouteComponentProps } from "react-router";

type AuthObject = {
    clientId: string,
    scope: string
}

export type Action = 
| {type: "FETCH_STREAMS", payload: Payload[]}
| {type: "FETCH_STREAM" | "DELETE_STREAM", payload: Payload}
| {type: "SIGN_IN", payload: string}
| {type: "SIGN_OUT"}
| {type: "CREATE_STREAM" | "EDIT_STREAM"}

export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT"; 
export const CREATE_STREAM = "CREATE_STREAM";
export const FETCH_STREAMS = "FETCH_STREAMS";
export const FETCH_STREAM = "FETCH_STREAM";
export const DELETE_STREAM = "DELETE_STREAM";
export const EDIT_STREAM = "EDIT_STREAM";

export type AuthState = {
    isSignedIn: boolean | null,
    userId: string | null
}

export type StreamState = {
    [key: string]: Payload
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
    auth: AuthState
    form: FormState
    streams: StreamState
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
