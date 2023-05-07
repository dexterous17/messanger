import React from 'react';
import Passwordreset from '../component/passwordreset';
import ProfileComponent from '../component/profilecomponent';

function Setting() {


    return (
        <div className="settings">
            <h1>Settings</h1>
            <ProfileComponent />
            <Passwordreset />
        </div>
    );
}

export default Setting;
