import * as url from '@/app/helpers/url'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { get, post } from '../helpers/api-helpers'
import { IUser } from '../types/user'

export interface AddUserPayload extends IUser {}

// ADD USER
export const addUser = (data: AddUserPayload) => {
  return post(url.USER, data)
}

export const useAddUser = () => {
  const client = useQueryClient()

  const mutation = useMutation(addUser, {
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [url.USER] })
    },
  })

  return {
    ...mutation,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    status: mutation.status,
  }
}

// GET USER
export const getListUser = async () => {
  const data = await get<IUser[]>(url.USER)
  return data
}

export const useListUser = () => {
  return useQuery({
    queryFn: getListUser,
    queryKey: [url.USER, 'LIST'],
    keepPreviousData: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })
}
