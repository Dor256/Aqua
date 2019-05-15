import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import StreamList from "../components/streams/StreamList";
import { fetchUserStreams } from "../actions";
import { State } from "../Types";

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
    }

    render() {
        return (
            <React.Fragment>
                <h2 id="list-head" className="heading">Dashboard</h2>
               {this.renderList()}
            </React.Fragment>
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