import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BookDetails from './pages/BookDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';

import Wishlist from './pages/Wishlist';
import UserList from './pages/admin/UserList';
import UserEdit from './pages/admin/UserEdit';
import BookList from './pages/admin/BookList';
import BookEdit from './pages/admin/BookEdit';
import AdminLayout from './components/AdminLayout';
import './admin.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/wishlist" element={<Wishlist />} />

          {/* Admin Routes */}
          <Route element={<AdminLayout />}>
            <Route path="/admin/userlist" element={<UserList />} />
            <Route path="/admin/user/:id/edit" element={<UserEdit />} />
            <Route path="/admin/user/new" element={<UserEdit />} />
            <Route path="/admin/booklist" element={<BookList />} />
            <Route path="/admin/book/:id/edit" element={<BookEdit />} />
            <Route path="/admin/book/new" element={<BookEdit />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
