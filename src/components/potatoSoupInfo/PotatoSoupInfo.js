import React from 'react'

import './PotatoSoupInfo.css'

import {Droppable} from 'react-beautiful-dnd'

export const PotatoSoupInfo = (props) => {

   

    const DraggingStyle = isDraggingOver => ({
        background: isDraggingOver ? "rgb(129, 62, 62)" : "transparent"
    })

    return (
        <div style={props.top ? {background: "none", backgroundColor: "transparent", height: 400} : null} className="potato-soup-info-container">
            <div style={props.top ? {position: "fixed", top: '100px', left: '40px', width: '38%', height: '450px'} : null} className="inner-potato-soup-container">
            
                <h2 style={props.top ? {display: "none"} : null}>Potato Soup 2.0</h2>
                <li style={props.top ? {display: "none"} : null}>Potato Soup 2.0

                Brought to you by the 
                power of making soup 
                and web scrapping with
                python.
                </li>
                <li style={props.top ? {display: "none"} : null}>
                Search for image 
                assets and drop them 
                into the soup bowl!
                </li>
                <Droppable droppableId="soup-container">
                    {
                        (provided, snapshot )=> (
                            <>
                            
                            <div onClick={props.toggleSavedImages} style={DraggingStyle(snapshot.isDraggingOver)} ref={provided.innerRef} className="soup-container">
                            
                                <img className="drop-area" src="https://res.cloudinary.com/drlkgoter/image/upload/v1617312630/potato-soup-2.0/soup-bowl_pyhzq9.png" alt="soup" />
                        
                            </div>
                            </>
                        )
                    }
                </Droppable>
             
            </div>
            
        </div>
    )
}
