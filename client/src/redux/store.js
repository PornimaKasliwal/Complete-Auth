import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./apis/auth.api";
import authSlice from "./slices/authSlice";
import { todoApi } from "./apis/todo.api";


const reduxStore = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [todoApi.reducerPath]: todoApi.reducer,
        auth: authSlice
    },
    middleware: def => [...def(), authApi.middleware, todoApi.middleware]
})

export default reduxStore