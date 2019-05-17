import React from "react";
import "./PageNotFound.scss";

const PageNotFound = () => {
    return (
        <div className="ui container">
            <div id="jumbotron" className="ui icon message">
                <img id="the-ring" src={`${process.env.PUBLIC_URL}/One_Ring.svg`}/>
                <div className="content">
                    <h1 id="error-display" className="header">Page Not Found!</h1>
                    <p id="lotr-quote">Not all those who wander are lost.</p>
                </div>
            </div>
        </div>
    ); 
}

export default PageNotFound;