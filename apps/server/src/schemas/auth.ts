import { z } from 'zod'

export const signUpSchemaForm = z.object({
  username: z
    .string({
      required_error: 'Full name is required'
    })
    .min(3, {
      message: 'Full name must be at least 3 characters'
    }),
  email: z
    .string({
      required_error: 'Email is required'
    })
    .email({
      message: 'Email is not valid'
    }),
  password: z
    .string({
      required_error: 'Password is required'
    })
    .min(6, {
      message: 'Password must be at least 6 characters'
    })

})

export const loginSchemaForm = z.object({
  email: z
    .string({
      required_error: 'Email is required'
    })
    .email({
      message: 'Email is not valid'
    }),
  password: z
    .string({
      required_error: 'Password is required'
    })
    .min(6, {
      message: 'Password must be at least 6 characters'
    })
})

export const loginSchema = z.object({
  body: loginSchemaForm
})

export const signUpSchema = z.object({
  body: signUpSchemaForm
})

export type SignupSchemaType = z.infer<typeof signUpSchema>['body'];
export type LoginSchemaType = z.infer<typeof loginSchema>['body'];
