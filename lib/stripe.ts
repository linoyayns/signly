import Stripe from "stripe";

export function getStripe(): Stripe {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-03-25.dahlia",
  });
}

export const CONTRACT_PRICE_ILS = 79;
