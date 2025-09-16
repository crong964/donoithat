'use client'

import { store } from "@/redux/admin/reduxRoot"
import { Provider } from 'react-redux'

import React from "react"
import { SidebarProvider } from "../ui/sidebar"

export default function ReduxComponent(p: { children: React.JSX.Element }) {
    return (
        <Provider store={store}>
            <SidebarProvider>
                {p.children}
            </SidebarProvider>
        </Provider>
    )
}