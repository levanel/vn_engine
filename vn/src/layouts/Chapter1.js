import React,{useState} from 'react'
import bg_school from '../assets/images/background1.jpg'
import happy_face from '../assets/images/happy.png';
import sad_face from '../assets/images/sad.png';
import StoryPlayer from '../components/statemanager/stateflow.js'
import previewData from '../tempfol/preview.json'
import { getCurrentScene } from '../components/statemanager/majorstate.js';

function Ch1_Layout(){
    const [CurrentSceneIndex, setCurrentSceneIndex] = useState(0);

  const handleNextScene = (nextIndex) => {
    setCurrentSceneIndex(nextIndex);
  };
    return(
      <div className='Ch1'> 
        <StoryPlayer currentIndex={CurrentSceneIndex} jsonData={previewData}/>
      </div>
    ) 
  }
export default Ch1_Layout;