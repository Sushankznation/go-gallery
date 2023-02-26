import { useState, useEffect } from "react"
import axios from "axios"

const API_KEY = process.env.REACT_APP_API_KEY

export default function useFetch(query = "", page = 1) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setData([])
    }, [query])

    useEffect(() => {
        setLoading(true)
        let url
        if (query === "") url = "https://api.unsplash.com/photos/random/?count=30"
        else url = `https://api.unsplash.com/search/photos/?query=${query}&page=${page}&per_page=30`

        axios.get(url, {
            headers: { 'Authorization': `Client-ID ${API_KEY}` }
        })
            .then(response => {
                const responseData = query === "" ? response.data : response.data.results
                const newData = responseData.map(item => {
                    return {
                        id: item.id,
                        url_small: item.urls.small,
                        url_full: item.urls.full,
                        user: {
                            name: item.user.name,
                            instagram: item.user.instagram_username,
                            profile_img: item.user.profile_image.medium
                        },
                        description: item.description ? item.description : "",
                        alt_descr: item.alt_description ? item.alt_description : ""
                    }
                })
                setData(prevData => [...new Set([...prevData, ...newData])]) //for duplicates
                setError(null)
                if (query !== "") setHasMore(response.data.total_pages > page)
                else setHasMore(true)
            })
            .catch(err => {
                setError(err)
                console.log(err)})
            .finally(() => setLoading(false))
    }, [query, page])

    return [data, loading, error, hasMore]
}
