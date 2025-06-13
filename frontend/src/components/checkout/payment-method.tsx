"use client"

import type { UseFormReturn } from "react-hook-form"
import type { CheckoutFormValues } from "./schemas"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"
import { CreditCard } from "lucide-react"

interface PaymentMethodProps {
  form: UseFormReturn<CheckoutFormValues>
}

export default function PaymentMethod({ form }: PaymentMethodProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Payment Method</h2>

      <FormField
        control={form.control}
        name="cardType"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Card Type</FormLabel>
            <FormControl>
              <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                <div className="flex items-center space-x-3 space-y-0">
                  <RadioGroupItem value="visa" id="visa" />
                  <Label htmlFor="visa" className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Visa
                  </Label>
                </div>
                <div className="flex items-center space-x-3 space-y-0">
                  <RadioGroupItem value="mastercard" id="mastercard" />
                  <Label htmlFor="mastercard" className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Mastercard
                  </Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="cardName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name on Card</FormLabel>
            <FormControl>
              <Input placeholder="Enter the name on your card" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="cardNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Card Number</FormLabel>
            <FormControl>
              <Input placeholder="Enter your card number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="cardExpiry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expiry Date</FormLabel>
              <FormControl>
                <Input placeholder="MM/YY" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cardCvc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CVC</FormLabel>
              <FormControl>
                <Input placeholder="CVC" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
