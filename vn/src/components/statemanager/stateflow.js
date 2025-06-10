import React, { useState, useEffect, useCallback } from 'react';
import Message from '../../components/message/Message';
import {
  getCurrentScene,
  goToNextScene,
  jumpToSceneById,
} from './majorstate';
import {
  shouldShowOptions,
  isWaitingForChoice,
  resolveChoice,
} from './minorstate';
import {
  getCurrentDialog,
  goToNextDialog,
  getDialogIndex,
  getTotalDialogs,
  resetDialog
} from './minorstate2';
import Options from './Options';

function StoryPlayer() {
  const screenHeight = window.innerHeight;

  // Scene State
  const [scene, setScene] = useState(null);
  const [localDialogIndex, setLocalDialogIndex] = useState(getDialogIndex());
  const [messageEnded, setMessageEnded] = useState(false);
  const [forceShowFullMessage, setForceShowFullMessage] = useState(false);

  // Fetch Scene
  const updateScene = () => {
    const current = getCurrentScene();
    setScene(current);
    shouldShowOptions(current);
 
  };

  useEffect(() => {
    updateScene();
  }, []);


  const handleChoice = (nextId) => {
    resolveChoice();
    jumpToSceneById(nextId);
    updateScene();
  };

  // Dialog Handler
  const handleClick = useCallback(() => {
    if (messageEnded) {
      setMessageEnded(false);
      setForceShowFullMessage(false);
      const hasNext = goToNextDialog();

      if (hasNext) {
        const newIndex = getDialogIndex();
        setLocalDialogIndex(newIndex);
      } else {
        resetDialog();
        setLocalDialogIndex(0);
        console.log("Dialog Ended");
      }
    } else {
      setMessageEnded(true);
      setForceShowFullMessage(true);
    }
  }, [messageEnded]);
  const handleNext = () => {
    if (isWaitingForChoice()) return;
    if (goToNextScene()) {
      updateScene();
    } else {
      alert('End of story!');
    }
  };
const stateMachine = useCallback(() => {
  if (forceShowFullMessage) {
    handleNext();
    handleClick();
  } else {
    setForceShowFullMessage(true);
    setMessageEnded(true);
  }
  console.log(forceShowFullMessage)
}, [forceShowFullMessage, handleClick, handleNext]);
  // Keyboard Shortcuts for Scene Progression
  // Keyboard Shortcuts for Dialog Click
  useEffect(() => {
    const handleKeyPressed = (e) => {
      if (['Enter', 'Space', 'KeyF'].includes(e.code)) {
        stateMachine();
      }
    };
    window.addEventListener('keydown', handleKeyPressed);
    return () => window.removeEventListener('keydown', handleKeyPressed);
  }, [stateMachine]);

  const currentMessageData = getCurrentDialog();
  const messageBoxHeight = Math.ceil(screenHeight / 3.5);
  const dialogStyle = {
    position: 'absolute',
    top: `${Math.ceil(screenHeight - (messageBoxHeight + (messageBoxHeight * 0.1)))}px`,
    minHeight: `${messageBoxHeight}px`,
    left: '10%',
    right: '10%',
    background: 'rgba(0,0,0,0.6)',
    padding: '1rem',
    borderRadius: '10px',
    color: 'white',
  };

  if (!scene) return <div>Loading...</div>;

  return (
    <div
      className="scene"
      style={{
        backgroundImage: `url(${scene.backgroundSrc})`,
        backgroundSize: 'cover',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Characters */}
      {scene.character_1_emotionSrc && (
        <img
          src={scene.character_1_emotionSrc}
          alt="Char 1"
          style={{
            position: 'absolute',
            bottom: 100,
            left: '10%',
            height: '80%',
          }}
        />
      )}
      {scene.character_2_emotionSrc && (
        <img
          src={scene.character_2_emotionSrc}
          alt="Char 2"
          style={{
            position: 'absolute',
            bottom: 100,
            right: '10%',
            height: '80%',
          }}
        />
      )}

      {/* Options */}
      {scene.options && scene.options.length > 0 && (
        <Options option={scene.options} onOptionSelected={handleChoice} />
      )}

      {/* Dialog */}
      {currentMessageData && (
        <div className="dialog-window" style={dialogStyle}>
          <div className="dialog-title">
            {currentMessageData.character_name}
          </div>
          <Message
            action={currentMessageData.action}
            options={currentMessageData.options}
            message={currentMessageData.message}
            key={localDialogIndex}
            onMessageEnded={() =>{ 
              setMessageEnded(true)
              setForceShowFullMessage(true)
            }}
            forceShowFullMessage={forceShowFullMessage}
          />
          <div onClick={handleClick} className="dialog-footer">
            {(localDialogIndex === getTotalDialogs() - 1 && messageEnded) ? 'Ok' : 'Next'}
          </div>
        </div>
      )}
    </div>
  );
}

export default StoryPlayer;
