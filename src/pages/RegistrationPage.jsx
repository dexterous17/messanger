import React, { useState } from 'react';
import NameForm from '../component/Nameform';
import RegistrationFormPartTwo from '../component/RegistrationFormPartTwo';
import ProgressTracker from '../component/progresstracker';

const RegistrationPage = () => {
    const [step, setStep] = useState(1);
    const [formValues, setFormValues] = useState({
        name: '',
        password: '',
        confirmPassword: '',
        email: '',
        avatar: '',
        phoneNumber: '',
        countryCode:''
    });

    const handleNextStep = (values) => {
        setFormValues({ ...formValues, ...values });
        setStep(step + 1);
    };

    const handlePreviousClick = () => {
        setStep(step - 1);
    };

    const handleRegistrationSubmit = (updatedValues) => {
        setStep(step + 1);
        console.log(updatedValues); // log the form data on submit
        // submit the form
        console.log(step)
    };

    return (
        <div>
            <ProgressTracker step={step} />
            {step === 1 && <NameForm initialValues={formValues} handleSubmit={handleNextStep} />}
            {step === 2 && (
                <RegistrationFormPartTwo initialValues={formValues} onSubmit={handleRegistrationSubmit} onPrevious={handlePreviousClick} />
            )}
        </div>
    );
};

export default RegistrationPage;
