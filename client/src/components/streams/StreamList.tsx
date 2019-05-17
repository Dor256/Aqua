import React from "react";
import { connect } from "react-redux";
import StreamCard from "./StreamCard";
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

    renderList() {
        if(this.props.streams) {
            return this.props.streams.map((stream) => {
                return <StreamCard key={stream._id} stream={stream} inDashboard={this.props.inDashboard}/>
            });
        }
    }

    render() {
        return (
            <div className="ui stackable container sixteen column grid">
                {this.renderList()}
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