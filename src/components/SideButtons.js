import React, { useState, useEffect } from 'react'
import "./SideButtons.css"

// function to scroll to the top of the page
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

// functional component for the side buttons
function SideButtons() {
    // state variable to show or hide the "scroll to top" button
    const [showTopBtn, setShowTopBtn] = useState(false)
   
    // useEffect hook to update showTopBtn state based on window.pageYOffset
    useEffect(() => {
        function handleScroll() {
            if (window.pageYOffset > 1000) setShowTopBtn(true)
            else setShowTopBtn(false)
        }
        // event listener added to window object to listen for scroll event
        window.addEventListener("scroll", handleScroll)
        // cleanup function to remove event listener
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // return JSX for the side buttons component
    return (
        <div className="side-btns">
            {/* conditional rendering of "scroll to top" button */}
            {showTopBtn && (
            <button className="btn side-btn" title="Scroll to Top" onClick={scrollToTop}>
                <p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-chevron-up" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                    </svg>
                </p>
            </button>)}

            {/* more buttons can be added here */}
           
        </div>
    )
}

// export the SideButtons component with React.memo() for performance optimization
export default React.memo(SideButtons)
