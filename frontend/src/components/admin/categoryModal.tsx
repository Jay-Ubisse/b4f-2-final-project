"use client"

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../../components/ui/dialog"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { useEffect, useState } from "react"
import { Label } from "../ui/label"

interface CategoryModalProps {
  onSubmit: (category: { name: string; description?: string }) => Promise<void>
  isOpen: boolean
  onClose: () => void
  category: { name?: string; description?: string } | null
}

export const CategoryModal = ({
  onSubmit,
  isOpen,
  onClose,
  category,
}: CategoryModalProps) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  // Preenche os campos ao editar
  useEffect(() => {
    if (category) {
      setName(category.name || "")
      setDescription(category.description || "")
    } else {
      setName("")
      setDescription("")
    }
  }, [category, isOpen])

  const handleSubmit = async () => {
    if (!name.trim()) return
    await onSubmit({ name, description })
    setName("")
    setDescription("")
    onClose() 
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogTitle>{category && category.name ? "Edit Category" : "New Category"}</DialogTitle>
        <DialogDescription>
{category && category.name
    ? "Update the category details."
    : "Create a new category by filling out the fields below."}
         </DialogDescription>
        <Label>Name</Label>
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Label>Description (optional)</Label>
        <Input
          placeholder="Description of the category"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex justify-end mt-4 gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
