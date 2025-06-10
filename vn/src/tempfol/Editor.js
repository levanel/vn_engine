import React, { useState } from 'react';
import './Editor.css'; // Create this for styling

const Editor = ({field: onUpdate }) => {
    const [text, setText] = useState('');
    const [character, setCharacter] = useState('');
    const [background, setBackground] = useState('');

    const handleUpdate = () => {
        onUpdate({
            text,
            character,
            background,
        });
    };

    return (
        <div className="editor">
            <h2>Editor</h2>
            <label>Character:</label>
            <input 
                type="text" 
                value={character} 
                onChange={(e) => setCharacter(e.target.value)} 
            />

            <label>Text:</label>
            <textarea 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
            />

            <label>Background Image URL:</label>
            <input 
                type="text" 
                value={background} 
                onChange={(e) => setBackground(e.target.value)} 
            />

            <button onClick={handleUpdate}>Update Preview</button>
        </div>
    );
};

export default Editor;
