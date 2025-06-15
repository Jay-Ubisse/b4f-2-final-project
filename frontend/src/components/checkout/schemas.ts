import { z } from "zod"
export const checkoutFormSchema = z.object({
  // Contact Information
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(9, { message: "Please enter a valid phone number" }),

  // Shipping Address
  address: z.string().min(5, { message: "Address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  province: z.string().min(1, { message: "Province is required" }),
  postalCode: z.string().min(4, { message: "Postal code must be numeric" }),

  // Payment Method
  cardType: z.enum(["visa", "mastercard"]),
  cardName: z.string().min(2, { message: "Name on card is required" }),
  cardNumber: z.string().min(13, { message: "Card number must be at least 13 digits" })
    .max(16, { message: "Card number must be at most 16 digits" })
    .refine((val) => /^\d+$/.test(val), { message: "Card number must contain only digits" }),
  cardExpiry: z
    .string()
    .min(5, { message: "Expiry date is required" })
    .refine((val) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(val), { message: "Expiry date must be in MM/YY format" }),
  cardCvc: z
    .string()
    .min(3, { message: "CVC must be at least 3 digits" })
    .max(4, { message: "CVC must be at most 4 digits" })
    .refine((val) => /^\d+$/.test(val), { message: "CVC must contain only digits" }),
})

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>
