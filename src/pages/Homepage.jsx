import React, { useState, useEffect } from 'react';
import MessageList from '../component/messagelist';
import RecipientList from '../component/recipientlist';
import MainHeader from '../component/mainheader';
import "../css/homepage.css";
import UserSelect from '../component/UserSelect';
import api from '../api/api'

function HomePage({ socket }) {

    const [recipient, setRecipient] = useState();
    const [recipientlist, setRecipientList] = useState(null);

    useEffect(() => {
        if (!socket.connected) {
            socket.connect();
        }

        socket.on('connect', () => {
            console.log('Connected to server.');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server.');
        });

        socket.on('connect_error', (error) => {
            console.error('Error connecting to server:', error);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('connect_error');
        };
    }, [socket]);


    useEffect(() => {
        api.post('/fetchrecipients', {
            headers: {
                'Authorization': localStorage.getItem('jwtToken')
            }
        }).then((data) => {
            setRecipientList(data.data)
            console.log(data.data)
        }).catch()
    }, [])

    const handleDataChange = (data) => {
        setRecipient(data);
    };

    const sendMessage = (senderid, recipientid, message) => {
        socket.emit('send_message', { senderid, recipientid, message });
    };

    return (
        <div className='homepage'>
            <MainHeader socket={socket} />
            <div className='main'>

                <RecipientList onDataChange={handleDataChange} recipientlist={recipientlist} />

                {recipient ? <MessageList recipient={recipient} sendMessage={sendMessage} socket={socket} /> : <UserSelect />}
            </div>
        </div>
    );
}

const MemoizedHomePage = React.memo(HomePage);

export default MemoizedHomePage;
