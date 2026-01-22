import { iProductVariantSearch } from "@/components/variant/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface iPermissionState {
  permission: string;
  role: string;
}

const initialState: iPermissionState = {
  permission: "",
  role: "",
};

export const permissionSlice = createSlice({
  initialState: initialState,
  name: "inventory",
  reducers: {
    setPermission: (state, payload: PayloadAction<string>) => {
      state.permission = payload.payload;
    },
    setRole: (state, payload: PayloadAction<string>) => {
      state.role = payload.payload;
    },
  },
});

export const { setPermission, setRole } = permissionSlice.actions;

export default permissionSlice.reducer;
