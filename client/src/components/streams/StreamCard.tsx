import React from "react";
import { Link } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
import { Stream } from "../../Types";

type Props = {
    stream: Stream,
    inDashboard: boolean,
}

class StreamCard extends React.Component<Props> {
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
                       <VideoPlayer stream={this.props.stream} isPreview={true}/>
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