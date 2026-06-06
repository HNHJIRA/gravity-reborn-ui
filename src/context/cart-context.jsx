"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("royal_atelier_cart");
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (e) {
        console.error("Failed to parse cart items:", e);
      }
    }
  }, []);

  // Save cart to localStorage on changes
  useEffect(() => {
    localStorage.setItem("royal_atelier_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, selectedColor) => {
    setCartItems((prevItems) => {
      // Unique key by combining ID and Color Name
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === product.id && item.color.name === selectedColor.name
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        return [
          ...prevItems,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            img: product.img,
            color: selectedColor,
            quantity: 1,
          },
        ];
      }
    });
    setIsCartOpen(true); // Auto-open cart sidebar on adding item!
  };

  const removeFromCart = (productId, colorName) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.id === productId && item.color.name === colorName))
    );
  };

  const updateQuantity = (productId, colorName, amount) => {
    setCartItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.id === productId && item.color.name === colorName) {
            const newQty = item.quantity + amount;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((acc, item) => {
    const numericPrice = parseFloat(item.price.replace(/[^0-9.]/g, "")) || 0;
    return acc + numericPrice * item.quantity;
  }, 0);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
