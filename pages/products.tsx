import { commerce } from "lib";
import { useState } from "react";
import { Divider, ProductList, Route } from "components";
import type { GetStaticPaths, GetStaticProps } from "next";
import type { FC } from "react";
import type { Product } from "@chec/commerce.js/types/product";

interface ProductsProps {
  products: Product[];
}

const Products: FC<ProductsProps> = ({ products }) => {
  const [searching, setSearching] = useState("");

  const displayProducts = products.filter(product =>
    product.name.toLowerCase().includes(searching.toLowerCase())
  );

  return (
    <Route>
      <div className='w-full bg-gray-100  px-1 py-2'>

        <Divider> Phones </Divider>

        <div className='flex justify-center items-center mt-4 mb-8 '>
          <input
            onChange={({ target: { value } }) => setSearching(value)}
            type='search'
            className='bg-white rounded-md border-0 p-3 shadow-xl w-56 md:w-80 focus:outline-none'
            placeholder='Search by name...'
          />
        </div>


        <ProductList products={displayProducts} />
      </div>
    </Route>
  );
};

export const getStaticProps: GetStaticProps = async ctx => {
  const { data } = await commerce.products.list();

  return {
    props: {
      products: data,
    },
  };
};

export default Products;
