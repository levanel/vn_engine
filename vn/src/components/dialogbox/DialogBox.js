import React, { useCallback, useEffect, useState } from 'react';
import '../dialogbox/DialogBox.css'; 
import Message from '../message/Message';

const DialogBox = ({
    messages,
    onDialogEnded,
    screenWidth,
    screenHeight,
    onNextScene
}) => {
    const [currentMessage, setCurrentMessage] = useState(0);
    const [messageEnded, setMessageEnded] = useState(false);
    const [forceShowFullMessage, setForceShowFullMessage] = useState(false);

    const messageBoxHeight = Math.ceil(screenHeight / 3.5);

    const dialogStyle = {
        top: `${Math.ceil(screenHeight - (messageBoxHeight + (messageBoxHeight * 0.1)))}px`,
        minHeight: `${messageBoxHeight}px`,
    };
//how dialog works in game. you press a button and it shows the dialogs 
const handleClick = useCallback(() => {
    if (messageEnded) {
        setMessageEnded(false);
        setForceShowFullMessage(false);
        if (currentMessage < messages.length - 1) {
            setCurrentMessage(currentMessage + 1);
            onNextScene(currentMessage + 1); // ⬅ notify parent to update scene state
        } else {
            setCurrentMessage(0);
            onDialogEnded();
        }
    } else {
        setMessageEnded(true);
        setForceShowFullMessage(true);
    }
}, [currentMessage, messageEnded, messages.length, onDialogEnded, onNextScene]);

    useEffect(() => {
        //you dont have to pick any specific key to enable the handleclick. jus press any of these mentioned buttons
        const handleKeyPressed = (e) => {
            if (['Enter', 'Space', 'KeyF'].includes(e.code)) {
                handleClick();
            }
        };
        window.addEventListener('keydown', handleKeyPressed);

        return () => window.removeEventListener('keydown', handleKeyPressed);
    }, [handleClick]);

    return (
        <div className="dialog-window" style={dialogStyle}>
            <div className="dialog-title">
                {messages[currentMessage].character_name}
            </div>
            <Message
                action={messages[currentMessage].action}
                options={messages[currentMessage].options}
                message={messages[currentMessage].message}
                key={currentMessage}
                forceShowFullMessage={forceShowFullMessage}
                onMessageEnded={() => {
                    setMessageEnded(true);
                }}
            />
            <div
                onClick={handleClick}
                className="dialog-footer"
            >
                {(currentMessage === messages.length - 1 && messageEnded) ? 'Ok' : 'Next'}
            </div>
        </div>
    );
};

export default DialogBox;
 