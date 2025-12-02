import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AdminSidebar from './AdminSidebar';

const AdminLayout = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div className="loader">Loading...</div>;
    }

    if (!user || !user.isAdmin) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="admin-layout">
            <AdminSidebar />
            <div className="admin-content">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
