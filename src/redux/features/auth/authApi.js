 import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { getBaseUrl } from "../../../utils/baseUrl";

 const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/auth`,
        credentials: 'include',
    }),
    tagTypes: ["User"],
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
        getUser: builder.query({
            query: () => ({
                url: "/users",
                method: "GET",
            }),
            refetchOnMount:true,
            invalidatesTags: ["User"],
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `/user/${userId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["User"],
        }),
        updateUser: builder.mutation({
            query: ({userId,role}) => ({
                url: `/users/${userId}`,
                method: "PUT",
                body: {role}
            }),
            invalidatesTags: ["User"],
        }),
        editRole: builder.mutation({
            query: (userData) => ({
                url: `/edit-profile`,
                method: "PATCH",
                body: userData
            })
        }),
    })
 })


 export const {useRegisterUserMutation,useLoginUserMutation,useLogoutUserMutation,useGetUserQuery,useDeleteUserMutation,
    useEditRoleMutation,useUpdateUserMutation
 } = authApi;
 export default authApi;