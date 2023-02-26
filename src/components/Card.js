import React from "react"

import "./Card.css"

function Card(props) {
    const [showPopup, setShowPopup] = React.useState(false)

    function togglePopup() {
        setShowPopup(!showPopup)
    }

    function getInstagram(insta) {
        if (insta === null) return ""
        let username
        if (insta.startsWith("http") || insta.startsWith("www.")) {
            username = insta.split("instagram.com/").pop()
        }
        else username = insta
        return (
        <a  href={`https://www.instagram.com/${username}`} 
            className="nostyle" 
            target="_blank" 
            rel="noopener noreferrer">
            {`@${username}`}
        </a>)
    }

    return (
        <div className="card-container">
            <div onClick={togglePopup}>
                <img className="card-image" src={props.url_small} alt={props.alt_descr} />
            </div>
            {showPopup && (
                <div className="popup-container">
                    <div className="popup-content">
                        <img className="popup-image" src={props.url_full} alt={props.alt_descr} />
                        <button onClick={togglePopup} className="cut-btn">X</button>
                    </div>
                </div>
            )}
            <div className="card-content">
                <div className="media">
                    <div className="media-left">
                        <img className="user-pic" src={props.user.profile_img} alt="profile pic" />
                    </div>
                    <div className="media-right">
                        <p className="user-name">{props.user.name}</p>
                        <p className="user-insta">{getInstagram(props.user.instagram)}</p>
                        <p className="user-likes" style={{color:"red"}}>{props.user.likes}</p>
                    </div>
                </div>
                <div className="content">
                    <p className="content-descr"><em>{props.description}</em></p>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Card)
