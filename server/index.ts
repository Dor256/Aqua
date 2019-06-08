import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import streamRouter from "./routes/streams";
import dashboardRouter from "./routes/dashboard";

const url = "mongodb://localhost/aqua";
mongoose.connect(url, {useNewUrlParser: true}).catch(() => console.log("Error connecting to database!"));
mongoose.set("useFindAndModify", false);

const app = express();

const allowCrossDomain = (req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use("/streams", streamRouter);
app.use("/dashboard", dashboardRouter);

app.listen(5000, () => {
    console.log("Server up!");
});