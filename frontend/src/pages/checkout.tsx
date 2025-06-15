import {CheckoutForm} from "../components/checkout/checkout-form.tsx"
import OrderSummary from "../components/checkout/order-summary.tsx"

export const CheckoutPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <OrderSummary
        items={[]}
        total={0}
        onConfirm={() => {
          console.log("Function not implemented.");
        }}
      />
      <div className="container max-w-4xl py-10">
        <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
        <CheckoutForm />
      </div>
    </div>
  )
}
