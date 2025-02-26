import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";
import { Menu } from "lucide-react"; // Import a menu icon

const navItems = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/dashboard/orders", label: "Orders" },
    { path: "/dashboard/payments", label: "Payment" },
    { path: "/dashboard/profile", label: "Profile" },
    { path: "/dashboard/reviews", label: "Reviews" },
];

const UserDashboard = () => {
    const [logoutUser] = useLogoutUserMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility

    const handleLogout = async () => {
        try {
            await logoutUser().unwrap();
            dispatch(logout());
            alert("Logout successfully");
        } catch (error) {
            console.error("Error logging out", error);
        }
        navigate("/");
    };

    return (
        <>
            {/* Menu Icon for Small Screens */}
            <div className="sm:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 bg-primary text-white rounded-lg"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } sm:translate-x-0 fixed sm:static inset-y-0 left-0 w-64 bg-white p-8 space-y-5 transition-transform duration-300 ease-in-out z-40`}
            >
                <div>
                    <div className="nav__logo">
                        <Link to="/">Shopless<span>.</span></Link>
                        <p className="text-xs italic">User Dashboard</p>
                    </div>
                    <hr className="mt-5" />
                    <ul className="space-y-5 pt-5">
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-blue-600 font-bold"
                                            : "text-black"
                                    }
                                    end
                                    to={item.path}
                                    onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mb-3">
                    <hr className="mb-3" />
                    <button
                        onClick={handleLogout}
                        className="text-white bg-primary font-medium px-5 py-1 rounded-sm"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Overlay for Small Screens */}
            {isSidebarOpen && (
                <div
                    className="sm:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={() => setIsSidebarOpen(false)} // Close sidebar when clicking outside
                ></div>
            )}
        </>
    );
};

export default UserDashboard;