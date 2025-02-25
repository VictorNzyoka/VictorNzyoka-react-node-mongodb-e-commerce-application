import { createBrowserRouter } from 'react-router-dom';
import App from "../App";
import Home from '../pages/Home/Home';
import CategoryPage from '../pages/category/CategoryPage';
import Search from '../pages/search/Search';
import ShopPage from '../pages/shop/ShopPage';
import SingleProduct from '../pages/shop/ProductDetails/SingleProduct';
import { LogIn } from 'lucide-react';
import Login from '../components/Login';
import Register from '../components/Register';
import DashboardLayout from '../pages/dashboard/DashboardLayout';
import PrivateRoute from './PrivateRoute';
import UserMain from '../pages/dashboard/user/dashboard/UserMain';
import UserOrders from '../pages/dashboard/user/UserOrders';
import PaymentSuccess from '../components/PaymentSuccess';
import OrderDetails from '../pages/dashboard/user/OrderDetails';
import UserPayment from '../pages/dashboard/user/UserPayment';
import UserReviews from '../pages/dashboard/user/UserReviews';
import UserProfile from '../pages/dashboard/user/UserProfile';
import AdminMain from '../pages/dashboard/admin/dashboard/AdminMain';
import AddProduct from '../pages/dashboard/admin/addProduct/AddProduct';
import ManageProduct from '../pages/dashboard/admin/manageProduct/ManageProduct';
import UpdateProduct from '../pages/dashboard/admin/manageProduct/updateProducts/UpdateProduct';
import ManageUsers from '../pages/dashboard/admin/users/ManageUsers';
import ManageOrders from '../pages/dashboard/admin/ManageOrders/ManageOrders';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {path: "/",element: <Home/>,},
      {path: "/categories/:categoryName",element: <CategoryPage/>  ,},
      {path: "/search",element: <Search/> },
      {path: "/shop",element: <ShopPage/>  },
      {path: "/shop/:id", element:<SingleProduct/>},
      {
        path: "/success",
        element: <PaymentSuccess/>
      },
      {
        path: "/orders/:orderId",
        element: <OrderDetails/>
      }
    ]
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
  path: "/register",
  element: <Register/>
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout/></PrivateRoute>,
    children: [
      //user routes
      {path:'',element: <UserMain/>},
      {path:'orders',element: <UserOrders/>},
      {path:'payments',element: <UserPayment/>},
      {path:'profile',element: <UserProfile/>},
      {path:'reviews',element: <UserReviews/>},


      //admin routes
      {
        path: "admin" , 
        element: <PrivateRoute role="admin"><AdminMain/></PrivateRoute>
      },
      {
        path: "add-new-product" , 
        element: <PrivateRoute role="admin"><AddProduct/></PrivateRoute>},
      {
        path: "manage-products" , 
        element: <PrivateRoute role="admin"> <ManageProduct/> </PrivateRoute>
      },
      {
        path: "update-product/:id" , 
        element: <PrivateRoute role="admin"> <UpdateProduct/> </PrivateRoute>
      },
      {
        path: "users" , 
        element: <PrivateRoute role="admin"><ManageUsers/></PrivateRoute>
      },
      {
        path: "manage-orders" , 
        element: <PrivateRoute role="admin"><ManageOrders/></PrivateRoute>
      },
    ]
  }
]);

export default router;
