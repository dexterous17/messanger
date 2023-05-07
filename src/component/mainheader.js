import React, { useState } from 'react';
import {
    PopoverInteractionKind,
    Position,
    Menu,
    MenuDivider,
    Icon,
} from '@blueprintjs/core';
import SearchBar from './SearchBar';
import '../css/mainheader.css';
import { MenuItem2, Popover2 } from '@blueprintjs/popover2';
import removeJwtToken from '../helperfunction/jwtfunctions';
import { useNavigate } from 'react-router-dom';

function MainHeader({ socket }) {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const navigate = useNavigate();

    const handleSettingsClick = () => {
        setIsPopoverOpen(!isPopoverOpen);
    };

    const handleSettingsClose = () => {
        setIsPopoverOpen(false);
    };

    const handleLogoutClick = () => {
        socket.disconnect();
        removeJwtToken()
        navigate('/login');
        setIsPopoverOpen(false);
    };

    const handleSetting = () => {
        navigate('/setting')
    }

    return (
        <div className="main-header" style={{display:'flex',justifyContent: 'space-between',alignitems: 'center'}}>
            <div className="main-header-logo">
                <Icon icon="chat" size={25} />
            </div>
            <div className="main-header-search">
                <SearchBar />
            </div>
            <div className="main-header-settings">
                <Popover2
                    isOpen={isPopoverOpen}
                    interactionKind={PopoverInteractionKind.CLICK}
                    position={Position.BOTTOM_RIGHT}
                    onClose={handleSettingsClose}
                    content={
                        <Menu>
                            <MenuItem2 icon="person" text="Profile"
                                onClick={handleSetting}
                            />
                            <MenuDivider />
                            <MenuItem2
                                icon="log-out"
                                text="Logout"
                                onClick={handleLogoutClick}
                            />
                        </Menu>
                    }
                >
                    <Icon icon="menu" onClick={handleSettingsClick} />
                </Popover2>
            </div>
        </div>
    );
}

export default MainHeader;
