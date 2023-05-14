import React from 'react';
import { FormGroup, InputGroup, Intent } from '@blueprintjs/core';

function NameAndEmailFormFields({ isEditable, values, touched, errors, setFieldValue }) {
    return (
        <>
            <FormGroup
                label="Name"
                labelFor="name-input"
                helperText={touched.name && errors.name}
                intent={touched.name && errors.name ? errors.name : Intent.NONE}
            >
                <InputGroup
                    id="name-input"
                    placeholder="Name"
                    name="name"
                    disabled={!isEditable}
                    value={values.name}
                    onChange={(e) => setFieldValue('name', e.target.value)}
                />
            </FormGroup>
            <FormGroup
                label="Email"
                labelFor="email-input"
                helperText={touched.email && errors.email}
                intent={touched.email && errors.email ? errors.email : Intent.NONE}
            >
                <InputGroup
                    id="email-input"
                    placeholder="Email"
                    name="email"
                    disabled={!isEditable}
                    value={values.email}
                    onChange={(e) => setFieldValue('email', e.target.value)}
                />
            </FormGroup>
        </>
    );
}

export default NameAndEmailFormFields;
