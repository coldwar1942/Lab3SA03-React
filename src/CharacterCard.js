import React, {useState, useEffect, useRef} from 'react';
export default function CharacterCard(props){
    const [active, setActive] = useState(false)
    const attemptRef = useRef(props.attempt);
    const activate = () => {
        if(!active){
            setActive(true)
            props.activationHandler(props.value)
            console.log(`${attemptRef.current} <= attemptRef`)
        }
    }

    useEffect(() => {
        if(props.finishGame) {
            console.log(`finish game!`)
           if(attemptRef.current != props.attempt){
                setActive(false);
                attemptRef.current = props.attempt
            } 
        }
        
        })

    useEffect(() => {
        if (props.resetGame) {
            setActive(false)
            
            }
        },)
        
        
       

    const className = `card ${active ? 'activeCard' : ''}`
    return (
        <div className={className} onClick={activate}>{props.value}</div>
    )
}
