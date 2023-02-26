import { useState,useEffect } from "react"
import "./Header.css"
import React from "react"
function Header({handleSearch}) {
    const [darkMode, setDarkMode] = useState(false)
    function handleEnter(e, value) {
        if (e.key === 'Enter') {
            handleSearch(value)
        }
    }
    function handleClick() {
        const searchInput = document.querySelector(".search-input")
        handleSearch(searchInput.value)
    }

    useEffect(() => {
        if (darkMode) document.body.className = "dark";
        else document.body.className = "";
    }, [darkMode])

    useEffect(() => {
        const preferredDarkMode = localStorage.getItem("darkMode");
        if (preferredDarkMode === "true") setDarkMode(true)
    }, [])
    return (
        <header className="header">
            <div className="header-logo" onClick={() => window.location.reload()}>
                <p className="header-title">Unsplash</p>
                <p className="header-sub">Talent meets Creativeness</p>
            </div>
            <div className="header-search">
                <button type="submit" className="search-btn" onClick={handleClick}>
                    <i className="fa-solid fa-magnifying-glass" />
                </button>
                <input type="text" className="search-input" name="searchQuery" autoComplete="off"
                    onKeyDown={e => handleEnter(e, e.target.value)} placeholder="Type here..." />
            </div>
            <div className="header-btns">
                <button 
                className="btn side-btn" 
                title="Toggle dark mode"
                onClick={() => {
                    localStorage.setItem("darkMode", !darkMode)
                    setDarkMode(!darkMode)
                }}
            >
                <p>
                    {darkMode ? 
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-sun-fill" viewBox="0 0 16 16">
                            <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
                        </svg> :
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-moon-fill" viewBox="0 0 16 16">
                            <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
                        </svg>
                    }
                </p>
            </button>
            </div>
        </header>
    )
}

export default React.memo(Header)