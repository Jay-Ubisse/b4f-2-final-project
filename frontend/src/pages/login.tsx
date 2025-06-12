import { Button } from '../components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card'
import { Input } from '../components/ui/input'
//================================================

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom'
import { toast } from "react-hot-toast"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form"

const FormSchema = z.object({
  email: z
    .string({ required_error: 'O email é obrigatório' })
    .email('Email inválido'),
  password: z
    .string({ required_error: 'A senha é obrigatória' })
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .max(20, 'A senha deve ter no máximo 20 caracteres'),
})

  

export const Login = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
    })

    function onSubmit() {
      toast('You submitted the following values')
    }
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-sm m-auto">
          <CardHeader>
            <CardTitle>Introduza os seus dados de Login</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex-col gap-2 text-center">
                  <Button type="submit">Sign In</Button>
                </div>
              </form>
            </Form>
            <CardAction className="w-full text-center">
              <p className="text-sm">
                Não possui conta?
                <Link
                  to="/register"
                  className="text-black hover:underline pl-1 "
                >
                  Clique aqui para criar
                </Link>
              </p>
            </CardAction>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
