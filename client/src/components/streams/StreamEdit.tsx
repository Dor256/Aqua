import React from "react";
import { connect } from "react-redux";
import StreamForm from "./StreamForm";
import { fetchStream, editStream } from "../../actions";
import { State, Stream, FormValues, RouteComponentProps } from "../../Types";
import "./StreamForm.scss";

type Props = RouteComponentProps & {
    editStream: (id: string, formValues: FormValues) => Promise<void>,
}

class StreamEdit extends React.Component<Props> {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = (formValues: FormValues) => {
        this.props.editStream(this.props.stream._id, formValues);
    }

    render() {
        if(!this.props.stream) {
            return <div>Loading...</div>;
        }
        return (
            <div className="ui container">
                <h2 className="heading">Edit a Stream</h2>
                <StreamForm 
                    onSubmit={this.onSubmit} 
                    initialValues={{title: this.props.stream.title, description: this.props.stream.description}}
                />
            </div>
            );
    }  
}

const mapStateToProps = (state: State, ownProps: Props) => {
    return {stream: state.streams[ownProps.match.params.id]};
}

export default connect<{}, {}, Props, State>(mapStateToProps, {fetchStream, editStream})(StreamEdit);