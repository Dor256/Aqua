import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signIn, signOut } from "../actions";
import { NON_MOBILE } from "../Constants";
import { State } from "../Types";
import "./CollapsedMenu.scss";

type Props = {
    userId?: string,
    isSignedIn?: boolean,
    signIn?: () => void,
    signOut?: () => void
}

window.onresize = () => {
    const collapsedMenu = document.querySelector("#collapsed")!;
    window.innerWidth > NON_MOBILE ? collapsedMenu.classList.add("collapse") : null;
}

const renderAuthButton = (props: Props) => {
    if(props.isSignedIn && props.userId) {
        return (
            <React.Fragment>
                <Link to={`/dashboard/${props.userId}`} className="item">Dashboard</Link>
                <Link to="/" onClick={props.signOut} className="item">Sign Out</Link>
            </React.Fragment>
        );
    }
    return <Link to="/" onClick={props.signIn} className="item">Sign In</Link>;
}

const CollapsedMenu = (props: Props) => {
    return (
        <div id="collapsed" className="container ui collapse">
            <div id="menu" className="ui vertical menu head">
                <Link to="/" className="item">Browse</Link>
                {renderAuthButton(props)}
            </div>
        </div>
    );
}

const mapStateToProps = (state: State) => {
    return {userId: state.auth.userId, isSignedIn: state.auth.isSignedIn};
}

export default connect<{}, {}, Props, State>(mapStateToProps, {signIn, signOut})(CollapsedMenu);