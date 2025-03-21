import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../apis/auth.api";

const authSlice = createSlice({
    name: "authSlice",
    initialState: { admin: JSON.parse(localStorage.getItem("admin")) },
    reducers: {
        invalidate: (state, { payload }) => {
            payload.forEach(item => {
                state[item] = false
            })
        }
    },
    extraReducers: builder => builder
        .addMatcher(authApi.endpoints.signin.matchFulfilled, (state, { payload }) => {
            state.admin = payload
        })
        .addMatcher(authApi.endpoints.signout.matchFulfilled, (state, { payload }) => {
            state.admin = null
        })


})

export const { invalidate } = authSlice.actions
export default authSlice.reducer