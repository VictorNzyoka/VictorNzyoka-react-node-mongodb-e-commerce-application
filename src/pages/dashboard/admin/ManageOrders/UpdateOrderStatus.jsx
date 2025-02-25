"use client"

import { useState } from "react"
import PropTypes from "prop-types"
import { useUpdateOrderStatusMutation } from "../../../../redux/features/orders/orderApi"
import { X } from "lucide-react"

const UpdateOrderStatus = ({ order, onClose, onStatusUpdate }) => {
  const [status, setStatus] = useState(order?.status || "")
  const [updateOrderStatus, { isLoading }] = useUpdateOrderStatusMutation()

  const handleUpdateStatus = async () => {
    if (!order?._id) {
      console.error("Order ID is missing");
      return;
    }
  
    try {
      await updateOrderStatus({ id: order._id, status }).unwrap();
      onStatusUpdate();
      onClose(); 
    } catch (error) {
      console.error("Failed to update order status:", error);
      alert("Failed to update order status. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Edit Order Status</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="mb-4">
          <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-1">
            Order Id
          </label>
          <input
            type="text"
            id="orderId"
            value={order?.orderId || ""}
            readOnly
            className="mt-1 bg-gray-100 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateStatus}
            disabled={isLoading}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Updating..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  )
}


export default UpdateOrderStatus

