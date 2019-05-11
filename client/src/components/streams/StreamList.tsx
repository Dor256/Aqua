import React from "react";
import {connect} from "react-redux";
import { fetchStreams } from "../../actions";
import { Dispatch } from "redux";
import { Stream, AuthState } from "../../Types";
import { Link } from "react-router-dom";
import  "./StreamList.scss";

type State = {
    streams: Stream[],
    auth: AuthState
}

type Props = State & {
    fetchStreams: () => (dispatch: Dispatch) => Promise<void>,
    currentUserId: string,
    isSignedIn: boolean
}

class StreamList extends React.Component<Props> {
    componentDidMount() {
        this.props.fetchStreams();
    }

    renderAdminButtons(stream: Stream) {
        if(stream.userId === this.props.currentUserId) {
            return (
                <div className="right floated content">
                    <Link to={`/streams/edit/${stream._id}`} className="ui button yellow">Edit</Link>
                    <Link to={`/streams/delete/${stream._id}`} className="ui button negative">Delete</Link>
                </div>
            );
        } 
    }

    renderList() {
        return this.props.streams.map((stream) => {
            return (
                <div id={stream._id} className="item" key={stream._id}>
                    {this.renderAdminButtons(stream)}
                    <i className="large middle aligned icon camera"/>
                    <div className="content">
                        <Link className="header" to={`/streams/${stream._id}`}>{stream.title}</Link>
                        <div className="description">
                            {stream.description}
                        </div>
                    </div>
                </div>
            );
        });
    }

    renderCreateButton() {
        if(this.props.isSignedIn) {
            return (
                <div>
                    <Link to="/streams/new" id="create-stream" className="ui button green">Create Stream</Link>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <h2 className="heading">Streams</h2>
                <div className="ui celled list">
                    {this.renderList()}
                </div>
                {this.renderCreateButton()}
            </div>
        );
    }
}

const mapStateToProps = (state: State) => {
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect<{}, {}, {}, State>(mapStateToProps, {fetchStreams})(StreamList);