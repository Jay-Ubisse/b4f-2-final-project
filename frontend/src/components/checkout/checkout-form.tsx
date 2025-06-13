"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircle2, CircleDashed } from "lucide-react"
import axios from "axios"

import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { checkoutFormSchema, type CheckoutFormValues } from "./schemas"
import { Form } from "../ui/form"

import ContactInformation from "./contact-information"
import ShippingAddress from "./shipping-address"
import PaymentMethod from "./payment-method"
import ConfirmationModal from "./confirmation-modal"

const steps = [
  { id: "contact", title: "Contact Information" },
  { id: "shipping", title: "Shipping Address" },
  { id: "payment", title: "Payment Method" },
]

export function CheckoutForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      phone: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      province: "",
      postalCode: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",
      cardName: "",
      cardType: "visa",
    },
    mode: "onChange",
  })

  const {
    handleSubmit,
    trigger,
  } = form

  const goToNextStep = async () => {
    const fieldsToValidate =
      currentStep === 0
        ? ["email", "phone", "firstName", "lastName"]
        : currentStep === 1
          ? ["address", "city", "province", "postalCode"]
          : ["cardNumber", "cardExpiry", "cardCvc", "cardName", "cardType"]

    const isStepValid = await trigger(fieldsToValidate as any)

    if (isStepValid) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        setIsModalOpen(true)
      }
    }
  }

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const onSubmit = async (data: CheckoutFormValues) => {
    setIsSubmitting(true)
    try {
      // Replace with your actual API endpoint
      await axios.post("/api/checkout", data)
      setIsModalOpen(true)
    } catch (error) {
      console.error("Error submitting checkout form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8 ">
      {/* Steps indicator */}
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                index <= currentStep
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-muted bg-background"
              }`}
            >
              {index < currentStep ? <CheckCircle2 className="h-6 w-6" /> : <CircleDashed className="h-6 w-6" />}
            </div>
            <span className="mt-2 text-sm font-medium">{step.title}</span>
          </div>
        ))}
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Form {...form}>
              {currentStep === 0 && <ContactInformation form={form} />}
              {currentStep === 1 && <ShippingAddress form={form} />}
              {currentStep === 2 && <PaymentMethod form={form} />}

              <div className="flex justify-between pt-4">
                <Button type="submit" variant="outline" onClick={goToPreviousStep} disabled={currentStep === 0}>
                  Previous
                </Button>
                <Button type="submit" onClick={goToNextStep} disabled={isSubmitting}>
                  {currentStep === steps.length - 1 ? "Complete Order" : "Next"}
                </Button>
              </div>
            </Form>
          </form>
        </CardContent>
      </Card>
      <ConfirmationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} formData={form.getValues()} />
    </div>
  )
}
