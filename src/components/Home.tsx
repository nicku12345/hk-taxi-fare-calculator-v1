import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";


export const Home: React.FC = () => {
    const fareRuleState = useSelector((state: RootState) => state.fareRule)
    if (fareRuleState.status !== "success") {
        return null
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <p className="mb-4">
                Welcome to the Taxi Fare Breakdown Calculator! This app allows you to calculate taxi fares in Hong Kong
                based on the latest data from the Transport Department.
            </p>
            <p className="mb-4">
                The latest fare information is fetched directly from the government website, ensuring that you have the
                most up-to-date rates at your fingertips.
            </p>
            <p className="mb-4">
                For more details, visit the official <a 
                    href="https://www.td.gov.hk/en/transport_in_hong_kong/public_transport/taxi/taxi_fare_of_hong_kong/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                >
                    source
                </a>
            </p>
            <p className="font-semibold">
                Latest data as of: <span className="font-normal">{fareRuleState.asOfDate}</span>
            </p>
            {
                [
                    { desc: "Urban Taxi", rule: fareRuleState.urban },
                    { desc: "New Territories Taxi", rule: fareRuleState.newTerritories },
                    { desc: "Lantau Taxi", rule: fareRuleState.lantau },
                ].map(({ desc, rule }) => (
                    <table key={desc} className="mt-6 min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="py-2 px-4 border-b">{desc}</th>
                                <th className="py-2 px-4 border-b">Amount (HK$)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-2 px-4 border-b">First 2 kilometres or any part thereof</td>
                                <td className="py-2 px-4 border-b">${rule.first2kmFare}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b">Every subsequent 200 metres or part thereof, or every period of 1 minute waiting time or part thereof until the chargeable amount reaches ${rule.discountFareThreshold}</td>
                                <td className="py-2 px-4 border-b">${rule.next200mOr1minFare}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b">After the chargeable amount has reached ${rule.discountFareThreshold}</td>
                                <td className="py-2 px-4 border-b">${rule.next200mOr1minDiscountFare}</td>
                            </tr>
                        </tbody>
                    </table>
                ))
            }
        </div>
    )
}