import React, {useState,useEffect,useRef} from 'react'
import CharacterCard from './CharacterCard'
import _, { attempt, words } from 'lodash';

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
        let new_word
       
        setState({...state, guess})
        setResetGame(false)

        if(guess.length == state.word.length) {
            if(guess == state.word) {
                console.log('yeah!')
                setState({...state,guess:'', completed: true})
                setFinishGame(true)

                new_word = prepareStateFromWord(props.value)
                console.log(`${new_word} new word`)
                changeWord(new_word)
                setResetGame(true) 
                
            }else {
                console.log('reset')
                setState({...state, guess: '', attempt: state.attempt + 1})
                console.log(`${state.attempt} <= attempt`)
                setFinishGame(true)
            }
            
            
        }
       
    }

    const changeWord = (given_words) => {
        setState({...state,word: given_words.word,chars:given_words.chars})
       
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