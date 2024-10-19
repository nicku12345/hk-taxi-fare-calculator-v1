import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { RootState } from "../store/store";


export interface FormProps {
    kilometers: number
    minutes: number
    extraFare: number
}

export const Form: React.FC = () => {
    const formState = useSelector((state: RootState) => state.form)
    const dispatch = useDispatch()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        dispatch({
            type: "SET",
            payload: { field: name as keyof FormProps, value: parseFloat(value) }
        })
    }

    return (
        <form className="flex space-x-4 p-4 justify-center">
            <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="kilometers">
                    Paid Kilometer
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
                    type="number"
                    name="kilometers"
                    step="0.01"
                    min="0"
                    value={Number(formState.kilometers).toString()}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="minutes">
                    Paid Minutes
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
                    type="number"
                    name="minutes"
                    step="0.01"
                    min="0"
                    value={Number(formState.minutes).toString()}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="extraFare">
                    Additional Fare
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
                    type="number"
                    name="extraFare"
                    step="1"
                    min="0"
                    value={Number(formState.extraFare).toString()}
                    onChange={handleChange}
                />
            </div>
        </form>
    )
}