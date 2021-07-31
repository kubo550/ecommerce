import type { GetStaticPaths, GetStaticProps } from "next";

const Cart = () => {
  return <div>Cart</div>;
};

export const getStaticProps: GetStaticProps = async ctx => {
  return {
    props: {
      data: null,
    },
  };
};

export default Cart;
