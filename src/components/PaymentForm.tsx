import { useState } from "react";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { Stripe, StripeElements } from "@stripe/stripe-js";
import { commerce, stripePromise } from "lib";
import type { FormEvent, FC } from "react";
import type { FormValue } from "types";
import type { CheckoutCapture } from "@chec/commerce.js/types/checkout-capture";
import type { CheckoutToken } from "@chec/commerce.js/types/checkout-token";
import { useCart } from "context";
import Loader from "react-loader-spinner";

interface PaymentFormProps {
  prevStep: () => void;
  nextStep: () => void;
  checkoutToken: CheckoutToken;
  shippingData: FormValue;
}

export const PaymentForm: FC<PaymentFormProps> = ({
  prevStep,
  nextStep,
  checkoutToken,
  shippingData,
}) => {
  const { refreshCart } = useCart()
  const [paying, setPaying] = useState(false);
  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
    elements: StripeElements | null,
    stripe: Stripe | null
  ) => {
    e.preventDefault();

    if (!elements || !stripe) {
      return;
    }

    const cardElement = elements.getElement(CardElement)!;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error || !paymentMethod) {
      return console.log(error);
    }

    setPaying(true);

    const orderData: CheckoutCapture = {
      line_items: checkoutToken.live.line_items,
      customer: {
        firstname: shippingData.firstname,
        lastname: shippingData.lastname,
        email: shippingData.email,
      },
      shipping: {
        name: "National",
        street: shippingData.address,
        town_city: shippingData.city,
        postal_zip_code: shippingData.zip,
      },
      payment: {
        gateway: "stripe",
        stripe: {
          payment_method_id: paymentMethod.id,
          payment_intent_id: "gway_O5kgLQ8LGd1v57",
        },
      },
    };

    // TEST MODE IS ON
    try {
      await commerce.checkout.capture(checkoutToken.id, orderData);
    } catch (e) {
      console.log(e.message);
    } finally {
      setPaying(false);
      nextStep()
      refreshCart()
    }
  };

  return (
    <div className='w-full max-w-lg mt-4'>
      <h3 className='font-bold mt-1 mb-4'>Payment method</h3>

      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={e => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br /> <br />
              <div className='w-full flex justify-between px-4 mt-4 mb-2'>
                <button className='px-3 py-2' onClick={prevStep}>
                  Back
                </button>
                <button className='px-3 py-2' type='submit'>
                  {paying ? <Loader type='ThreeDots' width={80} color='#0077b6' height={24} /> : `PAY ${checkoutToken.live.total.formatted} zł`}
                </button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>

      <hr className='mt-2 mb-4' />
    </div>
  );
};
