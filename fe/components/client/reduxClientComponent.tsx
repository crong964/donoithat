'use client'

import { store } from "@/redux/client/reduxRoot"
import { Provider } from 'react-redux'

import React from "react"

export default function ReduxClientComponent(p: { children: React.JSX.Element }) {
    return (
        <Provider store={store}>
            {p.children}
        </Provider>
    )
}