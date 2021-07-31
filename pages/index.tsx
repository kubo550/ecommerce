import { commerce } from "lib";
import Link from "next/link";
import type { Product } from "@chec/commerce.js/types/product";
import type { GetStaticPaths, GetStaticProps } from "next";
import type { FC } from "react";

interface HomeProps {
  products: Product[];
}

const Home: FC<HomeProps> = ({ products }) => {
  return (
    <div>
      <h1> Hi</h1>
      {products.map(phone => (
        <div key={phone.id} className=''>
          <Link href={`/product/${phone.id}`}>
            <a> {phone.name} </a>
          </Link>
        </div>
      ))}
    </div>
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
