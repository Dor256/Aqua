import React from "react";
import "./UserImage.scss";

type Props = {
    url: string
}


const UserImage = (props: Props) => {
    return (
        <span id="user-image" style={{backgroundImage: `url(${props.url})`}}></span>
    );
} 

export default UserImage;