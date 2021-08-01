import { useCart } from "context";
import Link from "next/link";
import { FC } from "react";

const Cart: FC = ({ }) => {
  const { cart, updateCart } = useCart();

  if (!cart) {
    return <Spinner />;
  }

  return (
    <div>
      Cart
      <div>
        {cart.line_items.length ? (
          cart.line_items.map(item => (
            <div className='' key={item.id}>
              <h2> {item.name} </h2>
              <div className='felx flex-row justify-around items-center'>
                <button
                  className='bg-gray-500 text-black px-2'
                  onClick={() => updateCart(item.id, item.quantity, "remove")}
                >
                  -
                </button>
                <span> {item.quantity} </span>
                <button
                  className='bg-gray-500 text-black px-2'
                  onClick={() => updateCart(item.id, item.quantity, "add")}
                >
                  +
                </button>
              </div>
            </div>
          ))
        ) : (
          <EmptyCart />
        )}
        {!!cart.line_items.length && (
          <div className=''>
            <Link href={`/checkout/${cart.id}`} passHref>
              <button className='px-4 py-2'>Checkout</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const Spinner = () => <div className=''>loading...</div>;

const EmptyCart = () => (
  <div className=''>
    <h2>
      Your Cart is empty. Go and find something special for you
      <Link href='/'> phones </Link>
    </h2>
  </div>
);

export default Cart;
