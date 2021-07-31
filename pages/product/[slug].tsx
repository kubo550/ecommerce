import { Product as ProductType } from "@chec/commerce.js/types/product";
import { commerce } from "lib";
import { GetStaticPaths, GetStaticProps } from "next";
import { FC } from "react";
import Image from "next/image";

interface ProductProps {
  product: ProductType;
}

const Product: FC<ProductProps> = ({ product }) => {
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
