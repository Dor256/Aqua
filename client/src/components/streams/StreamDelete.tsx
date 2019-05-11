import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Link } from "react-router-dom";
import { fetchStream, deleteStream } from "../../actions";
import history from "../../history";
import Modal from "../Modal";
import { RouteComponentProps, State} from "../../Types";
import "./StreamDelete.scss";

type Props = RouteComponentProps & {
    deleteStream: (id: string) => (dispatch: Dispatch) => Promise<void>
}

class StreamDelete extends React.Component<Props> {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    handleDeleteClick = () => {
        this.props.deleteStream(this.props.match.params.id);
    }

    renderContent() {
        if(!this.props.stream) {
            return "Are you sure you want to delete this Stream?";
        }
        return `Are you sure you want to delete '${this.props.stream.title}\'?`;
    }

    renderActions() {
        return (
            <React.Fragment>
                <div onClick={this.handleDeleteClick} className="ui animated vertical button negative">
                    <div className="visible content">Delete</div>
                    <div className="hidden content">
                        <img id="gauntlet" src={`${process.env.PUBLIC_URL}/infinity_gauntlet.png`}/>
                    </div>
                </div>
                <Link to="/" className="ui button">Cancel</Link>
            </React.Fragment>
        );
    }

    dismissAndRedirect() {
        history.push("/");
    }

    render() {
        return (
            <Modal 
                title="Delete Stream" 
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={this.dismissAndRedirect}
            />
        );
    }
}

const mapStateToProps = (state: State, ownProps: Props) => {
    return {stream: state.streams[ownProps.match.params.id]};
}

export default connect<{}, {}, Props, State>(mapStateToProps, {fetchStream, deleteStream})(StreamDelete);