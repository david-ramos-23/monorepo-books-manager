import { expect, describe, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BookList } from './BookList'
import { BookType } from '../../../../server/src/models/book'

describe('BookList', () => {
  const books: BookType[] = [
    {
      id: '1',
      title: 'Foo',
      author: 'Bar',
      description: 'Baz',
      image: 'Qux',
      userId: '1',
    },
  ]
  test('displays component', () => {
    render(<BookList books={books} />)
    screen.debug()
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument()
  })
})
