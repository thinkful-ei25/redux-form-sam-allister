import React from 'react';
import { reduxForm, Field } from 'redux-form';
import Input from './input';
import {required, notEmpty, exactLength, onlyNumbers } from '../validators';

const URL = 'https://us-central1-delivery-form-api.cloudfunctions.net/api/report';

class ComplaintForm extends React.Component {

    onSubmit(values){
        console.log(values);
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(values=> 
                this.onSubmit(values))}>
                <Field
                    component={Input}
                    element="input"
                    type="text"
                    name="tracking-number"
                    id="tracking-number"
                    label="Tracking Number"
                    validate={[required, notEmpty, onlyNumbers, exactLength]}
                >
                </Field>
                <Field
                    component={Input}
                    element="select"
                    name="issue"
                    id="issue"
                    label="What is your issue?"
                    validate={[required]}
                >
                    <option></option>
                    <option value="not-delivered">My delivery hasn't arrived</option>
                    <option value="wrong-item">The wrong item was delivered</option>
                    <option value="missing-part">Part of my order was missing</option>
                    <option value="damaged">Some of my order arrived damaged</option>
                    <option value="other">Other (Give details below)</option>
                </Field>
                <Field
                    component={Input}
                    element="textarea"
                    name="other-details"
                    id="other-details"
                    label="Give more details (optional)"
                >
                </Field>
                <button 
                    type="submit"
                    disabled={
                        this.props.pristine ||
                        this.props.submitting
                    }>
                    Submit
                </button>
            </form>
        )
    }

}

export default reduxForm({
    form : 'complaint'
})(ComplaintForm);