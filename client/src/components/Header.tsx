import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";
import "./Header.scss";

const Header = () => {
    return (
        <div id="nav" className="ui stackable inverted pointing menu">
            <Link to="/" id="brand" title="Aqua Home" className="item ui medium header">
                <img id="logo" src={`${process.env.PUBLIC_URL}/drop.png`} alt=""/>
                Aqua
            </Link>
            <Link to="/streams" className="item">Browse</Link>
            <div className="right menu">
                <GoogleAuth/>
            </div>
        </div>
    );
}

export default Header;