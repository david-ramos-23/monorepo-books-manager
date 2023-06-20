import { ReactNode } from 'react'

export const CardForm = ({ children }: { children: ReactNode }) => (
  <article className='mx-auto mt-12 flex w-full flex-col items-center justify-center rounded-xl bg-white  p-8 sm:min-w-fit sm:max-w-md sm:shadow-2xl'>
    {children}
  </article>
)
