import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { getBaseUrl } from "../../../utils/baseUrl";

 export const reviewApi = createApi({
    reducerPath: 'reviewApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/reviews`,
        credentials: 'include',
    }),
    tagTypes: ["Reviews"],
    endpoints: (builder) => ({
        postReview: builder.mutation({
            query: (reviewData) =>({
                url: "/post-review",
                method: "POST",
                body: reviewData
            }),
            invalidatesTags: (result,error, {postId}) => [{type: "Reviews", id: postId}]
        }),
        getReviewsCount: builder.query({
            query: () => ({
                url: "/total-reviews"
            })
        }),
        getReviewsByUserId: builder.query({
            query: (userId) => ({
                url: `/${userId}`
            }),
            probidesTags: (results) => results ? [{type: "Reviews", id: results[0]?.email }] : []
        })
    })
})

export const {usePostReviewMutation,useGetReviwsCountQuery, useGetReviewsByUserIdQuery} = reviewApi;

export default reviewApi;