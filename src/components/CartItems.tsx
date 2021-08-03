import Image from "next/image";
import { useCart } from "context";
import { DeleteIcon } from "icons";
import { formatPrice } from "utils";
import type { FC } from "react";
import type { LineItem } from "@chec/commerce.js/types/line-item";

interface CartItemProps {
  items: LineItem[];
}

export const CartItems: FC<CartItemProps> = ({ items }) => {
  const { updateCart, removeFromCart } = useCart();

  return (
    <table className='table-fixed px-2 py-4'>
      <thead>
        <tr className='uppercase text-gray-700'>
          <th className='w-3/6  text-sm text-left pl-3'>product</th>
          <th className='w-1/6 text-sm'>price</th>
          <th className='w-1/6 text-sm'>quantity</th>
          <th className='w-1/6 text-sm'>total</th>
          <th className='w-1/6 text-sm'> </th>
        </tr>
      </thead>

      <tbody>
        {items.map(item => {
          const changeQuan = (type: "add" | "remove") => () =>
            updateCart(item.id, item.quantity, type);
          const removeItem = () => removeFromCart(item.id);
          const total = formatPrice(item.quantity * item.price.raw);

          return (
            <tr
              key={item.id}
              className='text-center border-b-2 h-20  border-green-700 my-3'
            >
              <td>
                <div className='flex flex-row justify-start items-center'>
                  <Image
                    src={item.media.source}
                    alt={item.name}
                    width={60}
                    height={60}
                  />
                  {item.name}
                </div>
              </td>
              <td> {item.price.formatted} <span className="hidden sm:inline-block"> zł </span></td>
              <td className=''>
                <div className='flex flex-row items-stretch justify-center mb-auto'>
                  <button
                    className='bg-gray-300 text-black  w-6 h-6 rounded-l-xl'
                    onClick={changeQuan("remove")}
                  >
                    <span className=' pl-1 '> - </span>
                  </button>
                  <span className='w-6 h-6 bg-gray-300 border-r-2 border-l-2 border-gray-400 text-black'>
                    {item.quantity}
                  </span>
                  <button
                    className='bg-gray-300 text-black w-6 h-6 rounded-r-xl'
                    onClick={changeQuan("add")}
                  >
                    <span className='pr-1'> +</span>
                  </button>
                </div>
              </td>
              <td>{total} <span className=" hidden sm:inline-block"> zł </span>  </td>
              <td>
                <button onClick={removeItem}>
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
