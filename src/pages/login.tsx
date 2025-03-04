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
import { APP_NAME } from '@/lib/constants'
import { useAuth } from '@/hooks/useAuth'
import { loginSchema, LoginSchemaType } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const LoginPage = () => {
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
    <Card className="w-full max-w-md mx-auto p-6 glass-card animate-fade-up">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Welcome to {APP_NAME}
        </CardTitle>
        <CardDescription>
          Login to see some really cool doggos 🐶
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full" />
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
                    <Input {...field} className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button
                disabled={isPending}
                type="submit"
                className="w-full cursor-pointer"
              >
                Sign In
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
export default LoginPage
