import React from 'react';

export default function CharacterCard(props){
    return (
        <div class={props.class}>{props.value}</div>
    )
}