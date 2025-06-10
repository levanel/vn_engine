// minorstate.js
import script from '../../tempfol/preview.json'; // Assuming this JSON holds your entire dialog script

let currentDialogIndex = 0; // This will hold the current index for the entire dialog sequence

export function getCurrentDialog() {
    const message = script[currentDialogIndex];
    if (!message) {
        // Handle cases where the index is out of bounds (e.g., dialog ended)
        return null;
    }
    return message; // Return the actual message object
}

export function goToNextDialog() {
    if (currentDialogIndex < script.length - 1) {
        currentDialogIndex++;
        return true; // Indicates successfully moved to the next dialog
    }
    // No more dialogs, optionally reset or signal end
    // For now, it returns false indicating no more dialogs
    return false; // Indicates no more dialogs to go to
}

// Optional: Add a way to reset the dialog if you want to replay it
export function resetDialog() {
    currentDialogIndex = 0;
}

// Optional: Get the total number of messages
export function getTotalDialogs() {
    return script.length;
}

// Optional: Get the current index
export function getDialogIndex() {
    return currentDialogIndex;
}

// Optional: Set a specific dialog index (useful for loading/saving game state)
export function setDialogIndex(index) {
    if (index >= 0 && index < script.length) {
        currentDialogIndex = index;
        return true;
    }
    return false; // Invalid index
}