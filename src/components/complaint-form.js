import React from 'react';
import { reduxForm, Field } from 'redux-form';
const URL = 'https://us-central1-delivery-form-api.cloudfunctions.net/api/report';
import Input from './input';
import { } from '../validators';

export class ComplaintForm extends React.Component {

    render() {
        return (
            <form>
                <Field
                    component={Input}
                    element="input"
                    type="text"
                    name="tracking-number"
                    id="tracking-number"
                    label="Tracking Number"
                    validate={}
                >
                </Field>
                <Field
                    component={Input}
                    element="select"
                    name="issue"
                    id="issue"
                    label="What is your issue?"
                    validate={}
                >
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
                <button type="submit">Submit</button>
            </form>
        )
    }

}

export default reduxForm({
    form : 'complaint'
})(ComplaintForm)