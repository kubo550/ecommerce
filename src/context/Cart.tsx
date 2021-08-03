import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { commerce } from "lib";
import { Cart } from "@chec/commerce.js/types/cart";
import type { FC } from "react";

type Operation = "add" | "remove";

interface CartValues {
  cart: Cart | null;
  addToCart: (productId: string, quantity?: number, onSuccess?: () => void) => Promise<void>;
  updateCart: (productId: string, curentQuan: number, operation: Operation) => Promise<void>;
  refreshCart: () => Promise<void>;
  removeFromCart: (lineId: string) => Promise<void>
}

const CartContext = createContext({} as CartValues);

export const CartProvider: FC = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null);

  const fetchCart = useCallback(async () => {
    const cart = await commerce.cart.retrieve();
    setCart(cart);
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (productId: string, quantity: number = 1, onSuccess?: () => void) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
    onSuccess && onSuccess();
  };

  const removeFromCart = async (lineId: string) => {
    const item = await commerce.cart.remove(lineId);
    setCart(item.cart);
  };

  const updateCart = async (productId: string, curentQuan: number, operation: Operation) => {
    const newQuan = operation === "add" ? 1 : -1;
    const update = await commerce.cart.update(productId, {
      quantity: curentQuan + newQuan,
    });
    setCart(update.cart);
  };



  const refreshCart = async () => {
    const cart = await commerce.cart.refresh();
    setCart(cart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateCart, refreshCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
