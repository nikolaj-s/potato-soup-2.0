import React from 'react'

import './LargeImageView.css'

export const LargeImageView = (props) => {

    const [index, setIndex] = React.useState(0)
    
    const [currentImg, setCurrentImg] = React.useState("")

    React.useEffect(() => {

        setIndex(props.index)
        setCurrentImg(props.all_images[props.index])

    }, [])
    
    const moveRight = () => {
        const length = props.all_images.length - 1;
        let currentIndex = index

        if (currentIndex < length) {
            setIndex(currentIndex+=1)
        } else {
            setIndex(0)
        }

        setCurrentImg(props.all_images[index])
    }

    const moveLeft = () => {
        const length = props.all_images.length - 1;
        let currentIndex = index;

        if (currentIndex > 0) {
            currentIndex-=1
            setIndex(currentIndex)
        } else {
            setIndex(length)
        }
        

        setCurrentImg(props.all_images[index])
    }

    return (
        <div className="large-image-view-container">
            <div onClick={props.close} className="close-large-view-button-container">
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.41 9L18.7 1.71C18.8638 1.5187 18.9494 1.27262 18.9397 1.02095C18.93 0.769272 18.8256 0.530533 18.6475 0.352439C18.4694 0.174344 18.2307 0.0700115 17.979 0.0602903C17.7274 0.0505692 17.4813 0.136176 17.29 0.300002L9.99997 7.59L2.70997 0.290002C2.51867 0.126176 2.2726 0.0405699 2.02092 0.0502911C1.76924 0.0600122 1.53051 0.164344 1.35241 0.342439C1.17432 0.520533 1.06998 0.759272 1.06026 1.01095C1.05054 1.26262 1.13615 1.5087 1.29997 1.7L8.58997 9L1.28997 16.29C1.18529 16.3796 1.10027 16.49 1.04025 16.614C0.980225 16.7381 0.946494 16.8732 0.941175 17.0109C0.935855 17.1487 0.959061 17.286 1.00934 17.4143C1.05961 17.5427 1.13587 17.6592 1.23332 17.7567C1.33078 17.8541 1.44733 17.9304 1.57565 17.9806C1.70398 18.0309 1.84131 18.0541 1.97903 18.0488C2.11675 18.0435 2.25188 18.0098 2.37594 17.9497C2.50001 17.8897 2.61033 17.8047 2.69997 17.7L9.99997 10.41L17.29 17.7C17.4813 17.8638 17.7274 17.9494 17.979 17.9397C18.2307 17.93 18.4694 17.8257 18.6475 17.6476C18.8256 17.4695 18.93 17.2307 18.9397 16.9791C18.9494 16.7274 18.8638 16.4813 18.7 16.29L11.41 9Z" fill="white"/>
                </svg>
            </div>
            <div className="inner-large-image-container">
                <img src={currentImg} alt="large-view" />
            </div>
            <div className="controls-container">
                <div onClick={moveLeft} className="move-left"></div>
                <div onClick={moveRight} className="move-right"></div>
            </div>
        </div>
    )
}
