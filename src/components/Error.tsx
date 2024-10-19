import React from "react";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";

export const Error: React.FC = () => {
    const fareRuleState = useSelector((state: RootState) => state.fareRule)

    if (fareRuleState.status === "loading") {
        return (
            <div>Loading data...</div>
        )
    }

    if (fareRuleState.status === "error") {
        return (
            <div className="flex items-center justify-between p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-md m-[5px]">
                <span className="font-semibold">
                    Something went wrong... {fareRuleState.message}
                </span>
                <button className="ml-4 text-red-700 hover:text-red-900" onClick={() => location.reload()}>
                    Refresh
                </button>
            </div>
        )
    }
}