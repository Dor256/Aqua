import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as socket from "socket.io-client";
import { getStreamState } from "../actions";
import StreamCreate from "./streams/StreamCreate";
import StreamEdit from "./streams/StreamEdit";
import StreamShow from "./streams/StreamShow";
import StreamDelete from "./streams/StreamDelete";
import BrowseStreams from "./streams/BrowseStreams";
import Dashboard from "./Dashboard";
import PageNotFound from "./streams/PageNotFound";
import Header from "./Header";
import history from "../history";
import "./App.scss";

type Props = {
    getStreamState: (streamStatus: boolean) => void
}

const initWebSocket = (getStreamState: (streamStatus: boolean) => void) => {
    const clientSocket = socket.connect("http://localhost:7000");
    clientSocket.on("start", () => getStreamState(true));
    clientSocket.on("end", () => getStreamState(false));
}

const App = (props: Props) => {
    initWebSocket(props.getStreamState);
    return (
        <div>
            <Router history={history}>
                <Header/>
                <Switch>
                    <Route path="/" exact component={BrowseStreams}/>
                    <Route path="/dashboard/:user_id" exact component={Dashboard}/>
                    <Route path="/streams/new" exact component={StreamCreate}/>
                    <Route path="/streams/edit/:id" exact component={StreamEdit}/>
                    <Route path="/streams/delete/:id" exact component={StreamDelete}/>
                    <Route path="/streams/:id" exact component={StreamShow}/>
                    <Route component={PageNotFound}/> 
                </Switch>
            </Router>
        </div>
    );
}

export default connect(null, {getStreamState})(App);