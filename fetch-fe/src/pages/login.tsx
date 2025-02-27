import { Button } from '@/components/ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { APP_NAME } from '@/constants'
import { useAuth } from '@/hooks/useAuth'
import { loginSchema, LoginSchemaType } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'

const Login = () => {
  const { signIn } = useAuth()
  const [isPending, startTransition] = useTransition()

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  })
  const { control, handleSubmit } = form

  const onSubmit = (data: LoginSchemaType) => {
    startTransition(() => {
      try {
        signIn(data)
      } catch (error) {
        console.error('Login failed:', error)
        form.setError('root', {
          type: 'manual',
          message: 'Login failed. Please try again.',
        })
      }
    })
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <Form {...form}>
        <h1 className="text-2xl font-bold mb-4">Welcome to {APP_NAME}!</h1>
        <h3 className="text-xl font-bold mb-4">
          Login to see some really cool doggos 🐶
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-xl">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              disabled={isPending}
              type="submit"
              className="cursor-pointer"
            >
              Sign In
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
export default Login
