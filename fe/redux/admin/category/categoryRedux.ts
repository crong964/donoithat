
import { IProductClassification, IProductVariant } from '@/components/admin/product/interface'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface categoryState {
    categoryItem: {
        id: string,
        name: string
    }[],
    id: string,
    name: string
    action: "add" | "edit",
    i: number
}

const initialState: categoryState = {
    categoryItem: [{ id: "", name: "" }],
    id: "",
    name: "",
    action: "add",
    i: -1
}

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategory: (state, action: PayloadAction<{
            categoryItem: {
                id: string,
                name: string
            }[],
            id: string,
            name: string
        }>) => {
            state.id = action.payload.id
            state.name = action.payload.name
            state.categoryItem = action.payload.categoryItem
        },
        setIdEdit: (state, action: PayloadAction<number>) => {
            state.i = action.payload
            state.action = 'edit'
        },
        cancelEdit: (state) => {
            state.i = -1
            state.action = 'add'
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    setCategory, setIdEdit, cancelEdit
} = categorySlice.actions

export default categorySlice.reducer