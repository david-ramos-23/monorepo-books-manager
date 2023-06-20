import type { UserType } from '../../../server/src/models/user'
import { fetchData } from './utils'

export async function getLoggedInUser(): Promise<UserType> {
  return await fetchData('/api/users', { method: 'GET' })
}

export interface SignUpRequest {
  username: string
  email: string
  password: string
}

export async function signUp({
  username,
  email,
  password,
}: SignUpRequest): Promise<UserType> {
  return await fetchData('/api/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  })
}

export interface LoginRequest {
  email: string
  password: string
}

export async function login({
  email,
  password,
}: LoginRequest): Promise<UserType> {
  return await fetchData('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
}

export async function logout() {
  await fetchData('/api/users/logout', { method: 'POST' })
}
