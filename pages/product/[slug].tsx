import Image from "next/image";
import Link from "next/link";
import Loader from "react-loader-spinner";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { Divider, ProductList, Route } from "components";
import { useCart } from "context";
import { commerce } from "lib";
import { motion } from "framer-motion";
import type { Product as ProductType } from "@chec/commerce.js/types/product";
import type { GetStaticPaths, GetStaticProps } from "next";

interface ProductProps {
  product: ProductType;
}

const Product: FC<ProductProps> = ({ product }) => {
  const { addToCart, cart } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const router = useRouter();

  const handleAddToCart = (id: string, withAnimation?: true) => {
    withAnimation && setIsAddingToCart(true);

    addToCart(id, 1, () => {
      setIsAddingToCart(false);
    });
  };

  return (
    <Route
      title={"Kurdziel's Shop " + product.seo.title}
      description={product.seo.description}
    >
      <div className='grid grid-cols-1 gap-2 md:grid-cols-2 relative md:gap-4 my-20 gap-y-6 px-2'>
        <button className='absolute z-50 transform -translate-y-4 translate-x-2 text-gray-800' onClick={router.back}>Back</button>

        <motion.div layout layoutId={product.id} className='text-center'>
          <Image src={product.media.source} alt={product.seo.title!} width={400} height={300} />
        </motion.div>

        <div className='px-3 flex flex-col  justify-between'>
          <h2 className='text-3xl my-4 md:mx-0'>{product.name}</h2>

          <div className='flex my-4 md:mx-0'>
            {product.categories.map(cat => (
              <span className='bg-green-800 px-2 py-1 rounded-md mr-2 text-base text-yellow-50' key={cat.id}>
                #{cat.name}
              </span>
            ))}
          </div>

          <div className="my-4 md:mx-0" dangerouslySetInnerHTML={{ __html: product.description }} />

          <div className='flex flex-row w-full justify-around items-center my-4 md:mx-0'>
            <button
              className={`px-4 py-2 w-36 bg-gradient-to-l from-pink-600 to-red-600 text-white font-semibold rounded-3xl ${isAddingToCart ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              onClick={() => handleAddToCart(product.id, true)}
              disabled={isAddingToCart}
            >
              {isAddingToCart ? (
                <Loader type='ThreeDots' width={114} color='#0077b6' height={24} />
              ) : (
                "Add to cart"
              )}
            </button>

            <Link href={`/checkout/${cart?.id}`} passHref>
              <button
                onClick={() => handleAddToCart(product.id)}
                className='px-4 py-2 w-28 border-2  rounded-3xl text-pink-700 font-bold hover:scale-110 focus:scale-110'
              >
                Buy now
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className='px-2'>
        <Divider> Related </Divider>
        <h2 className='text-2xl my-5'>Products with the same category</h2>
        <ProductList products={product.related_products.slice(0, 3)} />
      </div>
    </Route>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: products } = await commerce.products.list();

  const paths = products.map(product => ({
    params: { slug: product.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ctx => {
  const params = ctx.params;
  const slug = params?.slug as string;

  if (!slug) {
    return {
      notFound: true,
    };
  }

  const product = await commerce.products.retrieve(slug, {});

  return {
    props: {
      product,
    },
  };
};

export default Product;
