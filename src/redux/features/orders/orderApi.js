import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/baseUrl";

const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/orders`,
        credentials: 'include' 
    }),
    tagTypes: ["Orders"], 
    endpoints: (builder) => ({
        getOrdersByEmail: builder.query({
            query: (email) => ({
                url: '/', 
                method: 'GET',
                params: { email } 
            })
        }),
        getOrderById: builder.query({
            query : (orderId) => ({
                url: `/order/${orderId}`,
                method: 'GET'
            }),
            providesTags: ['Order']
        })
    })
});

export const { useGetOrdersByEmailQuery,useGetOrderByIdQuery } = orderApi;
export default orderApi;