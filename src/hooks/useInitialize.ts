import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchFare } from "../api/fetchFare"

export const useInitialize = () => {
    return () => {
        const dispatch = useDispatch()
        useEffect(() => {
            dispatch({ type: "FETCH_DATA_REQEST" })
            const fetchData = async () => {
                try {
                    const html = await fetchFare()
                    dispatch({ type: "FETCH_DATA_SUCCESS", payload: { html: html }})
                } catch (err) {
                    dispatch({ type: "FETCH_DATA_ERROR", error: (err as Error).message })
                }
            }
            fetchData()
        }, [dispatch])
    }
}