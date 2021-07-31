import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { commerce } from "lib";
import { Cart } from "@chec/commerce.js/types/cart";

interface CartValues {
  cart: Cart | null;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
}

const CartContext = createContext({} as CartValues);

export const CartProvider: FC = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null);

  const fetchCart = useCallback(async () => {
    const resp = await commerce.cart.retrieve();
    setCart(resp);
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (productId: string, quantity: number = 1) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  };

  const removeFromCart = async (lineId: string) => {
    const item = await commerce.cart.remove(lineId);
    setCart(item.cart);
  };

  const emptyCart = async () => {
    const item = await commerce.cart.empty();
    setCart(item.cart);
  };

  const refreshCart = async () => {
    const cart = await commerce.cart.refresh();
    setCart(cart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
