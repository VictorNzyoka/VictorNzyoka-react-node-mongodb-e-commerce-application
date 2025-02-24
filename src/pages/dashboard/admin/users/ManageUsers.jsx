"use client"

import { useState } from "react"
import { useDeleteUserMutation, useGetUserQuery } from "../../../../redux/features/auth/authApi"
import { Link } from "react-router-dom"
import { Loader2, Pencil, Trash2 } from "lucide-react"
import UpdateUserModal from "./UpdateUserModal"

const ManageUsers = () => {
    const[isModalOpen,setIsModalOpen]= useState(false);

  const { data: users = [], isLoading, error, refetch } = useGetUserQuery()
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation()
  const [selectedUser, setSelectedUser] = useState(null)


  const handleDelete = async (id) => {
     try {
      const response = await deleteProduct(id).unwrap();
      alert("User deleted successfully")
       await refetch()
    } catch (error) {
      console.log('Error deleting user',error)
    }
  
  }
  const handleEdit = (user) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }
  const handleCloseModal =()=>{
    setIsModalOpen(false)
    setSelectedUser(null)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">Error loading users: {error.message}</div>
  }

  return (
    <>
    <section className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Users</h1>
        <button
          onClick={refetch}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
        >
          Refresh
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                No.
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                User Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                User Role
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email || "N/A"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === "admin" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {user.role || "N/A"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => handleEdit (user)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"><i className="ri-pencil-line"></i></button>
                    <button
                      onClick={() => handleDelete(user?._id)}
                      className="text-red-600 hover:text-red-900"
                      disabled={isDeleting && deleteUserId === user?._id}
                    >
                      {isDeleting && deleteUserId === user?._id ? (
                        <Loader2 className="w-5 h-5 inline-block animate-spin" />
                      ) : (
                        <Trash2 className="w-5 h-5 inline-block" />
                      )}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
    {
        isModalOpen && <UpdateUserModal user={selectedUser} onClose={handleCloseModal}
        onRoleUpdate={refetch()}/>
    }
    </>
  )
}

export default ManageUsers

