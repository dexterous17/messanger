import React from 'react';
import Passwordreset from '../component/passwordreset';
import ProfileForm from '../component/ProfileForm';


function Setting() {

    return (
        <div className="settings">
            <h1>Settings</h1>
            <div style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'baseline'
            }}>
                <ProfileForm />
                <Passwordreset />
            </div>
        </div>
    );
}

export default Setting;
