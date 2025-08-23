
import { IProductClassification, IProductVariant } from '@/components/admin/product/interface'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface mediaLibraryState {
    open: boolean
}

const initialState: mediaLibraryState = {
    open: false
}

export const mediaLibrarySlice = createSlice({
    name: 'mediaLibrary',
    initialState,
    reducers: {
        setOpen: (state, action: PayloadAction<boolean>) => {
            state.open = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    setOpen
} = mediaLibrarySlice.actions

export default mediaLibrarySlice.reducer