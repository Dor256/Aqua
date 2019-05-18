import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";
import CollapsedMenu from "./CollapsedMenu";
import "./Header.scss";


const toggleCollapsedMenu = () => {
    const collapsedMenu = document.querySelector("#collapsed")!;
    collapsedMenu.classList.toggle("collapse");
}

const Header = () => {
    return (
        <React.Fragment>
            <div id="nav" className="ui inverted menu">
                <Link to="/" id="brand" title="Aqua Home" className="item ui medium header">
                    <img id="logo" src={`${process.env.PUBLIC_URL}/drop.png`} alt=""/>
                    Aqua
                </Link>
                <Link to="/" className="item">Browse</Link>
                <div className="right menu">
                    <GoogleAuth/>
                    <span id="hamburger" className="item"><i onClick={toggleCollapsedMenu} className="ui icon bars"/></span>
                </div>
            </div>
            <CollapsedMenu/>
        </React.Fragment>
    );
}

export default Header;