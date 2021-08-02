import { commerce } from "lib";
import { useState } from "react";
import { ProductList, Route } from "components";
import type { GetStaticPaths, GetStaticProps } from "next";
import type { FC } from "react";
import type { Product } from "@chec/commerce.js/types/product";

interface HomeProps {
  products: Product[];
}

const Home: FC<HomeProps> = ({ products }) => {
  const [searching, setSearching] = useState("");

  const displayProducts = products.filter(product =>
    product.name.toLowerCase().includes(searching.toLowerCase())
  );

  return (
    <Route>
      <div className='w-full '>
        <h1 className='text-center font-semibold text-base md:text-2xl my-5 md:my-8'>
          Test store to learn e-commerce with nextjs
        </h1>

        <div className='flex justify-center items-center my-5 '>
          <input
            onChange={({ target: { value } }) => setSearching(value)}
            type='search'
            className='bg-purple-white rounded border-0 p-3 shadow-xl w-56 md:w-80'
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

export default Home;
