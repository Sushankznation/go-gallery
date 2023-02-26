import React, { useState, useRef, useCallback } from "react"
import Header from "./components/Header"
import Cardgrid from "./components/Cardgrid"
import SideButtons from "./components/SideButtons"
import useFetchData from "./hooks/useFetchData"

export default function App() {
	const [query, setQuery] = useState("")
	const [page, setPage] = useState(1)
	const [data, loading, error, hasMore] = useFetchData(query, page)

	const observer = useRef()
	const cardRef = useCallback(cardNode => {
		if (loading) return
		if (observer.current) observer.current.disconnect()
		observer.current = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting && hasMore && error === null) {
			  setPage(prevPage => prevPage + 1)
			}
		  })
		  if (cardNode) observer.current.observe(cardNode)
	}, [loading, hasMore, error])

	const handleSearch = useCallback(searchQuery => {
		setQuery(searchQuery)
	}, [])

	return (
		<>
			<Header handleSearch={handleSearch} />
			<SideButtons />
			{data && <Cardgrid data={data} ref={cardRef} />}
			{loading && <img src={process.env.PUBLIC_URL + '/loading.svg'} className="img-center" alt="Loading" />} 
			{error && <p style={{textAlign: "center"}}>
				{error.response.data === "Rate Limit Exceeded" ? 
				"Request limit reached. Please try again later." : //API limited to 50 requests/hour
				error.message}
			</p>}
    	</>
  	)
}
