import {Router, Response } from "express";
import {Stream} from "../models/streams";
import { StreamRequest, NOT_FOUND, OK } from "../Types";

const router = Router();

router.get("/:userId", (req: StreamRequest, res: Response) => {
    Stream.find({userId: req.params.userId})
    .then((streams) => {
        if(streams.length > 0) {
            res.status(OK);
            res.send(streams);
        } else {
            res.status(NOT_FOUND).send();
        }
    })
    .catch((err) => {
        console.log(err);
    });
});

export default router;