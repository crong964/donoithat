import { configureStore } from '@reduxjs/toolkit'
import productRedux from './admin/product/productRedux'
import mediaLibraryRedux from './admin/product/mediaLibraryRedux'
import categoryRedux from './admin/category/categoryRedux'

export const store = configureStore({
    reducer: {
        product: productRedux,
        mediaLibrary: mediaLibraryRedux,
        category: categoryRedux
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredPaths: ['product.imageFiles'],
            }
        }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch