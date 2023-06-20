import { Button, Label } from '../components'
import { CardForm } from '../components/CardForm'
import { Message } from '../components/Message'
import { useBooks } from '../context'
import { ROUTES } from '../routes/types'
import { BookFromValuesType } from '../types'
import type { ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

interface MyParams {
  id?: string
}
export function BookForm(): ReactElement {
  const { id } = useParams<keyof MyParams>()
  const { saveBook, updateBook, books } = useBooks()
  const navigate = useNavigate()

  const editableBook = books.find((book) => book.id === id)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookFromValuesType>({
    defaultValues: id != null ? { ...editableBook } : {},
  })

  const onSubmit = async (data: BookFromValuesType) => {
    try {
      if (id != null) {
        updateBook(id, {
          ...data,
        })
      } else {
        saveBook({
          ...data,
        })
      }

      navigate(ROUTES.Books)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <CardForm>
      <form onSubmit={handleSubmit(onSubmit)} className='flex w-full flex-col'>
        <div className='py-2'>
          <Label htmlFor='title'>Title</Label>
          <input
            type='text'
            placeholder='Title'
            className='w-full flex-1 rounded-[3px] border-[1px] border-slate-300 p-2 px-3 text-sm outline-0 transition duration-200 hover:border-[1px] hover:border-black'
            {...register('title')}
            autoFocus
            required
          />
          {errors?.title?.message != null && (
            <Message
              message={errors?.title?.message}
              className='text-xs italic text-red-500'
            />
          )}
        </div>
        <div className='py-2'>
          <Label htmlFor='author'>Author</Label>
          <input
            type='text'
            placeholder='Author'
            className='w-full flex-1 rounded-[3px] border-[1px] border-slate-300 p-2 px-3 text-sm outline-0 transition duration-200 hover:border-[1px] hover:border-black'
            required
            {...register('author')}
          />
          {errors?.author?.message != null && (
            <Message
              message={errors?.author?.message}
              className='text-xs italic text-red-500'
            />
          )}
        </div>
        <div className='py-2'>
          <Label htmlFor='image'>Image</Label>
          <input
            type='url'
            placeholder='Url of an image'
            className='w-full flex-1 rounded-[3px] border-[1px] border-slate-300 p-2 px-3 text-sm outline-0 transition duration-200 hover:border-[1px] hover:border-black'
            {...register('image')}
          />
          {errors?.image?.message != null && (
            <Message
              message={errors?.image?.message}
              className='text-xs italic text-red-500'
            />
          )}
        </div>
        <div className='py-2'>
          <Label htmlFor='description'>Description</Label>
          <textarea
            id='description'
            rows={3}
            className='w-full flex-1 rounded-[3px] border-[1px] border-slate-300 p-2 px-3 text-sm outline-0 transition duration-200 hover:border-[1px] hover:border-black'
            placeholder='Description'
            required
            {...register('description')}
          />
          {errors?.description?.message != null && (
            <Message
              message={errors?.description?.message}
              className='text-xs italic text-red-500'
            />
          )}
        </div>
        <Button
          type='submit'
          className='my-2 rounded-[3px] border-[1px] border-slate-300 bg-slate-50 px-3 py-2 font-medium transition duration-200 hover:border-[1px] hover:border-black hover:bg-opacity-80'
        >
          Save
        </Button>
      </form>
    </CardForm>
  )
}
