import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartMenu from './layouts/StartMenu';
import Ch1_Layout from './layouts/Chapter1';

function App() {
  const [sceneData, setSceneData] = useState({
    text: "Hello, this is a test scene!",
    character: "Aria",
    background: "",
});
  return (
    <Router>
      <div>
        <Routes>
          {/* Main route for StartMenu */}
          <Route path="/" element={<StartMenu />} />
          {/* Route for Chapter 1 Layout */}        
          <Route path="/Chapter1/" element={<Ch1_Layout />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
