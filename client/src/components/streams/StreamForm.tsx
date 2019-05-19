import React from "react";
import { Field, reduxForm, InjectedFormProps, WrappedFieldProps, WrappedFieldMetaProps } from "redux-form";
import { FormValues } from "../../Types";
import "./StreamForm.scss"

interface FormProps extends WrappedFieldProps {
    label: string
}

interface BaseProps {
    onSubmit: (formValues: FormValues) => void
}


type Props = InjectedFormProps<{}, BaseProps> & BaseProps;

class StreamForm extends React.Component<Props> {
    renderError = ({error, touched}: WrappedFieldMetaProps) => {
        if(touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    renderInput = ({input, label, meta}: FormProps) => {
        const maybeErrorClass = meta.error && meta.touched ? "error" : "";
        return (
            <div className={`field ${maybeErrorClass}`}>
                <label>{label}</label>
                <input {...input}/>
                {this.renderError(meta)}
            </div>
        );
    }

    renderTextArea = ({input, label, meta}: FormProps) => {
        const maybeErrorClass = meta.error && meta.touched ? "error" : "";
        return (
            <div className={`field ${maybeErrorClass}`}>
                <label>{label}</label>
                <textarea id="desc-text" form="create" {...input}/>
                {this.renderError(meta)}
            </div>
        );
    }

    onSubmit = (formValues: FormValues) => {
        this.props.onSubmit(formValues);
    }  

    render() {
        return (
            <form id="form" className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)} autoComplete="off">
                <Field name="title" component={this.renderInput} label="Enter Title"/>
                <Field name="description" component={this.renderTextArea} label="Enter Description"/>
                <button id="submit-form" className="ui button green">Submit</button>
            </form>
        );
    }
}

const validate = (formValues: FormValues) => {
    let errors = {};
    if(!formValues.title) {
        errors = {...errors, title: "You must enter a title"};
    }
    if(!formValues.description) {
        errors = {...errors, description: "You must enter a description"};
    }
    return errors
}

export default reduxForm<{}, BaseProps>({form: "streamForm", validate: validate})(StreamForm);
