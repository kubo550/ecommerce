import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FC } from "react";
import type { Product } from "@chec/commerce.js/types/product";

interface ProductsProps {
  products: Product[];
}

export const ProductList: FC<ProductsProps> = ({ products }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-10'>
      {products.map(phone => (
        <motion.div
          layout
          layoutId={phone.id}
          key={phone.id}
          className='flex flex-col items-center'
        >
          <Image
            src={phone.media.source}
            alt={phone.name}
            width={300}
            height={250}
            className=''
          />
          <Link href={`/product/${phone.id}`}>
            <a> {phone.name} </a>
          </Link>
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
