import { useState, useEffect } from "react"
import axios from "axios"

const API_KEY = process.env.REACT_APP_API_KEY

export default function useFetch(query = "", page = 1) {
    const [data, setData] = useState([]) // state for fetched data
    const [loading, setLoading] = useState(true) // state for loading status
    const [error, setError] = useState(null) // state for error status
    const [hasMore, setHasMore] = useState(false) // state for pagination

    useEffect(() => {
        setData([]) // clear data when query changes
    }, [query])

    useEffect(() => {
        setLoading(true) // set loading status to true
        let url
        if (query === "") url = "https://api.unsplash.com/photos/random/?count=30" // endpoint for random photos
        else url = `https://api.unsplash.com/search/photos/?query=${query}&page=${page}&per_page=30` // endpoint for search photos

        axios.get(url, {
            headers: { 'Authorization': `Client-ID ${API_KEY}` }
        })
            .then(response => {
                const responseData = query === "" ? response.data : response.data.results // extract response data based on query
                const newData = responseData.map(item => {
                    return {
                        id: item.id,
                        url_small: item.urls.small,
                        url_full: item.urls.full,
                        user: {
                            name: item.user.name,
                            instagram: item.user.instagram_username,
                            profile_img: item.user.profile_image.medium,
                            like:item.likes
                        },
                        description: item.description ? item.description : "",
                        alt_descr: item.alt_description ? item.alt_description : ""
                    }
                })
                setData(prevData => [...new Set([...prevData, ...newData])]) // merge previous data with new data and remove duplicates
                setError(null) // reset error status
                if (query !== "") setHasMore(response.data.total_pages > page) // calculate pagination status
                else setHasMore(true)
            })
            .catch(err => {
                setError(err) // set error status
                console.log(err)
            })
            .finally(() => setLoading(false)) // set loading status to false
    }, [query, page]) // fetch data when query or page changes

    return [data, loading, error, hasMore] // return fetched data, loading status, error status, and pagination status
}
