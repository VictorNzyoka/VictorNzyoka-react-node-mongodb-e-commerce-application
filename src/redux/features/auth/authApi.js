 import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { getBaseUrl } from "../../../utils/baseUrl";

 const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/auth`,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (newUser) => ({
                url: "/register",
                method: "POST",
                body: newUser
            })
        }),
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: "/login",
                method: "POST",
                body: credentials
            })
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "POST",
            })
        }),
        getUser: builder.mutation({
            query: () => ({
                url: "/users",
                method: "GET",
            }),
            refetchOnMount:true,
            invalidatesTags: ["Users"],
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Users"],
        }),
        updateUser: builder.mutation({
            query: ({userId,role}) => ({
                url: `/users/${userId}`,
                method: "PUT",
                body: {role}
            }),
            invalidatesTags: ["Users"],
        }),
        editRole: builder.mutation({
            query: ({userData}) => ({
                url: `/edit-profile`,
                method: "PATCH",
                body: {userData}
            })
        }),
    })
 })


 export const {useRegisterUserMutation,useLoginUserMutation,useLogoutUserMutation,useGetUserMutation,useDeleteUserMutation,
    useEditRoleMutation,useUpdateUserMutation
 } = authApi;
 export default authApi;