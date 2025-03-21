import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
    reducerPath: " authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/auth",
        credentials: "include"
    }),

    endpoints: (builder) => {
        return {
            signup: builder.mutation({
                query: userData => {
                    return {
                        url: "/register",
                        method: "POST",
                        body: userData
                    }
                },


            }),

            signin: builder.mutation({
                query: userData => {
                    return {
                        url: "/login",
                        method: "POST",
                        body: userData
                    }
                },
                transformResponse: data => {
                    localStorage.setItem("admin", JSON.stringify(data.result))
                    return data.result
                }

            }),

            signout: builder.mutation({
                query: userData => {
                    return {
                        url: "/logout",
                        method: "POST",

                    }
                },

                transformResponse: data => {
                    localStorage.removeItem("admin")
                    return data.result
                }
            }),

        }
    }
})

export const {
    useSigninMutation,
    useSignoutMutation,
    useSignupMutation
} = authApi
