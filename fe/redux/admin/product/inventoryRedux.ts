import { iProductVariantSearch } from "@/components/variant/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface iInventoryState {
    inventorys: Record<string, { data: iProductVariantSearch, selected: boolean, variantId: string } | undefined>
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
                selected: false,
                variantId: ""
            }
        },
        removeInventory: (state, action: PayloadAction<string>) => {
            state.inventorys[action.payload] = undefined
        },
        selectInventory: (state, action: PayloadAction<{ productVariantId: string, variantId: string }>) => {
            let data = state.inventorys[action.payload.productVariantId]
            if (data) {
                state.inventorys[action.payload.productVariantId] = {
                    data: data.data,
                    selected: true,
                    variantId: action.payload.variantId
                }
            }
        },
        cancelSelectInventory: (state, action: PayloadAction<string>) => {
            let data = state.inventorys[action.payload]
            if (data) {
                state.inventorys[action.payload] = {
                    data: data.data,
                    selected: false,
                    variantId: ""
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