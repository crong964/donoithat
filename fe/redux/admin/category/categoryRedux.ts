
import { IProductClassification, IProductVariant } from '@/components/admin/product/interface'
import { iCateGory } from '@/components/category/interface'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface categoryState {
    categoryItem: iCateGory[],
    action: "add" | "edit",
    i: number
    mainCategory: iCateGory
}

const initialState: categoryState = {
    categoryItem: [{ id: "", nameCategory: "", slug: "" }],
    mainCategory: {
        id: "",
        nameCategory: "",
        slug: "",
        categoryId: "",
        categoryImage: ""
    },
    action: "add",
    i: -1
}

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategory: (state, action: PayloadAction<{
            categoryItem: iCateGory[],
            mainCategory: iCateGory
        }>) => {
            state.categoryItem = action.payload.categoryItem
            state.mainCategory = action.payload.mainCategory
        },
        setIdEdit: (state, action: PayloadAction<{
            index: number,
            categoryItem: iCateGory[],
            mainCategory: iCateGory
        }>) => {
            state.i = action.payload.index
            state.action = 'edit'
            state.categoryItem = action.payload.categoryItem
            state.mainCategory = action.payload.mainCategory
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