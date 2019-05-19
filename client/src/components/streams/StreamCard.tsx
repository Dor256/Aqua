import React from "react";
import { Link } from "react-router-dom";
import flv from "flv.js";
import { Stream } from "../../Types";

type Props = {
    stream: Stream,
    inDashboard: boolean,
}

interface StreamCard {
    videoRef: React.RefObject<HTMLVideoElement>,
    player: flv.Player
}

class StreamCard extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.videoRef = React.createRef();
    }

    componentDidMount() {
        this.buildPlayer();
        
    }

    componentWillUnmount() {
        this.player.destroy();
    }

    buildPlayer() {
        if(!this.player) {
            this.player = flv.createPlayer({
                type: "flv",
                url: `http://localhost:8000/live/${this.props.stream._id}.flv`
            });
            if(this.videoRef.current){
                this.player.attachMediaElement(this.videoRef.current);
                this.player.load();
            } 
        }
    }

    renderAdminButtons = () => {
        if(this.props.inDashboard) {
            return (
                <div className="extra content">
                    <Link to={`/streams/edit/${this.props.stream._id}`} className="ui button yellow">Edit</Link>
                    <Link to={`/streams/delete/${this.props.stream._id}`} className="ui button negative">Delete</Link>
                </div>
            );
        } 
    }

    render() {    
        return (
            <div id={this.props.stream._id} className="eight wide tablet two wide small screen four wide large screen column">
                <div className="ui card">
                    <Link className="image" to={`/streams/${this.props.stream._id}`}>
                        <video className="card-image" ref={this.videoRef}/>
                    </Link>
                    <div className="content">
                        <Link className="header" to={`/streams/${this.props.stream._id}`}>
                            {this.props.stream.title}
                        </Link>
                        <div className="description">
                            {this.props.stream.description}
                        </div>
                    </div>
                    {this.renderAdminButtons()}
                </div>
            </div>
        );
    }
}

export default StreamCard;