import React from "react";
import { Form } from "./Form";
import { Fare } from "./Fare";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Home } from "./Home";

export enum TabId {
    Home,
    Calculate,
}

export interface TabProps {
    id: TabId
}

export const Tab: React.FC = () => {
    const tabState = useSelector((state: RootState) => state.tab)

    switch (tabState.id) {
        case TabId.Home:
            return (
                <div>
                    <Home/>
                </div>
            )
        case TabId.Calculate:
            return (
                <div>
                    <Form/>
                    <Fare/>
                </div>
            )
    }
}