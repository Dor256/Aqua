import React from "react";
import { Router, Route, Switch } from "react-router-dom";
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

const App = () => {
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

export default App;