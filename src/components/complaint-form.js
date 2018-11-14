import React from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import Input from './input';
import {required, notEmpty, exactLength, onlyNumbers } from '../validators';

const URL = 'https://us-central1-delivery-form-api.cloudfunctions.net/api/report';

class ComplaintForm extends React.Component {

    onSubmit(values){
        console.log(JSON.stringify(values));
        return fetch(URL, {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            
            if (!res.ok) {
                if (
                    res.headers.has('content-type') &&
                    res.headers
                        .get('content-type')
                        .startsWith('application/json')
                ) {
                    // It's a nice JSON error returned by us, so decode it
                    return res.json().then(err => Promise.reject(err));
                }
                // It's a less informative error returned by express
                return Promise.reject({
                    code: res.status,
                    message: res.statusText
                });
            }
            return;
        })
        .then(() => console.log('Submitted with values', values))
        .catch(err => {
            const {reason, message, location} = err;
            if (reason === 'ValidationError') {
                // Convert ValidationErrors into SubmissionErrors for Redux Form
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                );
            }
            return Promise.reject(
                new SubmissionError({
                    _error: message
                })
            );
        });

    }

    render() {

        let successMessage;
        if (this.props.submitSucceeded) {
            successMessage = (
                <div className="message message-success">
                    Complaint submitted successfully
                </div>
            );
        }
    
        let errorMessage;
        if (this.props.error) {
            errorMessage = (
                <div className="message message-error">{this.props.error}</div>
            );
        }
    


        return (
            <form onSubmit={this.props.handleSubmit(values=> 
                this.onSubmit(values)
            )}>
            {successMessage}
            {errorMessage}
                <Field
                    component={Input}
                    element="input"
                    type="text"
                    name="trackingNumber"
                    id="trackingNumber"
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