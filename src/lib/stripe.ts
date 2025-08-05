import Stripe from "stripe"

// Update API version to match Stripe's expected type
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2025-02-24.acacia",  // Updated to match type expectation
  typescript: true,
})

export const createCheckoutSession = async ({
                                              userEmail,
                                              userId,
                                            }: {
  userEmail: string
  userId: string
}) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: "price_1QBHVBA19umTXGu8gzhUCSG7",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    customer_email: userEmail,
    metadata: {
      userId,
    },
  })

  return session
}