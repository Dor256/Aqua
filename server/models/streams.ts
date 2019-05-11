import {Schema, model} from "mongoose";

const streamSchema = new Schema({
    title: String,
    description: String,
    id: Schema.Types.ObjectId,
    userId: String
});

const Stream = model("Stream", streamSchema, "streams");

export {Stream};
