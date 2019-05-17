import React from "react";
import { Link } from "react-router-dom";
import { Stream } from "../../Types";

type Props = {
    stream: Stream,
    inDashboard: boolean
}

const renderAdminButtons = (props: Props) => {
    if(props.inDashboard) {
        return (
            <div className="extra content">
                <Link to={`/streams/edit/${props.stream._id}`} className="ui button yellow">Edit</Link>
                <Link to={`/streams/delete/${props.stream._id}`} className="ui button negative">Delete</Link>
            </div>
        );
    } 
}

const StreamCard = (props: Props) => {
    return (
        <div id={props.stream._id} className="eight wide tablet two wide small screen four wide large screen column">
            <div className="ui card">
                <Link className="image" to={`/streams/${props.stream._id}`}>
                    <img className="card-image" src={`${process.env.PUBLIC_URL}/drop.png`}/>
                </Link>
                <div className="content">
                    <Link className="header" to={`/streams/${props.stream._id}`}>
                        {props.stream.title}
                    </Link>
                    <div className="description">
                        {props.stream.description}
                    </div>
                </div>
                {renderAdminButtons(props)}
            </div>
        </div>
    );
}

export default StreamCard;