import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEditRoleMutation } from '../../../redux/features/auth/authApi';

import avatarImg from '../../../assets/avatar.png';
import { setUser } from '../../../redux/features/auth/authSlice';

const UserProfile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    // console.log(user)
    const [editProfile, { isLoading, isError, error, isSuccess }] = useEditRoleMutation();

    const [formData, setFormData] = useState({
        username: '',
        profileImage: '',
        bio: '',
        profession: '',
        userId: '',
        phone: ''
    });
    // console.log(formData)
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                username: user?.username || '',
                profileImage: user?.profileImage || '',
                bio: user?.bio || '',
                profession: user?.profession || '',
                userId: user?._id || '',
                phone: user?.phone
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updateUser = {
            username: formData.username,
            profileImage: formData.profileImage,
            bio: formData.bio,
            profession: formData.profession,
            userId: formData.userId,
            phone: formData.phone 
        };
        // console.log(updateUser)
    
        try {
            const response = await editProfile(updateUser).unwrap();
            dispatch(setUser(response.user));
            localStorage.setItem("user", JSON.stringify(response.user));
            alert('Profile updated successfully!');
        } catch (error) {
            console.error("Failed to update profile", error);
            alert("Failed to upload the profile. Please try again");
        }
        setIsModalOpen(false);
    };

    return (
        <div className='container mx-auto p-6'>
            <div className='bg-white shadow-md rounded-lg p-6'>
                <div className='flex items-center mb-4'>
                    <img src={formData.profileImage || avatarImg} alt="" className='w-32 h-32 object-cover rounded-full' />
                    <div className='ml-6'>
                        <h3 className='text-2xl font-semibold'>UserName: {formData.username || 'N/A'}</h3>
                        <p className='text-gray-700'>Bio: {formData.bio || 'N/A'}</p>
                        <p className='text-gray-700'>Profession: {formData.profession || 'N/A'}</p>
                    </div>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className='ml-auto text-blue-500 hover:text-blue-700'>
                        <i className="ri-pencil-line size-8"></i>
                    </button>
                </div>
            </div>
            {isModalOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                    <div className='bg-white p-6 rounded-lg md:w-96 max-w-xl mx-auto relative'>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
                        >
                            <i className="ri-close-line size-8 bg-gray-200 rounded-full p-1"></i>
                        </button>
                        <h2 className='text-2xl font-bold mb-4'>Edit Profile</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-4'>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div className='mb-4'>
                                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                                <textarea
                                    id="bio"
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    rows="3"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                ></textarea>
                            </div>
                            <div className='mb-4'>
                                <label htmlFor="profession" className="block text-sm font-medium text-gray-700">Profession</label>
                                <input
                                    type="text"
                                    id="profession"
                                    name="profession"
                                    value={formData.profession}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div className='mb-4'>
                                <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">Profile Image URL</label>
                                <input
                                    type="text"
                                    id="profileImage"
                                    name="profileImage"
                                    value={formData.profileImage}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Updating...' : 'Update Profile'}
                            </button>
                        </form>
                        {isError && <p className="text-red-500 mt-2">{error?.data?.message || 'An error occurred'}</p>}
                        {isSuccess && <p className="text-green-500 mt-2">Profile updated successfully!</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;