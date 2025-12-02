import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Home from './Components/Home';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';

// Admin Components
import Ahome from './Admin/Ahome';
import Alogin from './Admin/Alogin';
import Asignup from './Admin/Asignup';
import Seller from './Admin/Seller';
import Users from './Admin/Users';
import Items from './Admin/items';
import Anavbar from './Admin/Anavbar';
import UserEdit from './Admin/UserEdit';
import UserAdd from './Admin/UserAdd';
import SellerEdit from './Admin/SellerEdit';
import SellerAdd from './Admin/SellerAdd';
import AdminOrders from './Admin/Orders';

// Seller Components
import Shome from './Seller/Shome';
import Slogin from './Seller/Slogin';
import Ssignup from './Seller/Ssignup';
import MyProducts from './Seller/MyProducts';
import Orders from './Seller/Orders';
import Addbook from './Seller/Addbook';
import Snavbar from './Seller/Snavbar';
import SellerProfile from './Seller/Profile';

// User Components
import Uhome from './User/Uhome';
import Login from './User/Login';
import Signup from './User/Signup';
import Products from './User/Products';
import MyOrders from './User/MyOrders';
import Uitem from './User/Uitem';
import Cart from './User/Cart';
import Wishlist from './User/Wishlist';
import Profile from './User/Profile';
import PlaceOrder from './User/PlaceOrder';

const UserLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const AdminLayout = () => (
  <>
    <Anavbar />
    <Outlet />
  </>
);

const SellerLayout = () => (
  <>
    <Snavbar />
    <Outlet />
  </>
);

function App() {
  return (
    <div className="app">
      <Routes>
        {/* User Routes with Navbar */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/user/home" element={<Uhome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/products" element={<Products />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/book/:id" element={<Uitem />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/place-order" element={<PlaceOrder />} />
        </Route>

        {/* Admin Routes with Anavbar */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/home" element={<Ahome />} />
          <Route path="/admin/login" element={<Alogin />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/users/add" element={<UserAdd />} />
          <Route path="/admin/user/:id/edit" element={<UserEdit />} />
          <Route path="/admin/sellers" element={<Seller />} />
          <Route path="/admin/sellers/add" element={<SellerAdd />} />
          <Route path="/admin/seller/:id/edit" element={<SellerEdit />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/items" element={<Items />} />
        </Route>

        {/* Seller Auth Routes (No Sidebar) */}
        <Route path="/seller/login" element={<Slogin />} />
        <Route path="/seller/signup" element={<Ssignup />} />

        {/* Seller Routes with Snavbar */}
        <Route element={<SellerLayout />}>
          <Route path="/seller/home" element={<Shome />} />
          <Route path="/seller/products" element={<MyProducts />} />
          <Route path="/seller/orders" element={<Orders />} />
          <Route path="/seller/add-book" element={<Addbook />} />
          <Route path="/seller/update-book/:id" element={<Addbook />} />
          <Route path="/seller/profile" element={<SellerProfile />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
