import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>2048</h1>
        <div>
            <button class = "button">New Game</button>
            <div class = "scores">
                Score: <span id = "score"> 0 </span> Best: <span id = "highscore"> 0 </span>
            </div>
        </div>
        <div class = "container">
            <div>board</div>
            <div class="popup">
                <h2>Game Over</h2>
                <button class = "button">New Game</button>
            </div>
            <div></div>
        </div>
      </header>
    </div>
  );
}

export default App;
