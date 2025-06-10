// src/components/statemanager/minorstate.js

let waitingForChoice = false;

export const shouldShowOptions = (scene) => {
  waitingForChoice = scene?.options && scene.options.length > 0;
  return waitingForChoice;
};

export const isWaitingForChoice = () => waitingForChoice;

export const resolveChoice = () => {
  waitingForChoice = false;
};
