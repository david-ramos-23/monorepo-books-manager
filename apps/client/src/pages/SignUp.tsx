import { Button } from '../components'
import { Label } from '../components/Label'
import { Message } from '../components/Message'
import { useAuth } from '../context/auth'
import { ROUTES } from '../routes/types'
import { SignUpFormValuesType } from '../types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { signUpSchemaForm } from '../../../server/src/schemas/auth'
import { CardForm } from '../components/CardForm'
import { toast } from 'sonner'

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValuesType>({
    resolver: zodResolver(signUpSchemaForm),
  })
  const { signUp, error: loginError, isAuthenticated, isError } = useAuth()
  const navigate = useNavigate()

  const onSubmit = async (data: SignUpFormValuesType) => signUp(data)

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.Books)
    }
  }, [isAuthenticated, navigate])

  if (isError) toast.error(loginError?.message)

  return (
    <CardForm>
      <h2 className='mg-5 text-xl font-bold'>Sign Up Page</h2>
      <form className='flex w-full flex-col' onSubmit={handleSubmit(onSubmit)}>
        <div className='py-2'>
          <Label htmlFor='email'>Username</Label>
          <input
            aria-label='Write you username here....'
            placeholder='Write you username here...'
            className='w-full flex-1 rounded-[3px] border-[1px] border-slate-300 p-2 px-3 text-sm outline-0 transition duration-200 hover:border-[1px] hover:border-black'
            type='text'
            {...register('username', { required: true })}
          />

          {errors?.username?.message != null && (
            <Message
              message={errors?.username?.message}
              className='text-xs italic text-red-500'
            />
          )}
        </div>
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
          Sign up
        </Button>
      </form>

      <p className='flex justify-between gap-x-2 text-sm'>
        Do you have an account?
        <Link to='/signup' className='text-sky-500'>
          Sign in
        </Link>
      </p>
    </CardForm>
  )
}
