import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button } from '@blueprintjs/core';
import '../css/RegistrationFormPartTwo.css'; // Import the CSS file
import AvatarUpload from './AvatarUpload';
import PhoneNumberInput from './PhoneNumberInput';
import { countries } from '../helperfunction/countries';

const RegistrationFormPartTwo = ({ initialValues, onSubmit, onPrevious }) => {
    const validationSchema = Yup.object({
        phoneNumber: Yup.string().required('Phone number is required'),
        countryCode: Yup.string().required('Country code is required'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        // Get the avatar image from formik values
        const avatar = values.avatar;

        // Get the phone number from formik values
        const phoneNumber = values.phoneNumber;

        // Get the country code from formik values
        const countryCode = values.countryCode;

        // Add the avatar, phone number, and country code to the values object
        const updatedValues = {
            ...values,
            avatar,
            phoneNumber,
            countryCode,
        };

        // Pass the updated values object to the onSubmit function
        await onSubmit(updatedValues);

        setSubmitting(false);
    };

    const handlePrevious = (values) => {
        console.log('Previous values:', values);
        onPrevious(values);
    };

    return (
        <div>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                {({ isSubmitting, setFieldValue, values, errors }) => (
                    <Form className='form-container'>
                        <AvatarUpload label="Avatar" name="avatar" sizeLimit={2000000} />
                        <PhoneNumberInput
                            countries={countries}
                            setFieldValue={setFieldValue}
                            values={values}
                            errors={errors}
                            isEditable={true}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button type="button" onClick={() => handlePrevious(values)}>
                                Previous
                            </Button>
                            <Button type="submit" intent="primary" disabled={isSubmitting}>
                                Submit
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default RegistrationFormPartTwo;