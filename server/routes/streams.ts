import {Router, Response, Request} from "express";
import {Stream} from "../models/streams";

interface StreamRequest extends Request {
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

const router = Router();

router.post("/", (req: StreamRequest, res: Response) => {
    const stream = new Stream({title: req.body.title, description: req.body.description, userId: req.body.userId});
    stream.save()
    .then(() => {
        res.status(200).send();
    })
    .catch((err) => {
        console.log(err);
    });
});

router.get("/", (req: StreamRequest, res: Response) => {
    Stream.find({})
    .then((streams) => {
        if(streams. length > 0) {
            res.status(200);
            res.send(streams);
        } else {
            res.status(201).send();
        }
    })
    .catch((err) => {
        console.log(err);
    });
});

router.get("/:userId", (req: StreamRequest, res: Response) => {
    Stream.find({userId: req.params.userId})
    .then((streams) => {
        if(streams.length > 0) {
            res.status(200);
            res.send(streams);
        } else {
            res.status(201).send();
        }
    })
    .catch((err) => {
        console.log(err);
    });
});

router.patch("/:streamId", (req: StreamRequest, res: Response) => {
    Stream.findByIdAndUpdate(req.params.streamId, {title: req.body.title, description: req.body.description})
    .then(() => {
        res.status(200).send();
    })
    .catch((err) => {
        console.log(err);
    });
});

router.get("/:streamId", (req: StreamRequest, res: Response) => {
    Stream.findById(req.params.streamId)
    .then((stream) => {
        res.status(200);
        res.send(stream);
    })
    .catch((err) => {
        console.log(err);
    });
});

router.delete("/:streamId", (req: StreamRequest, res: Response) => {
    Stream.findByIdAndDelete(req.params.streamId)
    .then((stream) => {
        res.status(200);
        res.send(stream);
    })
    .catch((err) => {
        console.log(err);
    });
});


export {router};