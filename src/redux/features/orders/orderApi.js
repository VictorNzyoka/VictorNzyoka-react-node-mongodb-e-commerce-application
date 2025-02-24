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
        }),
        getAllOrders: builder.query({
            query: () => (
                {
                url: '/orders',
                method: 'GET',
            }
        ),
        providesTags: ['Order']
        }),
        updateOrderStatus: builder.mutation({
            query: ({id,status}) => ({
                url: `/update-order-status/${id}`,
                method: 'PATCH',
                body: {status},
            }),
            invalidatesTags: ['Orders']
        }),
        deleteOrder: builder.mutation({
            query: ({id}) => ({
                url: `/delete-order/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Orders'],
        }),
        checkoutOrder: builder.mutation({

        query: () => ({
            url: '/checkout',
            method: 'POST'
        })
        })
    })
});

export const { useGetOrdersByEmailQuery,useGetOrderByIdQuery,useGetAllOrdersQuery ,useDeleteOrderMutation,useUpdateOrderStatusMutation,
    useCheckoutOrderMutation
} = orderApi;
export default orderApi;