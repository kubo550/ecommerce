/* eslint-disable @next/next/no-img-element */
import type { GetStaticPaths, GetStaticProps } from "next";
import { useForm, DeepMap, FieldError, UseFormRegister } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import type { FC } from "react";
import Link from "next/link";
import { useCart } from "context";
import { Cart } from "@chec/commerce.js/types/cart";
import { FormField, FormWrapper, PaymentForm } from "components";
import { FormValue } from "types";
import { commerce, schema } from "lib";
import { CheckoutToken } from "@chec/commerce.js/types/checkout-token";
import { Live } from "@chec/commerce.js/types/live";

const STEPS_AMOUNT = 3;

const Checkout: FC<{ checkoutToken: CheckoutToken }> = ({ checkoutToken }) => {
  const [shippingData, setshippingData] = useState({} as FormValue);
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
  } = useForm<FormValue>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const [step, setStep] = useState(0);
  const nextStep = () => setStep(prev => ++prev);
  const prevStep = () => setStep(prev => --prev);

  const onSubmit = async (data: FormValue) => {
    setshippingData(data);
    nextStep();
  };

  return (
    <FormWrapper step={step} totalSteps={STEPS_AMOUNT}>
      <form className='w-full max-w-lg' onSubmit={handleSubmit(onSubmit)}>
        {step === 0 && (
          <ShippingAddress
            errors={errors}
            register={register}
            isValid={isValid}
            nextStep={nextStep}
          />
        )}
      </form>
      {step === 1 && (
        <>
          <h3 className='text-center text-xl mt-1 mb-4'> Payment details </h3>

          <Summary cart={checkoutToken?.live} />

          <PaymentForm
            prevStep={prevStep}
            nextStep={nextStep}
            checkoutToken={checkoutToken}
            shippingData={shippingData}
          />
        </>
      )}

      {step === 2 && (
        <>
          <h3 className='text-center text-xl mt-1 mb-4'>Thanks for shopping</h3>
        </>
      )}
    </FormWrapper>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ctx => {
  const cartId = ctx.params?.cartId;

  if (typeof cartId !== "string") {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  const checkoutToken = await commerce.checkout.generateToken(cartId, {
    type: "cart",
  });

  if (!checkoutToken) {
    return {
      redirect: {
        permanent: false,
        destination: "/cart",
      },
    };
  }
  return {
    props: {
      checkoutToken,
    },
  };
};

export default Checkout;

interface SummaryProps {
  cart: Live | null;
}

const Summary: FC<SummaryProps> = ({ cart }) => {
  if (!cart) return <div className=''>loading...</div>;
  return (
    <div className='w-full max-w-lg'>
      <h3 className='font-bold mt-1 mb-4'>Order summary</h3>
      {cart.line_items.map(item => (
        <div className='flex w-full mt-2 mb-3' key={item.id}>
          {/* img */}

          <div className='flex-1'>
            <p className='font-semibold'> {item.name} </p>
            <p className='text-gray-700'>quantity: {item.quantity}</p>
          </div>

          <div className='px-1 pt-2 font-semibold'>
            {" "}
            {item.price.formatted} zł
          </div>
        </div>
      ))}
      <div className=''>
        <p>Total </p> <b> {cart.subtotal.formatted} zł </b>
        <hr className='mt-2 mb-4' />
      </div>
    </div>
  );
};

interface ShippingAddressProps {
  errors: DeepMap<FormValue, FieldError>;
  register: UseFormRegister<FormValue>;
  isValid: boolean;
  nextStep: () => void;
}

const ShippingAddress: FC<ShippingAddressProps> = ({ errors, register }) => (
  <>
    <h3 className='text-center text-xl mt-1 mb-4'> Shipping address </h3>
    <div className='flex flex-wrap -mx-3 mb-6'>
      <FormField
        name='firstname'
        label='First Name'
        placeholder='John'
        errors={errors}
        register={register}
      />
      <FormField
        name='lastname'
        label='Last Name'
        placeholder='Doe'
        errors={errors}
        register={register}
      />
      <FormField
        name='phone'
        label='Phone'
        placeholder='537291461'
        errors={errors}
        register={register}
      />
      <FormField
        name='email'
        label='E-mail Aress'
        placeholder='name@example.com'
        errors={errors}
        register={register}
      />
    </div>

    <div className='flex flex-wrap -mx-3 mb-2'>
      <FormField
        name='address1'
        label='Adress'
        placeholder='St. Patrick 45'
        errors={errors}
        register={register}
        small
      />
      <FormField
        name='zip'
        label='ZIP / Postal code'
        placeholder='32-065'
        errors={errors}
        register={register}
        small
      />
      <FormField
        name='city'
        label='city'
        placeholder='Moscow'
        errors={errors}
        register={register}
        small
      />
    </div>

    <div className='w-full flex justify-between px-4 mt-4 mb-2'>
      <Link href='/cart' passHref>
        <button className='px-3 py-2'>Back to cart</button>
      </Link>
      <button className='px-3 py-2' type='submit'>
        NEXT
      </button>
    </div>
  </>
);
