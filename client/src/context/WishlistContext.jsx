import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);
    const { user } = useContext(AuthContext);

    // Load wishlist from backend when user logs in
    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const { data } = await axios.get('/api/user/wishlist', {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setWishlist(data);
            } catch (error) {
                console.error('Failed to fetch wishlist', error);
            }
        };

        if (user) {
            fetchWishlist();
        } else {
            setWishlist([]); // Clear wishlist on logout
        }
    }, [user]);

    const addToWishlist = async (id) => {
        if (!user) {
            alert('Please login to add to wishlist');
            return;
        }
        try {
            await axios.post(`/api/user/wishlist/${id}`, {}, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            // Refresh wishlist after adding
            const { data } = await axios.get('/api/user/wishlist', {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            setWishlist(data);
            alert('Added to wishlist!');
        } catch (error) {
            console.error('Error adding to wishlist:', error);
            alert(error.response?.data?.message || 'Error adding to wishlist');
        }
    };

    const removeFromWishlist = async (id) => {
        if (!user) return;
        try {
            await axios.delete(`/api/user/wishlist/${id}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            setWishlist(wishlist.filter((item) => item._id !== id));
        } catch (error) {
            console.error('Error removing from wishlist:', error);
            alert('Error removing from wishlist');
        }
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};
