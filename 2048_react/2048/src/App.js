import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';

function Scoreboard() {
  const [currScore, setCurrScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  return (
    <div className = "Scoreboard">
      <div class = "flex items-center justify-center">
        <h2>
          Score: {currScore}
        </h2>
        <h2>
          Best: {highScore}
        </h2>
      </div>
    </div>
  )
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div class = "flex justify-center">
          <div class = "container mx:auto justify-center border-2 border-black flex-rows h-3/4 w-1/3">
            <div class = "container mx:auto justify-left p-2">
              <img
                src = "/leaderboard_icon.png" 
                alt = "leaderboard_icon"
                class = "w-12 h-12 text-left p-1 rounded-lg bg-tan-100 border-2 border-tan-200">
              </img>
            </div>
            <div class = "flex justify-center mb-6">
              <h1 class = "text-5xl font-bold mx:auto text-zinc-600">
                2048
              </h1>
            </div>
            <div class = "flex justify-center">
              <button class = "text-xl font-bold text-white rounded-lg border-tan-200 bg-tan-100 px-2 py-1">
                New Game
              </button>
            </div>
            <div>
              <Scoreboard/>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
