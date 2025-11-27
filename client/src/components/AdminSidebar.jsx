import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutList, PlusSquare, LogOut, BookOpen } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const AdminSidebar = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="admin-sidebar">
            <div className="sidebar-header">
                <div className="sidebar-logo">
                    <BookOpen size={24} />
                    <span>Bacala</span>
                </div>
            </div>

            <nav className="sidebar-nav">
                <NavLink to="/admin/book/new" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
                    <PlusSquare size={20} />
                    <span>Add Items</span>
                </NavLink>

                <NavLink to="/admin/booklist" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
                    <LayoutList size={20} />
                    <span>List Items</span>
                </NavLink>


            </nav>

            <div className="sidebar-footer">
                <button onClick={handleLogout} className="sidebar-link logout-btn">
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;
