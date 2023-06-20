import { Button } from '../components'
import { CardForm } from '../components/CardForm'
import { Label } from '../components/Label'
import { Message } from '../components/Message'
import { useAuth } from '../context/auth'
import { ROUTES } from '../routes/types'
import { SignInFormValuesType } from '../types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { loginSchemaForm } from '../../../server/src/schemas/auth'
import { toast } from 'sonner'

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValuesType>({
    resolver: zodResolver(loginSchemaForm),
  })
  const { signIn, error: loginError, isAuthenticated, isError } = useAuth()
  const navigate = useNavigate()

  const onSubmit = (data: SignInFormValuesType) => signIn(data)

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.Books)
    }
  }, [isAuthenticated, navigate])

  if (isError) toast.error(loginError?.message)

  return (
    <CardForm>
      <h2 className='mg-5 text-xl font-bold'>Login</h2>
      <form className='flex w-full flex-col' onSubmit={handleSubmit(onSubmit)}>
        <div className='py-2'>
          <Label htmlFor='email'>Email</Label>
          <input
            aria-label='Write you email here....'
            placeholder='Write you email here...'
            className='w-full flex-1 rounded-[3px] border-[1px] border-slate-300 p-2 px-3 text-sm outline-0 transition duration-200 hover:border-[1px] hover:border-black'
            type='email'
            {...register('email', { required: true })}
          />
          {errors?.email?.message != null && (
            <Message
              message={errors?.email?.message}
              className='text-xs italic text-red-500'
            />
          )}
        </div>
        <div className='py-2'>
          <Label htmlFor='password'>Password</Label>
          <input
            type='password'
            placeholder='Write your password here...'
            className='w-full flex-1 rounded-[3px] border-[1px] border-slate-300 p-2 px-3 text-sm outline-0 transition duration-200 hover:border-[1px] hover:border-black'
            {...register('password', { required: true, minLength: 6 })}
          />
          {errors?.password?.message != null && (
            <Message
              message={errors?.password?.message}
              className='text-xs italic text-red-500'
            />
          )}
        </div>
        <Button
          type='submit'
          className='my-2 rounded-[3px] border-[1px] border-slate-300 bg-slate-50 px-3 py-2 font-medium transition duration-200 hover:border-[1px] hover:border-black hover:bg-opacity-80'
        >
          Login
        </Button>
      </form>
      <p className='flex justify-between gap-x-2 text-sm'>
        Don't have an account?{' '}
        <Link to='/signup' className='text-sky-500'>
          Sign up
        </Link>
      </p>
    </CardForm>
  )
}
