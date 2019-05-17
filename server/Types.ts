import { Request } from "express";

export const OK = 200;
export const NOT_FOUND = 201;

export interface StreamRequest extends Request {
    body: {
        title: string,
        description: string,
        userId: string
    },
    params: {
        streamId: string,
        userId: string
    }
}