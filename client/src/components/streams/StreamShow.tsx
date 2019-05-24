import React from "react";
import { connect } from "react-redux";
import VideoPlayer from "./VideoPlayer";
import { fetchStream } from "../../actions";
import { RouteComponentProps, State } from "../../Types";
import "./StreamShow.scss";


class StreamShow extends React.Component<RouteComponentProps> {
    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.fetchStream(id);
    }

    render() {
        if(!this.props.stream) {
            return <div>Loading...</div>;
        }
        return (
            <div className="ui container">
                <VideoPlayer stream={this.props.stream} isPreview={false}/>
                <h1 id="title" className="heading">{this.props.stream.title}</h1>
                <h5 id="desc" className="heading">{this.props.stream.description}</h5>
            </div>
        );
    }
}

const mapStateToProps = (state: State, ownProps: RouteComponentProps) => {
    return {stream: state.streams[ownProps.match.params.id]};
}

export default connect<{}, {}, RouteComponentProps, State>(mapStateToProps, {fetchStream})(StreamShow);