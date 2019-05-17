import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {createStream } from "../../actions";
import StreamForm from "./StreamForm";
import { FormValues } from "../../Types";
import "./StreamForm.scss";

interface Props {
    createStream: (formValues: FormValues) => (dispatch: Dispatch) => Promise<void>,
}

class StreamCreate extends React.Component<Props> {
    onSubmit = (formValues: FormValues) => {
        this.props.createStream(formValues);
    }  

    render() {
        return (
            <div className="ui container">
                <h2 className="heading">Create a Stream</h2>
                <StreamForm onSubmit={this.onSubmit}/>
            </div>
        );
    }
}

export default connect<{}>(null, {createStream})(StreamCreate);