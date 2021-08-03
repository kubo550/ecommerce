import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { FC } from "react";
import type { Product } from "@chec/commerce.js/types/product";

interface ProductsProps {
  products: Product[];
}

export const ProductList: FC<ProductsProps> = ({ products }) => {
  return (
    <div className='grid grid-cols-1 gap-y-5 sm:grid-cols-2 md:grid-cols-3 mb-10 '>
      {products.map(phone => (
        <motion.div
          layout
          layoutId={phone.id}
          key={phone.id}
          className='flex flex-col items-stretch '
        >
          <div className='text-center'>
            <Link href={`/product/${phone.id}`}>
              <a title="Check more details" >
                <Image
                  src={phone.media.source}
                  blurDataURL={phone.media.source}
                  placeholder='blur'
                  alt={phone.name}
                  width={300}
                  height={250}
                  className='mx-auto'
                />
              </a>
            </Link>
          </div>

          <div className='flex flex-col mx-16'>
            <Link href={`/product/${phone.id}`}>
              <a className='font-semibold text-gray-800'> {phone.name} </a>
            </Link>
            <b> {phone.price.formatted} zł </b>
          </div>
        </motion.div>
      ))}

      {!products.length && (
        <h2 className='text-2xl my-6 text-center col-start-2'>
          No products found.
        </h2>
      )}
    </div>
  );
};
