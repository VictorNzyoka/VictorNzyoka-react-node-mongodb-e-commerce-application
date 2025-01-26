import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  products: [],
  selectedItems: 0,
  totalPrice: 0,
  tax: 0,
  taxRate: 0.05,
  grandTotal: 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.products.find((product) => product.id === action.payload.id)

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.products.push({ ...action.payload, quantity: 1 })
      }

      state.selectedItems = selectedItems(state)
      state.totalPrice = setTotalPrice(state)
      state.tax = setTax(state)
      state.grandTotal = setGrandTotal(state)
    },
    removeFromCart: (state, action) => {
      state.products = state.products.filter((product) => product.id !== action.payload.id)
      state.selectedItems = selectedItems(state)
      state.totalPrice = setTotalPrice(state)
      state.tax = setTax(state)
      state.grandTotal = setGrandTotal(state)
    },
    updateQuantity: (state, action) => {
      const products = state.products.map((product) => {
        if(product._id === action.payload.id){
          if(action.payloadload.type === 'increment'){
            product.quantity += 1;
          }else if(action.payload.type === 'decrement'){
            if(product.quantity > 1){
              product.quantity -= 1
            }
          }
        }
        return product;
      });
      
      state.selectedItems = selectedItems(state)
      state.totalPrice = setTotalPrice(state)
      state.tax = setTax(state)
      state.grandTotal = setGrandTotal(state)
    },
  },
})

export const selectedItems = (state) => state.products.reduce((total, product) => total + product.quantity, 0)

export const setTotalPrice = (state) =>
  state.products.reduce((total, product) => total + product.quantity * product.price, 0)

export const setTax = (state) => setTotalPrice(state) * state.taxRate

export const setGrandTotal = (state) => setTotalPrice(state) + setTax(state)

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions
export default cartSlice.reducer

