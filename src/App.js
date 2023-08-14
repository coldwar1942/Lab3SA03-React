import WordCard from './WordCard'
import './App.css'

const word = ["Hello", "Car", "Bus"]

function App() {
  return (
    <div>
            
                <WordCard value={word}/>
            
    </div>
  );
}

export default App;
