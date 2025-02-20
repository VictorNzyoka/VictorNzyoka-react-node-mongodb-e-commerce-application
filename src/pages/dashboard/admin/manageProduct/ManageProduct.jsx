"use client"

import { useState } from "react"
import { useDeleteProductMutation, useFetchAllProductsQuery } from "../../../../redux/features/products/productsApi"
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

const ManageProduct = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(12)
  const {
    data: { products = [], totalPages, totalProducts } = {},
    isLoading,
    error,
    refetch,
  } = useFetchAllProductsQuery({
    category: "",
    color: "",
    minPrice: "",
    maxPrice: "",
    page: currentPage,
    limit: productsPerPage,
  })

  const startProduct = (currentPage - 1) * productsPerPage + 1
  const endProduct = Math.min(startProduct + products.length - 1, totalProducts)

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    }
  }
  const [deleteProduct] = useDeleteProductMutation()
  const handleDelete = async(id) => {
    try {
      const response = await deleteProduct(id).unwrap();
      alert("Product deleted successfully")
       await refetch()
    } catch (error) {
      console.log('Error deleting product',error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-green-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-8">
        <p>Error loading products. Please try again later.</p>
      </div>
    )
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Manage Products</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Color</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Old Price</th>
              <th className="py-2 px-4 border-b">Rating</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="8" className="py-4 text-center">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">{product.name || "N/A"}</td>
                  <td className="py-2 px-4 border-b">{product.category || "N/A"}</td>
                  <td className="py-2 px-4 border-b">{product.color || "N/A"}</td>
                  <td className="py-2 px-4 border-b">KSH {product.price?.toFixed(2) ?? "0.00"}</td>
                  <td className="py-2 px-4 border-b">KSH {product.oldPrice?.toFixed(2) ?? "0.00"}</td>
                  <td className="py-2 px-4 border-b">{product.rating ?? "N/A"}</td>
                  <td className="py-2 px-4 border-b">
                  <Link to={`/dashboard/update-product/${product._id}`}>
                    <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">
                      Edit
                    </button>
                  </Link>

                    <button 
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Showing {startProduct} to {endProduct} of {totalProducts || 0} products
        </p>
        <div className="flex space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          {totalPages &&
            [...Array(totalPages).keys()].map((page) => (
              <button
                key={page + 1}
                onClick={() => handlePageChange(page + 1)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === page + 1 ? "bg-green-500 text-white" : "bg-gray-200"
                }`}
              >
                {page + 1}
              </button>
            ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default ManageProduct

