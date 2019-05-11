import {Router, Response, Request} from "express";
import {Stream} from "../models/streams";

interface StreamRequest extends Request {
    body: {
        title: string,
        description: string,
        userId: string
    },
    params: {
        stream_id: string
    }
}

const router = Router();

router.post("/", (req: StreamRequest, res: Response) => {
    const stream = new Stream({title: req.body.title, description: req.body.description, userId: req.body.userId});
    stream.save()
    .then((newStream) => {
        console.log(newStream);
        res.status(200).send();
    })
    .catch((err) => {
        console.log(err);
    });
});

router.get("/", (req: StreamRequest, res: Response) => {
    Stream.find({})
    .then((streams) => {
        res.status(200);
        res.send(streams);
    })
    .catch((err) => {
        console.log(err);
    });
});

router.patch("/:stream_id", (req: StreamRequest, res: Response) => {
    Stream.findByIdAndUpdate(req.params.stream_id, {title: req.body.title, description: req.body.description})
    .then(() => {
        res.status(200).send();
    })
    .catch((err) => {
        console.log(err);
    });
});

router.get("/:stream_id", (req: StreamRequest, res: Response) => {
    Stream.findById(req.params.stream_id)
    .then((stream) => {
        res.status(200);
        res.send(stream);
    })
    .catch((err) => {
        console.log(err);
    });
});

router.delete("/:stream_id", (req: StreamRequest, res: Response) => {
    Stream.findByIdAndDelete(req.params.stream_id)
    .then((stream) => {
        res.status(200);
        res.send(stream);
    })
    .catch((err) => {
        console.log(err);
    });
});


export {router};