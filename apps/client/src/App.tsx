import type { ReactElement } from 'react'
import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import { LoadingOrError } from './components/LoadingOrError'
import { Nav } from './components/Nav'
import { AuthProvider, BookProvider } from './context'
import { Pages } from './routes/Pages/Pages'

export function App(): ReactElement {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <BookProvider>
            <Toaster richColors />
            <Nav />
            <main className='relative mx-auto flex max-w-7xl flex-col items-center justify-center pb-32'>
              <section className='flex w-full flex-col items-center justify-center'>
                <header>
                  <h1 className='sm:text3xl mt-5 text-center text-4xl font-extrabold leading-[1.15] text-black'>
                    Cardo Health
                    <br />
                    <span className='via-green-00 bg-gradient-to-r from-lime-500 to-emerald-400 bg-clip-text text-center text-transparent'>
                      Books Manager
                    </span>
                  </h1>
                </header>
                <Suspense fallback={<LoadingOrError />}>
                  <Pages />
                </Suspense>
              </section>
            </main>
            <main />
          </BookProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}
