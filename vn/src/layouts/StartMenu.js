import React, { useState } from 'react';
import ChapterSelection from '../components/chapterselection/ChapterSelection'; // Importing chapter selection component
import LoadGame from './LoadGame'; // Importing load game component
import SaveGame from './SaveGame'; // Importing save game component
import Options from './Options'; // Importing options component
import QuitGame from './QuitGame'; // Importing quit game component
const Start_menu = () => {
  const [gameState, setGameState] = useState("menu"); // Start at the main menu

  return (
    <div className="game-container">
      {gameState === "menu" && <MainMenu setGameState={setGameState} />}
      {gameState === "newGame" && <ChapterSelection />}
      {gameState === "loadGame" && <LoadGame />}
      {gameState === "saveGame" && <SaveGame />}
      {gameState === "options" && <Options />}
      {gameState === "quit" && <QuitGame />}
    </div>

  );
};
const MainMenu = ({ setGameState }) => {
  return (
    <div className="main-menu">
      <h1>Main Menu</h1>
      <button onClick={() => setGameState("newGame")}>New Game</button>
      <button onClick={() => setGameState("loadGame")}>Load Game</button>
      <button onClick={() => setGameState("saveGame")}>Save Game</button>
      <button onClick={() => setGameState("options")}>Options</button>
      <button onClick={() => setGameState("quit")}>Quit</button>
    </div>
  );
};

export default Start_menu;
