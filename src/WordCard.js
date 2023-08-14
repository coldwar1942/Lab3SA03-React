import React, {useState,useEffect,useRef} from 'react'
import CharacterCard from './CharacterCard'
import _ from 'lodash';

const prepareStateFromWord = (given_word) => {
    let random_word = _.shuffle(given_word)[0]
    let word = random_word.toUpperCase()
    let chars = _.shuffle(Array.from(word))
    return {
        word,
        chars,
        attemp: 1,
        guess: '',
        completed: false
        }
   }

export default function WordCard(props) {      

    const [state, setState] = useState(prepareStateFromWord(props.value))

    const activationHandler = c => {
        console.log(`${c} has been activated`)
        let guess = state.guess + c
        setState({...state, guess})

        if(guess.length == state.word.length) {
            if(guess == state.word) {
                console.log('yeah!')
                setState({...state,guess:'', completed: true})
            }else {
                console.log('reset')
                setState({...state, guess: '', attempt: state.attempt + 1})
            }
        }
       
    }

    const handlePlaygame = () => {
        setState(prepareStateFromWord(props.value))
        setState({...state, guess: '', attempt: state.attempt + 1})
        
    }
    
    return (
        <div>
        {
            state.chars.map(
                (c, i) => <CharacterCard value={c} key={i} activationHandler={activationHandler} attempt = {state.attempt}/>
            )
        }
        <button onClick={handlePlaygame}>Try again</button>
        </div>
    )
}