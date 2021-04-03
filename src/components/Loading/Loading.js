import React from 'react'

import './Loading.css'

export const Loading = () => {
    return (
        <div className="loading-container">
            <div className="inner-loading-container">
            <img src="https://res.cloudinary.com/drlkgoter/image/upload/v1617314560/potato-soup-2.0/giphy_awo8z5.gif" alt="loading-soup" />
            <h2>Stewing...</h2>
            </div>
        </div>
    )
}
