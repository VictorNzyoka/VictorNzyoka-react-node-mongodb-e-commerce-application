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
                url: `/${email}`, 
                method: 'GET',
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
            query: ({ page = 1, limit = 10, sort = "-createdAt" }) => {
              const params = new URLSearchParams({
                page:page.toString(),
                limit:limit.toString(),
                sort,

              });          
              return {
                url: `/?${params.toString()}`,
                method: "GET",
              };
            },
            providesTags: ['Orders']
          }),
          updateOrderStatus: builder.mutation({
            query: ({ id, status }) => ({
              url: `/update-order-status/${id}`,
              method: 'PATCH',
              body: { status }, 
            }),
            invalidatesTags: ['Orders'],
          }),
        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `/delete-order/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Orders'],
        }),
        checkoutOrder: builder.mutation({

        query: (orderData) => ({
            url: '/checkout',
            method: 'POST',
            body: orderData,
        })
        })
    })
});

export const { useGetOrdersByEmailQuery,useGetOrderByIdQuery,useGetAllOrdersQuery ,useDeleteOrderMutation,useUpdateOrderStatusMutation,
    useCheckoutOrderMutation
} = orderApi;
export default orderApi;