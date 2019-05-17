import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import StreamList from "../components/streams/StreamList";
import AccountSidebar from "./AccountSidebar";
import { fetchUserStreams } from "../actions";
import { State } from "../Types";
import "./Dashboard.scss";

type Props = {
    fetchUserStreams?: (userId: string) => (dispatch: Dispatch) => Promise<void>,
    userId?: string,
    isSignedIn?: boolean,
}

class Dashboard extends React.Component<Props> {
    onSignIn = () => {
        if(this.props.fetchUserStreams && this.props.userId) {
            this.props.fetchUserStreams(this.props.userId);
        }
    }

    renderList() {
        if(this.props.isSignedIn) {
            return <StreamList inDashboard={true} onSignIn={this.onSignIn}/>
        }
        return <div id="loader" className="ui active massive centered inline loader"></div>
    }

    render() {
        return (
            <div className="ui stackable two column grid">
                <h2 id="list-head" className="heading">Dashboard</h2>
                <div className="row">
                    <div id="sidebar" className="computer only three wide column">
                        <AccountSidebar/>
                    </div>
                    <div className="thirteen wide computer twelve wide large screen column">
                        {this.renderList()}
                    </div>
                </div>
            </div>
        );
    } 
}

const mapStateToProps = (state: State) => {
    return {
        userId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect<{}, {}, Props, State>(mapStateToProps, {fetchUserStreams})(Dashboard);