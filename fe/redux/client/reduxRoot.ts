import { configureStore } from '@reduxjs/toolkit'
import productRedux from '../admin/product/productRedux'


export const store = configureStore({
    reducer: {
        product: productRedux,
    },

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch