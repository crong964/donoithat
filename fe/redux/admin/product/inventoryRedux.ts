import { iProductVariantSearch } from "@/components/variant/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface iInventoryState {
    inventorys: Record<string, { data: iProductVariantSearch, selected: boolean } | undefined>
}

const initialState: iInventoryState = {
    inventorys: {}
}

export const inventorySlice = createSlice({
    initialState: initialState,
    name: "inventory",
    reducers: {
        addInventory: (state, action: PayloadAction<iProductVariantSearch>) => {
            state.inventorys[action.payload.productVariantId] = {
                data: action.payload,
                selected: false
            }
        },
        removeInventory: (state, action: PayloadAction<string>) => {
            state.inventorys[action.payload] = undefined
        },
        selectInventory: (state, action: PayloadAction<string>) => {
            let data = state.inventorys[action.payload]
            if (data) {
                state.inventorys[action.payload] = {
                    data: data.data,
                    selected: true
                }
            }
        },
        cancelSelectInventory: (state, action: PayloadAction<string>) => {
            let data = state.inventorys[action.payload]
            if (data) {
                state.inventorys[action.payload] = {
                    data: data.data,
                    selected: false
                }
            }

        },
    }
})

export const {
    addInventory,
    removeInventory,
    cancelSelectInventory,
    selectInventory } = inventorySlice.actions

export default inventorySlice.reducer