import React, { useState } from 'react';
import NameForm from '../component/Nameform';
import RegistrationFormPartTwo from '../component/RegistrationFormPartTwo';
import ProgressTracker from '../component/progresstracker';
import { Card } from '@blueprintjs/core';
import api from '../api/api';

const RegistrationPage = () => {
    const [step, setStep] = useState(1);
    const [formValues, setFormValues] = useState({
        name: '',
        password: '',
        confirmPassword: '',
        email: '',
        avatar: '',
        phoneNumber: '',
        countryCode: ''
    });

    const handleNextStep = (values) => {
        setFormValues({ ...formValues, ...values });
        setStep(step + 1);
    };

    const handlePreviousClick = (values) => {
        console.log(formValues)
        setFormValues({ ...values }); // restore saved form values
        setStep(step - 1);
    };

    const handleRegistrationSubmit = async (updatedValues) => {
        setStep(step + 1);
        console.log(updatedValues); // log the form data on submit
        // submit the form
        console.log(step)

        try {
            const formData = new FormData();
            formData.append('name', updatedValues.name);
            formData.append('password', updatedValues.password);
            formData.append('confirmPassword', updatedValues.confirmPassword);
            formData.append('email', updatedValues.email);
            formData.append('phoneNumber', updatedValues.phoneNumber);
            formData.append('countryCode', updatedValues.countryCode);

            // Check if an avatar image is present
            if (updatedValues.avatar) {
                formData.append('avatar', updatedValues.avatar);
            }
            const response = api.post('/register', { body: formData });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
            // Show error message to the user
        }

    };

    return (
        <div style={{
            height: "inherit",
            width: "inherit",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Card>
                <ProgressTracker step={step} />
                {step === 1 && <NameForm initialValues={formValues} handleSubmit={handleNextStep} />}
                {step === 2 && (
                    <RegistrationFormPartTwo initialValues={formValues} onSubmit={handleRegistrationSubmit} onPrevious={handlePreviousClick} />
                )}
            </Card>
        </div>
    );
};

export default RegistrationPage;
