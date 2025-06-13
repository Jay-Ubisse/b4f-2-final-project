import { Button } from '../components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card'
import { Input } from '../components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'   
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { toast } from 'react-hot-toast'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    } from '../components/ui/form'  

    const FormSchema = z.object({
  name: z.string({ required_error: 'O nome é obrigatório' }),
    email: z
        .string({ required_error: 'O email é obrigatório' })
        .email('Email inválido'),
    password: z
        .string({ required_error: 'A senha é obrigatória' })
        .min(6, 'A senha deve ter pelo menos 6 caracteres')
        .max(20, 'A senha deve ter no máximo 20 caracteres'),
    confirmPassword: z
        .string({ required_error: 'A confirmação de senha é obrigatória' })
        .min(6, 'A confirmação de senha deve ter pelo menos 6 caracteres')
        .max(20, 'A confirmação de senha deve ter no máximo 20 caracteres')
        })
export const RegisterForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(user: z.infer<typeof FormSchema>) {
    try {
        if (user.password !== user.confirmPassword) {
            throw new Error('As senhas não coincidem')
        }
      console.log('Usuário registrado:', user)
      window.location.href = '/login'
    } catch (error) {
      console.error(error)
        toast.error('Erro ao registrar usuário. Tente novamente mais tarde.', {
            id: '1',
        })
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen font-mono bg-gray-100">
        <Card className="w-full max-w-md">
            <CardHeader>
            <CardTitle >Crie sua conta e arrase no estilo</CardTitle>
            </CardHeader>
            <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                    <FormItem className="mb-4">
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                        <Input placeholder="Insira seu nome completo" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                    <FormItem className="mb-4">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                        <Input placeholder="Insira seu email" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                    <FormItem className="mb-4">
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                        <Input type="password" placeholder="Insira sua senha" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                    <FormItem className="mb-4">
                        <FormLabel>Confirmar Senha</FormLabel>
                        <FormControl>
                        <Input type="password" placeholder="Confirme sua senha" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <div className='text-center'>
                <Button type="submit">Registrar</Button>
               
                </div>

                </form>
            </Form>
            <div className='text-center'>
                <Link to="/login">Já tem uma conta? Faça login</Link>
            </div>
            </CardContent>
        </Card>
    </div>
    )
}