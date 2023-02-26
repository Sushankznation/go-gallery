import React, { useState, useEffect } from 'react'
import "./SideButtons.css"

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

function SideButtons() {
    const [showTopBtn, setShowTopBtn] = useState(false)
   

    useEffect(() => {
        function handleScroll() {
            if (window.pageYOffset > 1000) setShowTopBtn(true)
            else setShowTopBtn(false)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

  

  

    return (
        <div className="side-btns">
            {showTopBtn && (
            <button className="btn side-btn" title="Scroll to Top" onClick={scrollToTop}>
                <p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-chevron-up" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                    </svg>
                </p>
            </button>)}

           
        </div>
    )
}

export default React.memo(SideButtons)
