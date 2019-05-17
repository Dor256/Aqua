import React from "react";
import { Link } from "react-router-dom";
import "./AccountSidebar.scss";

const renderAccountInfo = () => {
    const apiObject = window.gapi.auth2;
    if(apiObject) {
        return (
            <div className="item">
                <img id="account-image" src={apiObject.getAuthInstance().currentUser.get().getBasicProfile().getImageUrl()}/>
                <h2 className="header">{apiObject.getAuthInstance().currentUser.get().getBasicProfile().getName()}</h2>
            </div>
        );
    }
}

const AccountSidebar = () => {
    return (
        <div className="ui large vertical menu">
            {renderAccountInfo()}
            <div className="item">
                <div className="ui icon input">
                    <input type="text" placeholder="Search stream..."/>
                    <i className="search icon"></i>
                </div>
            </div>
            <Link to="/streams/new" className="item">
                Create Stream
            </Link>
        </div>
    );
}

export default AccountSidebar;