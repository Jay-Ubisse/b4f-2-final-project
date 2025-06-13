"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog"
import { Button } from "../ui/button"
import type { CheckoutFormValues } from "./schemas"
import { mozambiqueProvinces } from "../../types/checkout-Data"
import { submitOrder } from "../../services/orders"

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  formData: CheckoutFormValues
}



export default function ConfirmationModal({ isOpen, onClose, formData }: ConfirmationModalProps) {
  const provinceName = mozambiqueProvinces.find((p) => p.value === formData.province)?.label || formData.province

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Order Confirmation</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <h3 className="font-medium">Contact Information</h3>
            <p>
              {formData.firstName} {formData.lastName}
            </p>
            <p>{formData.email}</p>
            <p>{formData.phone}</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Shipping Address</h3>
            <p>{formData.address}</p>
            <p>
              {formData.city}, {provinceName}
            </p>
            <p>{formData.postalCode}</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Payment Method</h3>
            <p>
              {formData.cardType.charAt(0).toUpperCase() + formData.cardType.slice(1)} ending in{" "}
              {formData.cardNumber.slice(-4)}
            </p>
            <p>{formData.cardName}</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={async () => {
             try {
              await submitOrder(formData)
               alert("Order placed successfully!")
               onClose()
             } catch (error) {
               console.error("Error processing order:", error)
                alert("Erro ao realizar pedido. Tente novamente.")
             }
            }}>
            Confirm Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
