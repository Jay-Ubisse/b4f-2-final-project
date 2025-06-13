import type { UseFormReturn } from "react-hook-form"
import type { CheckoutFormValues } from "./schemas"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form"
import { Input } from "../ui/input"

interface ContactInformationProps {
  form: UseFormReturn<CheckoutFormValues>
}

export default function ContactInformation({ form }: ContactInformationProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Contact Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your first name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="Enter your email address" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <Input placeholder="Enter your phone number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
