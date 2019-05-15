import React from "react";
import { Link } from "react-router-dom";
import  { connect } from "react-redux";
import GoogleAuth from "./GoogleAuth";
import { State } from "../Types";
import "./Header.scss";

type Props = {
    isSignedIn: boolean
}

const renderCreateLink = (isSignedIn: boolean) => {
    if(isSignedIn) {
        return <Link to="/streams/new" className="item">Create Stream</Link>;
    }
}

const Header = (props: Props) => {
    return (
        <div id="nav" className="ui stackable inverted pointing menu">
            <Link to="/" id="brand" title="Aqua Home" className="item ui medium header">
                <img id="logo" src={`${process.env.PUBLIC_URL}/drop.png`} alt=""/>
                Aqua
            </Link>
            <Link to="/" className="item">Browse</Link>
            {renderCreateLink(props.isSignedIn)}
            <div className="right menu">
                <GoogleAuth/>
            </div>
        </div>
    );
}

const mapStateToProps = (state: State) => {
    return {isSignedIn: state.auth.isSignedIn};
}

export default connect<{}, {}, Props, State>(mapStateToProps)(Header);