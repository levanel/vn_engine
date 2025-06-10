import React from 'react';
import './Preview.css'; // Create this for styling

const Preview = ({ data }) => {
    return (
        <div 
            className="preview" 
            style={{ backgroundImage: `url(${data.background})` }}
        >
            <h3>{data.character}</h3>
            <p>{data.text}</p>
        </div>
    );
};

export default Preview;
