import React from "react";
import { connect } from "react-redux";
import flv from "flv.js";
import { fetchStream } from "../../actions";
import { RouteComponentProps, State } from "../../Types";
import "./StreamShow.scss";

type Props = RouteComponentProps;

interface StreamShow {
    videoRef: React.RefObject<HTMLVideoElement>,
    player: flv.Player
}

class StreamShow extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.videoRef = React.createRef();
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.fetchStream(id);
        this.buildPlayer();
    }
    
    componentDidUpdate() {
        this.buildPlayer();
    }

    componentWillUnmount() {
        this.player.destroy();
    }

    renderVideo() {
        return <video id="video" ref={this.videoRef} controls/>;
    }

    buildPlayer() {
        if(!this.player || this.props.stream) {
            const {id} = this.props.match.params;
            this.player = flv.createPlayer({
                type: "flv",
                url: `http://localhost:8000/live/${id}.flv`
            });
            if(this.videoRef.current){
                this.player.attachMediaElement(this.videoRef.current);
                this.player.load();
            } 
        }
    }

    render() {
        if(!this.props.stream) {
            return <div>Loading...</div>;
        }
        return (
            <div className="ui container">
                {this.renderVideo()}
                <h1 id="title" className="heading">{this.props.stream.title}</h1>
                <h5 id="desc" className="heading">{this.props.stream.description}</h5>
            </div>
        );
    }
}

const mapStateToProps = (state: State, ownProps: Props) => {
    return {stream: state.streams[ownProps.match.params.id]};
}

export default connect<{}, {}, Props, State>(mapStateToProps, {fetchStream})(StreamShow);