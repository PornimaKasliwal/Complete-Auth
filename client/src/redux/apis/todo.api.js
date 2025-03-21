import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const todoApi = createApi({
    reducerPath: "todoApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/todo",
        credentials: "include"
    }),
    tagTypes: ["todo"],
    endpoints: (builder) => {
        return {
            getTodos: builder.query({
                query: () => {
                    return {
                        url: "/",
                        method: "GET"
                    }
                },
                providesTags: ["todo"]
            }),
            addTodo: builder.mutation({
                query: todoData => {
                    return {
                        url: "/create",
                        method: "POST",
                        body: todoData
                    }
                },
                invalidatesTags: ["todo"]
            }),

            updateTodo: builder.mutation({
                query: todoData => {
                    return {
                        url: "/modify/" + todoData._id,
                        method: "PATCH",
                        body: todoData
                    }
                },
                invalidatesTags: ["todo"]
            }),

            deleteTodo: builder.mutation({
                query: _id => {
                    return {
                        url: "/remove/" + _id,
                        method: "DELETE",

                    }
                },
                invalidatesTags: ["todo"]
            }),

        }
    }
})

export const {
    useAddTodoMutation,
    useDeleteTodoMutation,
    useGetTodosQuery,
    useUpdateTodoMutation
} = todoApi
