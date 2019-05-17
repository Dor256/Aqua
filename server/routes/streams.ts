import {Router, Response } from "express";
import {Stream} from "../models/streams";
import { StreamRequest, NOT_FOUND, OK } from "../Types";

const router = Router();

router.post("/", (req: StreamRequest, res: Response) => {
    const stream = new Stream({title: req.body.title, description: req.body.description, userId: req.body.userId});
    stream.save()
    .then(() => {
        res.status(OK).send();
    })
    .catch((err) => {
        console.log(err);
    });
});

router.get("/", (req: StreamRequest, res: Response) => {
    Stream.find({})
    .then((streams) => {
        if(streams. length > 0) {
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

router.patch("/:streamId", (req: StreamRequest, res: Response) => {
    Stream.findByIdAndUpdate(req.params.streamId, {title: req.body.title, description: req.body.description})
    .then(() => {
        res.status(OK).send();
    })
    .catch((err) => {
        console.log(err);
    });
});

router.get("/:streamId", (req: StreamRequest, res: Response) => {
    Stream.findById(req.params.streamId)
    .then((stream) => {
        if(stream) {
            res.status(OK);
            res.send(stream);
        } else {
            res.status(NOT_FOUND).send();
        }
    })
    .catch((err) => {
        console.log(err);
    });
});

router.delete("/:streamId", (req: StreamRequest, res: Response) => {
    Stream.findByIdAndDelete(req.params.streamId)
    .then((stream) => {
        res.status(OK);
        res.send(stream);
    })
    .catch((err) => {
        console.log(err);
    });
});


export default router;