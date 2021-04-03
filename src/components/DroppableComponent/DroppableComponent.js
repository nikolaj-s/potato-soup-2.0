import React from 'react'
import {DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Loading } from '../Loading/Loading'
import "./DroppableComponent.css"

export const DroppableComponent = (props) => {
    
    return (

        <>
            {props.loading ? <Loading /> : null}
                <Droppable   droppableId="image-array-container">
                    
                    {(provided) => (
                    <div className="image-array-container" {...provided.droppableProps} ref={provided.innerRef}>
                        
                        {props.images.map((image, index) => {
                        return (
                            <Draggable  key={image + `index-key=${index}`} draggableId={image} index={index}>
                            {(provided) => (
                                <div className="image-container" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                                    <img onClick={props.openImage} src={image} alt={image} />
                                </div>
                               
                            )}
                            </Draggable>
                        );
                        })}
                        {provided.placeholder}
                    </div>
                    )}
                </Droppable>
            </>
    )
}
