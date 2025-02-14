import React, { useState } from 'react'

const UploadImage = ({name,value,placeholder,setImage}) => {
    const [Loading, setLoading] = useState(false);
    const [url,setUrl] = useState("");
    const UploadImage = async() =>{


    }
  return (
    <div>
      <label htmlFor={name}>Upload Image</label>
      <input type="file" 
      name={name}
      id={name}
      onChange={UploadImage}
      className="add-product-InputCSS" />
      {
        Loading && (
            <div className='mt-2 text-sm text-blue-600'>Uplaoding....</div>
        )
      }
      {
        url && (
            <div className='mt-2 text-sm text-green-600'>
                <p>Image uploaded successfully</p>
                <img src={url} alt="Uploaded Image" />
            </div>
        )
      }
        
    </div>
  )
}

export default UploadImage
