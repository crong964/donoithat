import { configureStore } from "@reduxjs/toolkit";
import productRedux from "./product/productRedux";
import mediaLibraryRedux from "./product/mediaLibraryRedux";
import categoryRedux from "./category/categoryRedux";
import inventoryRedux from "./product/inventoryRedux";
import permissionRedux from "./permission/permissionRedux";

export const store = configureStore({
  reducer: {
    product: productRedux,
    mediaLibrary: mediaLibraryRedux,
    category: categoryRedux,
    inventory: inventoryRedux,
    permission: permissionRedux,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["product.imageFiles"],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
