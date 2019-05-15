import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Stream, State } from "../../Types";
import "./StreamList.scss";

type Props = {
    streams?: Stream[],
    inDashboard: boolean,
    isSignedIn?: boolean,
    onSignIn: () => void
}

class StreamList extends React.Component<Props> {
    componentDidMount() {
        if(this.props.isSignedIn) {
            this.props.onSignIn();
        }
    }

    renderAdminButtons(stream: Stream) {
        if(this.props.inDashboard) {
            return (
                <div className="extra content">
                    <Link to={`/streams/edit/${stream._id}`} className="ui button yellow">Edit</Link>
                    <Link to={`/streams/delete/${stream._id}`} className="ui button negative">Delete</Link>
                </div>
            );
        } 
    }

    renderList() {
        if(this.props.streams) {
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
        return null;
    }

    render() {
        return (
            <div>
                <div className="ui four column grid">
                    {this.renderList()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: State) => {
    return {
        streams: Object.values(state.streams),
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect<{}, {}, Props, State>(mapStateToProps)(StreamList);