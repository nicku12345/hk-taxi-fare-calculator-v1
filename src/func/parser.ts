import { FareRule, FareRuleProps } from "../components/Fare";
import Logger from "../logger";
import * as cheerio from "cheerio";


type TaxiType = "urban" | "newTerritories" | "lantau"
const taxiTypes: TaxiType[] = ["urban", "newTerritories", "lantau"]

const getAsOfDate = ($: cheerio.CheerioAPI): string | undefined => {
    const regex = /Details of taxi fare \(effective from (\d{1,2} \w+ \d{4})\)/;
    const text = $.root().text()
    const match = regex.exec(text)
    return match ? match[1] : undefined
}

const getTaxiName = (taxiType: TaxiType): string => {
    switch(taxiType) {
        case "urban": return "Urban"
        case "newTerritories": return "New Territories"
        case "lantau": return "Lantau"
    }
}

const getFirst2kmFare = ($: cheerio.CheerioAPI, taxiType: TaxiType): number | undefined => {
    const tableSelector = `table:contains('Fare Table - ${getTaxiName(taxiType)} Taxi')`
    const fare = $(tableSelector)
        .find('td')
        .filter((_, element) => $(element).text().includes('First 2 kilometres or any part thereof'))
        .next()
        .text()
        .trim()
    return fare ? parseFloat(fare.replace('$', '').trim()) : undefined
}

const getNext200mOr1minFare = ($: cheerio.CheerioAPI, taxiType: TaxiType): { fare: number, discountFare: number } | undefined => {
    const tableSelector = `table:contains('Fare Table - ${getTaxiName(taxiType)} Taxi')`
    const fares: number[] = []
    $(tableSelector)
        .find('td')
        .filter((_, element) => $(element).text().includes('Until the chargeable amount reaches'))
        .next('td')
        .find('p')
        .each((_, element) => {
            const text = $(element).text()
            const match = text.match(/\$\s*(\d+(\.\d+)?)/)
            if (match) {
                fares.push(parseFloat(match[1]))
            }
        })

    if (fares.length !== 2) {
        Logger.error("failed to find next 200m or 1 min fares")
        Logger.error("fares fetched: ", fares)
        return undefined
    }

    if (fares[0] < fares[1]) {
        Logger.error("something wrong in fetching the next 200m or 1 min fares")
        Logger.error(`before discount charge: ${fares[0]}`)
        Logger.error(`after discount charge: ${fares[1]}`)
        return undefined
    }

    return { fare: fares[0], discountFare: fares[1] }
}

const getDiscountFareThreshold = ($: cheerio.CheerioAPI, taxiType: TaxiType): number | undefined => {
    const regex = /After the chargeable amount has reached \$ (\d+(\.\d{1,2})?)/;
    const tableSelector = `table:contains('Fare Table - ${getTaxiName(taxiType)} Taxi')`
    const text = $(tableSelector).find('td').text()
    const match = regex.exec(text)
    return match ? parseFloat(match[1]) : undefined
}

export const parseHtml = (html: string): FareRuleProps => {
    const $ = cheerio.load(html)

    const asOfDate = getAsOfDate($)
    if (asOfDate === undefined) {
        const error = "Cannot fetch as of date"
        Logger.error(error)
        return { status: "error", message: error}
    }

    const map: Map<TaxiType, FareRule> = new Map();

    for (const taxiType of taxiTypes) {
        const first2kmFare = getFirst2kmFare($, taxiType)
        const discountFareThreshold = getDiscountFareThreshold($, taxiType)
        const next200mOr1min = getNext200mOr1minFare($, taxiType)

        if (first2kmFare === undefined) {
            const err = "Cannot fetch taxi fare (first 2km fare)"
            Logger.error(err)
            return { status: "error", message: err }
        }

        if (discountFareThreshold === undefined) {
            const err = "Cannot fetch taxi fare (discount threshold)"
            Logger.error(err)
            return { status: "error", message: err }
        }

        if (next200mOr1min === undefined) {
            const err = "Cannot fetch taxi fare (next 200m or 1 min fares)"
            Logger.error(err)
            return { status: "error", message: err }
        }

        map.set(taxiType, {
            first2kmFare: first2kmFare,
            next200mOr1minFare: next200mOr1min.fare,
            next200mOr1minDiscountFare: next200mOr1min.discountFare,
            discountFareThreshold: discountFareThreshold,
        })
    }

    return {
        status: "success",
        asOfDate: asOfDate,

        // these must exist
        urban: map.get("urban")!,
        newTerritories: map.get("newTerritories")!,
        lantau: map.get("lantau")!,
    }
}