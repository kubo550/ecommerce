import { Product as ProductType } from "@chec/commerce.js/types/product";
import { commerce } from "lib";
import { GetStaticPaths, GetStaticProps } from "next";
import { FC, useState } from "react";
import Image from "next/image";
import { useCart } from "context";

interface ProductProps {
  product: ProductType;
}

const Product: FC<ProductProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = (id: string) => {
    setIsAddingToCart(true);

    addToCart(id, 1, () => {
      console.log(` dodano do koszyka`);
      setIsAddingToCart(false);
    });
  };

  return (
    <div className='grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4'>
      <div className='bg-gray-700 '>
        <Image
          src={product.media.source}
          alt={product.seo.title!}
          width={400}
          height={300}
        />
      </div>

      <div className='px-3 flex flex-col items-center justify-center'>
        <h2 className='text-3xl'>{product.name}</h2>
        <div dangerouslySetInnerHTML={{ __html: product.description }} />
        <div className='flex flex-row w-full justify-between items-center'>
          <button
            className='px-4 py-2 bg-gradient-to-tr from-purple-700 to-yellow-700 rounded-xl '
            onClick={() => handleAddToCart(product.id)}
          >
            {isAddingToCart ? "..." : "Add to cart"}
          </button>
          <button className='px-4 py-2 bg-gradient-to-tr from-green-700 to-green-500 rounded-xl'>
            Buy now
          </button>
        </div>
      </div>
    </div>
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
