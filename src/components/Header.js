import React from "react"

import "./Header.css"

function Header({handleSearch}) {
    function handleEnter(e, value) {
        if (e.key === 'Enter') {
            handleSearch(value)
        }
    }
    function handleClick() {
        const searchInput = document.querySelector(".search-input")
        handleSearch(searchInput.value)
    }

    return (
        <header className="header">
            <div className="header-logo" onClick={() => window.location.reload()}>
                <p className="header-title">Picturez</p>
                <p className="header-sub">Royalty-free Pictures</p>
            </div>
            <div className="header-search">
                <button type="submit" className="search-btn" onClick={handleClick}>
                    <i className="fa-solid fa-magnifying-glass" />
                </button>
                <input type="text" className="search-input" name="searchQuery" autoComplete="off"
                    onKeyDown={e => handleEnter(e, e.target.value)} placeholder="Picture Search" />
            </div>
            <div className="header-btns">
                <button className="btn" onClick={() => alert('Not implemented.')}>Log in</button>
                <button className="btn" onClick={() => alert('Not implemented.')}><strong>Sign up</strong></button>
            </div>
        </header>
    )
}

export default React.memo(Header)
