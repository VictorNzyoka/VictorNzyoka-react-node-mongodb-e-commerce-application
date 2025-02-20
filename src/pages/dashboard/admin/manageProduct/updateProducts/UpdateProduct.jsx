"use client"

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useFetchProductByIdQuery, useUpdateProductMutation } from "../../../../../redux/features/products/productsApi"
import { useSelector } from "react-redux"
import UploadImage from "./UploadImage"
import TextInput from "../../addProduct/TextInput"
import SelectInput from "../../addProduct/SelectInput"

const categories = [
  { label: 'Select Category', value: ''},
  { label: 'Accessories', value: 'accessories'},
  { label: 'Jewellery', value: 'jewellery'},
  { label: 'Dress', value: 'dress'},
  { label: 'Cosmetics', value: 'cosmetics'},
  { label: 'Ski Care', value: 'skin-care'},
]
const colors = [
  { label: 'Select Color', value: ''},
  { label: 'Black', value: 'black'},
  { label: 'Red', value: 'red'},
  { label: 'Gold', value: 'gold'},
  { label: 'Blue', value: 'Blue'},
  { label: 'Silver', value: 'silver'},
  { label: 'Green', value: 'Green'},
  { label: 'Biege', value: 'biege'},
]
const UpdateProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const [product, setProduct] = useState({
    name: "",
    category: "",
    color: "",
    price: "",
    description: "",
    image: "",
  })

  const { data: productData, isLoading: isProductLoading, error: fetchError, refetch } = useFetchProductByIdQuery(id)

  const [newImage, setNewImage] = useState(null)

  const [updateProduct, { isLoading: isUpdating, error: updateError }] = useUpdateProductMutation()

  useEffect(() => {
    if (productData?.product) {
      const { name, category, color, description, image, price } = productData.product
      setProduct({
        name: name || "",
        category: category || "",
        color: color || "",
        price: price || "",
        description: description || "",
        image: image || "",
      })
    }
  }, [productData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct({
      ...product,
      [name]: value,
    })
  }

  const handleImageChange = (image) => {
    setNewImage(image)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const updatedProduct = {
      ...product,
      image: newImage ? newImage : product.image,
      author: user?._id,
    }

    try {
      await updateProduct({ id: id, ...updatedProduct }).unwrap()
      alert("Product updated successfully")
      navigate("/dashboard/manage-products")
    } catch (error) {
      console.log("Error updating product", error)
    }
  }

  if (isProductLoading) {
    return <div className="text-center mt-8">Loading...</div>
  }

  if (fetchError) {
    return <div className="text-center text-red-500 mt-8">Error fetching product details. Please try again later.</div>
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Update Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
      <TextInput
            label="Product Name"
            name="name"
            value={product.name}
            onChange={handleChange}
            type="text"
            placeholder="Product Name"/>
            <SelectInput
             label="Category"
             name="category"
             value={product.category}
             onChange={handleChange}
             options={categories}
             />
             <SelectInput
             label="Colors"
             name="color"
             value={product.color}
             onChange={handleChange}
             options={colors}
             />
             <TextInput
            label="Price"
            name="price"
            value={product.price}
            onChange={handleChange}
            type="number"
            placeholder="Ksh 500"/>
            <UploadImage
            name="image"
            id="image"
            value={product.image}
            placeholder="Upload product image"
            setImage={handleImageChange}
            />
            <div>
                <label htmlFor="description" className='block text-sm font-medium
                text-gray-700'>Description</label>
                <textarea name="description" id="description"
                className='add-product-InputCSS'
                value={product.description}
                placeholder='Write a product Description'
                onChange={handleChange}></textarea>

            </div>
        {updateError && <div className="text-red-500 text-sm">Failed to update product. Please try again.</div>}
        <button
          type="submit"
          disabled={isUpdating}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isUpdating ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  )
}

export default UpdateProduct

