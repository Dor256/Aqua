import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import {router as streamRouter} from "./routes/streams";

const url = "mongodb://localhost/aqua";
mongoose.connect(url, {useNewUrlParser: true}).catch(() => console.log("Error connecting to database!"));
mongoose.set("useFindAndModify", false);

const app = express();

const allowCrossDomain = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use("/streams", streamRouter);

app.listen(5000, () => {
    console.log("Server up!");
});