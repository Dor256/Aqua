import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";
import UserImage from "./UserImage";
import { API } from "../Types";
import { apiKey } from "../apis/apiKey";

interface GoogleAuth {
    auth: {
        isSignedIn: {
            get: () => boolean,
            listen: (callback: (isSignedIn: boolean) => void) => void
        },
        signIn: () => void,
        signOut: () => void,
        currentUser: {
            get:() => {
                getBasicProfile: () => {
                    getName: () => string,
                    getImageUrl: () => string
                },
                getId: () => string
            }
        }
    }
}

type Props = {
    signIn: (id: string) => void,
    signOut: () => void,
    isSignedIn: boolean | null
}

declare global {
    interface Window {
        gapi: API
    }
}

class GoogleAuth extends React.Component<Props> {
    componentDidMount() {
        window.gapi.load("client:auth2", () => {
            window.gapi.client.init({
                clientId: apiKey,
                scope: "email"
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange)
            });
        });
    }

    onAuthChange = (isSignedIn: boolean) => {
        isSignedIn ? this.props.signIn(this.auth.currentUser.get().getId()) : this.props.signOut();
    }

    onSignInClick = () => {
        this.auth.signIn();
    } 

    onSignOutClick = () => {
        this.auth.signOut();
    }

    getUserName = (): string => {
        return this.auth.currentUser.get().getBasicProfile().getName();
    }

    getUserImage = (): string => {
        return this.auth.currentUser.get().getBasicProfile().getImageUrl();
    }
 
    renderAuthButton = () => {
        if(this.props.isSignedIn) {
            return (
                <React.Fragment>
                    <Link to="/" className="item" onClick={this.onSignOutClick}>
                        Sign Out
                    </Link>
                    <div className="item"><UserImage url={this.getUserImage()}/> {this.getUserName()}</div>
                </React.Fragment>
            );
        }
        return (
            <Link to="/" className="item" onClick={this.onSignInClick}>
                <i className="user circle icon"></i> Sign In
            </Link>
        );
    }

    render() {
        return this.renderAuthButton();
    }
}

const mapStateToProps = (state: {auth: {isSignedIn: boolean}}) => {
    return {isSignedIn: state.auth.isSignedIn};
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);