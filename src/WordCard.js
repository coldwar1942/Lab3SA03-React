import React, {useState,useEffect,useRef} from 'react'
import CharacterCard from './CharacterCard'
import _, { attempt } from 'lodash';

const prepareStateFromWord = (given_word) => {
    let random_word = _.shuffle(given_word)[0]
    let word = random_word.toUpperCase()
    let chars = _.shuffle(Array.from(word))
    return {
        word,
        chars,
        attempt: 1,
        guess: '',
        completed: false
        }
   }

export default function WordCard(props) {      

    const [state, setState] = useState(prepareStateFromWord(props.value))
    const [resetGame, setResetGame] = useState(false)
    const [finishGame, setFinishGame] = useState(false)

    const activationHandler = c => {
        console.log(`${c} has been activated`)
        
        let guess = state.guess + c
        setState({...state, guess})

        if(guess.length == state.word.length) {
            if(guess == state.word) {
                console.log('yeah!')
                setState({...state,guess:'', completed: true})
                setFinishGame(true)
                
            }else {
                console.log('reset')
                setState({...state, guess: '', attempt: state.attempt + 1})
                console.log(`${state.attempt} <= attempt`)
                setFinishGame(true)
            }
        }
       
    }

    const swapWord = () => {
        //let new_word = _.shuffle(props.value)[0]
        //setState({...state, word: new_word})
        console.log("Swap Word!2")
        //console.log({new_word})

    }

    const deleteGuess = () => {
        setState({...state, guess: '', attempt: 1})
    }

    const handlePlaygame = () => {
        deleteGuess()
        setResetGame(true)
        
    }
    
    return (
        <div>
        {
            state.chars.map(
                (c, i) => <CharacterCard value={c} key={i} activationHandler={activationHandler} attempt = {state.attempt} 
                resetGame={resetGame} finishGame={finishGame}/>
            )
        }
        <button onClick={handlePlaygame}>Try again</button>
        
        </div>
    )
}