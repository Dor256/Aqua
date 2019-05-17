import React from "react";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";
import { RouteComponentProps, State } from "../../Types";

type Props = RouteComponentProps

class StreamShow extends React.Component<Props> {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    render() {
        if(!this.props.stream) {
            return <div>Loading...</div>;
        }
        return (
            <div>
                <h1 className="heading">{this.props.stream.title}</h1>
                <h5 className="heading">{this.props.stream.description}</h5>
            </div>
        );
    }
}

const mapStateToProps = (state: State, ownProps: Props) => {
    return {stream: state.streams[ownProps.match.params.id]};
}

export default connect<{}, {}, Props, State>(mapStateToProps, {fetchStream})(StreamShow);