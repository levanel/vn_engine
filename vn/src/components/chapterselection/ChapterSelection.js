import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChapterSelection.css'; 

function ChapterSelection() {
    const [chapters, setChapters] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3001/notes/')
            .then((res) => res.json())
            .then((data) => setChapters(data))
            .catch((err) => console.error('Error fetching previewData:', err));
    }, []);

    const handleChapterClick = (chapter) => {
        navigate(`/chapter${chapter.id}/`);
    };

    return (
        <div className="chapter-selection">
            <h1>Select a Chapter</h1>
            <div className="chapter-list">
                {chapters.map((chapter) => (
                    chapter.id !== 0 ? (
                        <div
                            key={chapter.id}
                            className="chapter-preview"
                            onClick={() => handleChapterClick(chapter)}
                            style={{ backgroundImage: `url(${chapter.background})` }}
                        >
                            <h2>{chapter.name}</h2>
                            <div className="chapter-description">{chapter.details}</div>
                        </div>
                    ) : (
                        <p key="placeholder"></p>
                    )
                ))}
            </div>
        </div>
    );
}

export default ChapterSelection;
