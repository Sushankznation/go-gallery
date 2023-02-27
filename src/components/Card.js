import React from "react" // Importing the React library

import "./Card.css" // Importing CSS styles for the Card component

function Card(props) { // Defining the Card component, which accepts props as its argument
    const [showPopup, setShowPopup] = React.useState(false) // Using the useState hook to create a state variable called showPopup, which defaults to false. Also defining a function called setShowPopup to update the showPopup state.

    function togglePopup() { // Defining a function called togglePopup which will be called when the image is clicked on
        setShowPopup(!showPopup) // Toggling the showPopup state between true and false
    }

    function getInstagram(insta) { // Defining a function called getInstagram which accepts an Instagram username as its argument
        if (insta === null) return "" // If no Instagram username is provided, return an empty string
        let username
        if (insta.startsWith("http") || insta.startsWith("www.")) { // Checking if the provided Instagram username is a URL or not
            username = insta.split("instagram.com/").pop() // If it is a URL, extract the username from the URL
        }
        else username = insta // If it is not a URL, use the provided Instagram username
        return ( // Returning a link to the user's Instagram profile
        <a  href={`https://www.instagram.com/${username}`} 
            className="nostyle" 
            target="_blank" 
            rel="noopener noreferrer">
            {`@${username}`}
        </a>)
    }

    return ( // Rendering the Card component
        <div className="card-container"> 
        {/* // Creating a div container for the card */}
            <div onClick={togglePopup}> 
            {/* // Adding an onClick event to the image which will call the togglePopup function when clicked */}
                <img className="card-image" src={props.url_small} alt={props.alt_descr} /> 
                {/* // Adding an image to the card */}
            </div>
            {showPopup && ( // If showPopup is true, render the popup
                <div className="popup-container">
                    <div className="popup-content">
                        <img className="popup-image" src={props.url_full} alt={props.alt_descr} /> 
                        {/* // Adding a full-sized image to the popup */}
                        <button onClick={togglePopup} className="cut-btn">X</button>
                         {/* // Adding a button to close the popup */}
                    </div>
                </div>
            )}
            <div className="card-content"> 
            {/* // Creating a div container for the card's content */}
                <div className="media"> 
                {/* // Creating a div container for the user's profile picture and name */}
                    <div className="media-left">
                        <img className="user-pic" src={props.user.profile_img} alt="profile pic" /> 
                        {/* // Adding the user's profile picture to the card */}
                    </div>
                    <div className="media-right">
                        <p className="user-name">{props.user.name}</p> 
                        {/* // Adding the user's name to the card */}
                        <p className="user-insta">{getInstagram(props.user.instagram)}</p> 
                        {/* // Adding a link to the user's Instagram profile */}
                        <p className="user-likes" style={{color:"red"}}>{props.user.likes}</p> 
                        {/* // Adding the number of likes the user has to the card */}
                    </div>
                </div>
                <div className="content"> 
                {/* // Creating a div container for the image's description */}
                    <p className="content-descr"><em>{props.description}</em></p> 
                    {/* // Adding the image's description to the card */}
</div>
</div>
</div>
)
}

export default React.memo(Card) // Exporting the Card component as a memoized component to improve performance by avoiding unnecessary re-renders.