import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = useCallback(
        product => setCart(prev => [...prev, product]),
        []
    );

    const removeFromCart = useCallback(
        id => setCart(prev => prev.filter(item => item.id !== id)),
        []
    );

    const clearCart = useCallback(
        () => setCart([]),
        []
    );

    const value = useMemo(() => ({
        cart,
        addToCart,
        removeFromCart,
        clearCart,
    }), [cart, addToCart, removeFromCart, clearCart]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useCart = () => useContext(CartContext);
