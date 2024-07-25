import {
  MutationFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import { post } from '@/app/helpers/api-helpers'
import * as url from '@/app/helpers/url'

export interface AuthenticationPayload {
  username: string
  password: string
}

//* SIGN IN
export const signIn = (data: AuthenticationPayload) => {
  return post(url.AUTH, data)
}

export const useSignIn = () => {
  const client = useQueryClient()

  const mutation = useMutation(signIn, {
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [url.AUTH] })
    },
  })

  return {
    ...mutation,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    status: mutation.status,
  }
}
