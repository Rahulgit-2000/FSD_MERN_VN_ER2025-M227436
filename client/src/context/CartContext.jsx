import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const { user } = useContext(AuthContext);

    // Load cart from backend when user logs in
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const { data } = await axios.get('/api/users/cart', {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setCartItems(data);
            } catch (error) {
                console.error('Failed to fetch cart', error);
            }
        };

        if (user) {
            fetchCart();
        } else {
            setCartItems([]); // Clear cart on logout
        }
    }, [user]);

    const updateBackendCart = async (newItems) => {
        if (user) {
            try {
                // Backend expects: [{ product: ID, qty: Number }]
                const cartData = newItems.map(item => ({
                    product: item.product,
                    qty: item.qty
                }));
                await axios.put('/api/users/cart', cartData, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
            } catch (error) {
                console.error('Failed to update cart', error);
            }
        }
    };

    const addToCart = (item) => {
        const existItem = cartItems.find((x) => x.product === item.product);
        let newItems;

        if (existItem) {
            newItems = cartItems.map((x) =>
                x.product === existItem.product ? item : x
            );
        } else {
            newItems = [...cartItems, item];
        }

        setCartItems(newItems);
        updateBackendCart(newItems);
    };

    const removeFromCart = (id) => {
        const newItems = cartItems.filter((x) => x.product !== id);
        setCartItems(newItems);
        updateBackendCart(newItems);
    };

    const clearCart = () => {
        setCartItems([]);
        updateBackendCart([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
