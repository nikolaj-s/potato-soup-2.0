import React from 'react'

import "./Image.css"

export const Image = (props) => {
    return (
        <div className="image-container">
            <img src={props.image} alt={props.image}/>            
        </div>
    )
}
