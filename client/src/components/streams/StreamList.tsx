import React from "react";
import {connect} from "react-redux";
import { fetchStreams } from "../../actions";
import { Dispatch } from "redux";
import history from "../../history";
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
                <div className="extra content">
                    <Link to={`/streams/edit/${stream._id}`} className="ui button yellow">Edit</Link>
                    <Link to={`/streams/delete/${stream._id}`} className="ui button negative">Delete</Link>
                </div>
            );
        } 
    }

    renderList() {
        return this.props.streams.map((stream) => {
            return (
                <div id={stream._id} className="column" key={stream._id}>
                    <div className="ui card">
                        <div className="image">
                            <Link to={`/streams/${stream._id}`}>
                                <img className="card-image" src={`${process.env.PUBLIC_URL}/drop.png`}/>
                            </Link>
                        </div>
                        <div className="content">
                            <Link className="header" to={`/streams/${stream._id}`}>{stream.title}</Link>
                            <div className="description">
                                {stream.description}
                            </div>
                        </div>
                        {this.renderAdminButtons(stream)}
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
                <div className="ui four column grid">
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