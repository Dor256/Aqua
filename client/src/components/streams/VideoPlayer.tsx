import React from "react";
import { connect } from "react-redux";
import flv from "flv.js";
import { getStreamState } from "../../actions";
import { Stream, State } from "../../Types";

type Props =  {
    isStreaming?: boolean,
    stream: Stream,
    isPreview: boolean
}

interface VideoPlayer {
    videoRef: React.RefObject<HTMLVideoElement>,
    player: flv.Player,
    clientSocket: SocketIOClient.Socket
}

class VideoPlayer extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.videoRef = React.createRef();
    }

    componentDidMount() {
        this.buildPlayer();
    }

    componentDidUpdate() {
        this.buildPlayer();
    }

    componentWillUnmount() {
        this.player.destroy();
    }

    buildPlayer() {
        if(!this.player || this.props.stream) {
            const id = this.props.stream._id;
            this.player = flv.createPlayer({
                type: "flv",
                url: `http://localhost:8000/live/${id}.flv`
            });
            if(this.videoRef.current){
                this.player.attachMediaElement(this.videoRef.current);
                this.videoRef.current.addEventListener("stalled", () => console.log("TORLOLOLOLO"));
                this.player.load();
            } 
        }
    }

    renderVideo() {
        if(this.props.isStreaming) {
            if(this.props.isPreview) {
                return <video className="card-image" ref={this.videoRef}></video>
            }
            return <video id="video" ref={this.videoRef} controls/>;
        }
        return (
            <div id="placeholder-container" className="ui container">
                <img id="placeholder-image" src={`${process.env.PUBLIC_URL}/drop.png`}/>
            </div>
        );
    }

    render() {
        return this.renderVideo();
    }

}

const mapStateToProps = (state: State) => {
    return {isStreaming: state.connection.isStreaming};
}

export default connect<{}, {}, Props, State>(mapStateToProps, {getStreamState})(VideoPlayer);