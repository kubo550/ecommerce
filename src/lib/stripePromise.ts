import { loadStripe } from "@stripe/stripe-js";

const testStripeKey =
    "pk_test_51IEN2uCif1KGHnWSofYbHqaQD1OqwLyAUhR60BVGOw1a69ksY7WdzlGXpkd8Xm9AeZanbOib402RM2XlpywQAUZD00fUHagOMt";
export const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_API_KEY || testStripeKey
);