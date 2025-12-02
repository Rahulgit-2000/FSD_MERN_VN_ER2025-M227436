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
                const { data } = await axios.get('/api/user/cart', {
                    headers: { Authorization: `Bearer ${user.token}` },
                });

                // Transform backend data (nested) to frontend structure (flat)
                const transformedCart = data
                    .filter(item => item.product) // Filter out null products (deleted books)
                    .map(item => ({
                        product: item.product._id,
                        name: item.product.title,
                        image: item.product.itemImage || item.product.image,
                        price: item.product.price,
                        qty: item.qty
                    }));

                setCartItems(transformedCart);
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
                await axios.put('/api/user/cart', cartData, {
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
