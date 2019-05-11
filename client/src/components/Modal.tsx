import React, { MouseEvent } from "react";
import ReactDOM from "react-dom";
import "./Modal.scss";

type Props = {
    title: string,
    content: string,
    actions: JSX.Element,
    onDismiss: () => void
}

const handlePropagation = (event: MouseEvent<HTMLDivElement, Event>) => {
    event.stopPropagation();
}

const Modal = (props: Props) => {
    return ReactDOM.createPortal(
        <div className="ui dimmer modals visible active" onClick={props.onDismiss}>
            <div id="message-box" className="ui standard modal visible active" onClick={handlePropagation}>
                <div className="header">{props.title}</div>
                <div className="content">{props.content}</div>
                <div className="actions">{props.actions}</div>
            </div>
        </div>,
        document.querySelector("#modal")!
    );
}

export default Modal;