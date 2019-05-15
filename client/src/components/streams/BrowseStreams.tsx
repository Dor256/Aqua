import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import StreamList from "./StreamList";
import { fetchStreams } from "../../actions";
import { State, Stream } from "../../Types";

type Props = {
    fetchStreams: () => (dispatch: Dispatch) => Promise<void>,
    streams: Stream[]
}

class BrowseStreams extends React.Component<Props> {
    componentDidMount() {
        this.props.fetchStreams();
    }

    render() {
        return (
            <React.Fragment>
                <h2 id="list-head" className="heading">Streams</h2>
                <StreamList inDashboard={false} onSignIn={this.props.fetchStreams}/>
        </React.Fragment>
        );
    }
}

export default connect<{}, {}, Props, State>(null, {fetchStreams})(BrowseStreams);