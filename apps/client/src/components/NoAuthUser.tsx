import { Link } from 'react-router-dom'

export const NoAuthUser = () => (
  <section className='flex items-center justify-center py-16 text-xl'>
    Please,
    <span className='mx-1'>
      <Link
        to='/signin'
        className='transition-color text-sky-500 duration-500 hover:text-sky-600'
      >
        sign in
      </Link>
    </span>
    to see your <span className='ml-1 text-4xl'>📚</span> !
  </section>
)
