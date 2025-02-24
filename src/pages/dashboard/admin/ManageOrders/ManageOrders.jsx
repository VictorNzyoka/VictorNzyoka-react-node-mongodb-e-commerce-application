import React from 'react'
import { useDeleteOrderMutation, useGetAllOrdersQuery, useUpdateOrderStatusMutation } from '../../../../redux/features/orders/orderApi'

const ManageOrders = () => {
    const {data} = useGetAllOrdersQuery();
    const {updateOrderStatus} = useUpdateOrderStatusMutation();
    const {deleteOrder} = useDeleteOrderMutation();
    console.log(data)
  return (
    <div>
      
    </div>
  )
}

export default ManageOrders
