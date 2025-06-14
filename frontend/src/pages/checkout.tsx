import {CheckoutForm} from "../components/checkout/checkout-form.tsx"
import OrderSummary from "../components/checkout/order-summary.tsx"

export function CheckoutPage() {
  return (
    <div className=" bg-gray-100 min-h-screen">
      <OrderSummary items={[]} total={0} onConfirm={function (): void {
        console.log("Function not implemented.");
      } }/>
      <div className="container max-w-4xl py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      <CheckoutForm />
    </div>
    </div>
  )
}
