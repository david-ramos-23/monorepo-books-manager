import { ReactNode } from 'react'

export function Card({
  imgUrl = 'https://via.placeholder.com/600',
  children,
}: {
  children: ReactNode
  imgUrl: string
}) {
  const backgroundImage = `url(${imgUrl})`
  return (
    <article
      style={{
        backgroundImage,
      }}
      className='mx-auto mt-12 flex w-full scale-100 cursor-pointer flex-col items-center justify-center rounded-xl bg-white bg-cover bg-center bg-no-repeat p-8 shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-[#5d5e3f23] sm:min-w-fit sm:max-w-md'
    >
      {children}
    </article>
  )
}
