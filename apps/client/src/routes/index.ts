import { lazy } from 'react'
import {
  ProtectedPages,
  ProtectedRutes,
  Routes,
  UnprotectedPages,
} from './types'

export const routes: Routes = {
  [UnprotectedPages.Home]: {
    component: lazy(
      async () =>
        await import('../pages/Home').then((module) => ({
          default: module.Home,
        }))
    ),
    path: '/',
    title: 'Welcome',
  },
  [UnprotectedPages.SignUp]: {
    component: lazy(
      async () =>
        await import('../pages/SignUp').then((module) => ({
          default: module.SignUp,
        }))
    ),
    path: '/signup',
    title: 'User SignUp',
  },
  [UnprotectedPages.SignIn]: {
    component: lazy(
      async () =>
        await import('../pages/SignIn').then((module) => ({
          default: module.SignIn,
        }))
    ),
    path: '/signin',
    title: 'User Login',
  },
  [UnprotectedPages.NotFound]: {
    component: lazy(
      async () =>
        await import('../pages/NotFound').then((module) => ({
          default: module.NotFound,
        }))
    ),
    path: '/*',
    title: 'Not found',
  },
}

export const protectedRoutes: ProtectedRutes = {
  [ProtectedPages.Books]: {
    component: lazy(
      async () =>
        await import('../pages/Books').then((module) => ({
          default: module.Books,
        }))
    ),
    path: '/books',
    title: 'Book list',
  },
  [ProtectedPages.AddBook]: {
    component: lazy(
      async () =>
        await import('../pages/BookForm').then((module) => ({
          default: module.BookForm,
        }))
    ),
    path: '/add',
    title: 'Add Book',
  },
  [ProtectedPages.EditBook]: {
    component: lazy(
      async () =>
        await import('../pages/BookForm').then((module) => ({
          default: module.BookForm,
        }))
    ),
    path: '/edit/:id',
    title: 'Edit Book',
  },
}
