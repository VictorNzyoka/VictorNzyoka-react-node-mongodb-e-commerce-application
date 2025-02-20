"use client"

import { useState } from "react"
import axios from "axios"
import { getBaseUrl } from "../../../../../utils/baseUrl"

const UploadImage = ({ name, value, placeholder, setImage }) => {
  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState("")

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result)
      }
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  const uploadSingleImage = async (base64) => {
    setLoading(true)
    try {
      const response = await axios.post(`${getBaseUrl()}/uploadImage`, { image: base64 })
      const imageUrl = response.data // Changed from res.date to response.data
      setUrl(imageUrl)
      setImage(imageUrl)
      alert("Image uploaded successfully")
    } catch (error) {
      console.error("Error uploading image", error)
      alert("Failed to upload image. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (event) => {
    const files = event.target.files
    if (files.length === 0) return

    try {
      const base64 = await convertBase64(files[0])
      await uploadSingleImage(base64)
    } catch (error) {
      console.error("Error processing image", error)
      alert("Failed to process image. Please try again.")
    }
  }

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        Upload Image
      </label>
      <input
        type="file"
        name={name}
        id={name}
        onChange={handleImageUpload}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-green-50 file:text-green-700
          hover:file:bg-green-100"
      />
      {loading && <div className="text-sm text-blue-600">Uploading...</div>}
      {url && (
        <div className="space-y-2">
          <p className="text-sm text-green-600">Image uploaded successfully</p>
          <img src={url || "/placeholder.svg"} alt="Uploaded" className="max-w-xs rounded-lg shadow-md" />
        </div>
      )}
    </div>
  )
}

export default UploadImage

