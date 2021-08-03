import Link from "next/link";
import Loader from "react-loader-spinner";
import { CartItems, Route, Summary } from "components";
import { useCart } from "context";
import type { FC } from "react";

const Cart: FC = ({}) => {
  const { cart } = useCart();

  if (!cart) {
    return <Spinner />;
  }

  return (
    <Route title='Yuor Shopping Cart'>
      <h2 className='text-4xl text-center my-8 font-semibold'> Your Cart </h2>

      {cart.line_items.length ? (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-2 md:px-4'>
          <div className='col-span-1 md:col-span-2'>
            <CartItems items={cart.line_items} />
          </div>

          <div className='col-span-1'>
            <Summary
              cartProducts={cart.line_items}
              totalPrice={cart.subtotal.formatted}
            />

            {!!cart.line_items.length && (
              <div className='text-center'>
                <Link href={`/checkout/${cart.id}`} passHref>
                  <button className='w-full mt-5 mb-4 bg-gradient-to-bl rounded-md max-w-lg mx-auto from-green-600 to-green-800 text-yellow-50 text-base md:text-xl px-4 py-2 uppercase'>
                    Checkout
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}
    </Route>
  );
};

export default Cart;

const Spinner = () => (
  <div className='h-80 mt-28 flex text-center justify-center'>
    <Loader type='TailSpin' height={170} width={170} color='#0077b6' />
  </div>
);

const EmptyCart = () => (
  <div className=''>
    <h2>
      Your Cart is empty. Go and find something special for you
      <Link href='/products'> phones </Link>
    </h2>
  </div>
);
