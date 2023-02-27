import React, { useState, useRef, useCallback } from "react"
import Header from "./components/Header"
import Cardgrid from "./components/Cardgrid"
import SideButtons from "./components/SideButtons"
import useFetchData from "./hooks/useFetchData"

export default function App() {
  // Declare state variables
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)

  // Use custom hook to fetch data based on current query and page
  const [data, loading, error, hasMore] = useFetchData(query, page)

  // Create a ref to observe the last card in the grid
  const observer = useRef()

  // Create a callback to observe the last card in the grid
  const cardRef = useCallback(
    (cardNode) => {
      // If currently loading, do nothing
      if (loading) return

      // Disconnect any existing observer before creating a new one
      if (observer.current) observer.current.disconnect()

      // Create a new IntersectionObserver and handle intersection events
      observer.current = new IntersectionObserver((entries) => {
        // If the last card is intersecting the viewport and there are more pages to load and no error, update the page number
        if (entries[0].isIntersecting && hasMore && error === null) {
          setPage((prevPage) => prevPage + 1)
        }
      })

      // If a card node is passed, start observing it
      if (cardNode) observer.current.observe(cardNode)
    },
    [loading, hasMore, error]
  )

  // Create a callback to handle search queries
  const handleSearch = useCallback(
    (searchQuery) => {
      setQuery(searchQuery)
    },
    []
  )

  return (
    <>
      {/* Render Header component and pass handleSearch callback as prop */}
      <Header handleSearch={handleSearch} />
      
      {/* Render SideButtons component */}
      <SideButtons />

      {/* Render Cardgrid component with fetched data and pass cardRef callback as ref */}
      {data && <Cardgrid data={data} ref={cardRef} />}

      {/* Render loading spinner if currently loading */}
      {loading && <img src={process.env.PUBLIC_URL + "/loading.svg"} className="img-center" alt="Loading" />}

      {/* Render error message if there is an error */}
      {error && (
        <p style={{ textAlign: "center" }}>
          {error.response.data === "Rate Limit Exceeded" ? "Request limit reached. Please try again later." : error.message}
        </p>
      )}
    </>
  )
}
