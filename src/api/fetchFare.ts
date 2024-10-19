import Logger from "../logger"
import * as pako from "pako"

// cache the data retrieved from gov website
const key = "fareData"

// 1-day cache eviction
const expirationMs = 24 * 60 * 60 * 1000

const compress = (s: string): string => {
    const compressed = pako.deflate(s)
    return btoa(String.fromCharCode(...compressed))
}

const decompress = (s: string): string => {
    const binary = atob(s)
    const uint8arr = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
        uint8arr[i] = binary.charCodeAt(i)
    }
    const decompressed = pako.inflate(uint8arr, { to: "string"})
    return decompressed
}

const getCache = (): string | undefined => {
    const data = localStorage.getItem(key)
    if (data) {
        const { value, timestamp } = JSON.parse(data)
        if (Date.now() - timestamp < expirationMs) {
            return decompress(value)
        } else {
            Logger.info("removing old cached data")
            localStorage.removeItem(key)
        }
    }
    return undefined
}

const setCache = (html: string) => {
    const data = {
        value: compress(html),
        timestamp: Date.now()
    }
    localStorage.setItem(key, JSON.stringify(data))
}

export const fetchFare = async (): Promise<string> => {
    const cachedData = getCache()
    if (cachedData) {
        Logger.info("found cached fare html, no need to fetch API")
        return cachedData
    }

    // thank you codetabs
    const url = "https://api.codetabs.com/v1/proxy/?quest=https://www.td.gov.hk/en/transport_in_hong_kong/public_transport/taxi/taxi_fare_of_hong_kong/index.html"
    Logger.info(`fetching ${url}`)
    const res = await fetch(url)

    if (!res.ok) {
        throw new Error("failed to fetch from gov website")
    }

    const html = await res.text()

    // cache the html
    setCache(html)
    return html
}