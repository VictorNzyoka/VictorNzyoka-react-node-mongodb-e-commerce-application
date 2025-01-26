import React from "react"
import { X } from "lucide-react"
import OrderSummary from "./OrderSummary"
import { useDispatch } from "react-redux"
import { updateQuantity } from "../../redux/features/cart/cartSlice"

const CartModal = ({ products, isOpen, onClose }) => {
  const dispatch = useDispatch();

  const handleQuantity = (type,id) => {
    const payload = {type,id}
    dispatch(updateQuantity(payload))
  }
  return (
    <div
      className={`fixed z-[1000] inset-0 bg-black bg-opacity-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ transition: "opacity 300ms" }}
    >
      <div
        className={`fixed right-0 top-0 md:w-1/3 w-full bg-white h-full overflow-y-auto
        transition-transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{ transition: "transform 300ms cubic-bezier(0.25,0.46,0.45,0.94)" }}
      >
        <div className="p-4 mt-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl font-semibold">Shopping Cart</h4>
            <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
              <X className="bg-black p-1 text-white" />
            </button>
          </div>
          <div className="cart-items">
            {products.length === 0 ? (
              <div>Your cart is empty</div>
            ) : (
              products.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row 
                  md:items-center md:justify-between shadow-md md:p-5 p-2 mb-4"
                >
                  <div className="flex items-center">
                    <span
                      className="mr-4 px-1 bg-primary text-white
                      rounded-full"
                    >
                      {index + 1}
                    </span>
                    <img src={item.image || "/placeholder.svg"} alt={item.name} className="size-12 object-cover mr-4" />
                    <div>
                      <h5 className="text-lg font-medium">{item.name}</h5>
                      <p className="text-gray-600 text-sm">Ksh{Number(item.price).toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center mt-2 md:mt-0">
                    <div className="flex items-center">
                      <button
                      onClick={() => handleQuantity('decrement',item.id)}
                        className="size-6 flex items-center justify-center px-1.5 rounded-full
                        bg-gray-200 text-gray-700 hover:bg-primary hover:text-white"
                      >
                        -
                      </button>
                      <span className="px-2 item-center mx-1">{item.quantity}</span>
                      <button
                       onClick={() => handleQuantity('increment',item.id)}
                        className="size-6 flex items-center justify-center px-1.5 rounded-full
                        bg-gray-200 text-gray-700 hover:bg-primary hover:text-white"
                      >
                        +
                      </button>
                    </div>
                    <div className="ml-5 mt-2 md:mt-0">
                      <button className="text-red-500 hover:text-red-800">Remove</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {products.length > 0 && <OrderSummary />}
        </div>
      </div>
    </div>
  )
}

export default CartModal

