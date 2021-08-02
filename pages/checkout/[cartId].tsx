import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, FC } from "react";
import { FormWrapper, PaymentForm, Route, ShippingAddress, Summary } from "components";
import { commerce, schema } from "lib";
import type { FormValue } from "types";
import type { GetStaticPaths, GetStaticProps } from "next";
import type { CheckoutToken } from "@chec/commerce.js/types/checkout-token";

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
    <Route>
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
    </Route>
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

  if (typeof cartId !== "string" || !cartId.includes('cart_')) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  let checkoutToken: CheckoutToken
  try {
    checkoutToken = await commerce.checkout.generateToken(cartId, {
      type: "cart",
    });

  } catch (e) {
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


