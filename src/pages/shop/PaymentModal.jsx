"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { useCheckoutOrderMutation } from "../../redux/features/orders/orderApi"

const PaymentModal = ({ user, amount, products, onClose }) => {
  const [checkoutOrder] = useCheckoutOrderMutation()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "")
    setPhoneNumber(value)
    setError("")
  }

  const userId = user?._id
  const email = user?.email

  const handleSubmit = async () => {
    if (phoneNumber.length < 10) {
      setError("Please enter a valid phone number")
      return
    }

    setIsLoading(true)
    try {
      // Transform the products array to include only productId and quantity
      const transformedProducts = products.map(product => ({
        productId: product._id, 
        quantity: product.quantity
      }))

      // Format the amount to two decimal places
      const formattedAmount = parseFloat(amount.toFixed(0))

      // Send the data to the backend
      await checkoutOrder({
        userId,
        email,
        phoneNumber,
        amount: formattedAmount, // Send the formatted amount
        products: transformedProducts // Send the transformed products array
      }).unwrap()

      alert("Payment completed successfully")
      onClose()
    } catch (err) {
      setError("An error occurred during checkout")
      console.error("Checkout Error:", err) 
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Make Payment</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={user?.email}
            readOnly
            className="mt-1 bg-gray-100 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            placeholder="Enter your phone number"
            className="mt-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            maxLength={15}
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount to Pay</label>
          <p className="text-lg font-semibold">Ksh {amount.toFixed(2)}</p>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading || phoneNumber.length < 10}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentModal