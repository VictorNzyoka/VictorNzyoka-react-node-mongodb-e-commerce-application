"use client"
import { useSelector } from "react-redux"
import { useGetOrdersByEmailQuery } from "../../../redux/features/orders/orderApi"
import { formatDate } from "../../../utils/formatDate"
import { Loader2 } from "lucide-react"
import { Link } from "react-router-dom"


const UserOrders = () => {
  const { user } = useSelector((state) => state.auth)
  const { data: orders, error, isLoading } = useGetOrdersByEmailQuery(user?.email)
  console.log(orders)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 bg-white">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4 bg-white">
        An error occurred while fetching orders. Please try again later.
      </div>
    )
  }

  if (!orders || orders.length === 0) {
    return <div className="text-center p-4 bg-white">No orders found</div>
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Your Orders</h2>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 sm:px-6">
                  #
                </th>
                <th scope="col" className="px-4 py-3 sm:px-6">
                  Order ID
                </th>
                <th scope="col" className="px-4 py-3 sm:px-6">
                  Date
                </th>
                <th scope="col" className="px-4 py-3 sm:px-6">
                  Status
                </th>
                <th scope="col" className="px-4 py-3 sm:px-6">
                  Total
                </th>
                <th scope="col" className="px-4 py-3 sm:px-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-4 py-4 sm:px-6">{index + 1}</td>
                  <td className="px-4 py-4 sm:px-6 font-medium text-gray-900 whitespace-nowrap">{order._id}</td>
                  <td className="px-4 py-4 sm:px-6">{formatDate(order.createdAt)}</td>
                  <td className="px-4 py-4 sm:px-6">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : order.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 sm:px-6">${order?.amount?.toFixed(2) ?? "0.00"}</td>
                  <td className="px-4 py-4 sm:px-6">
                    <Link to={`/orders/${order?._id}`} className="font-medium text-blue-600 hover:underline">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default UserOrders

