'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import clsx from 'clsx'
import { HiExclamationCircle } from 'react-icons/hi'
import { ImSpinner2 } from 'react-icons/im'
import { AuthenticationPayload, useSignIn } from '../api/auth'
import InputField from '../components/InputField'
import InputPassword from '../components/InputPassword'
import notification from '../helpers/notification'
import { useLogin } from '../hooks/useLogin'

const LoginSchema = z.object({
  username: z.string().min(1, 'Required'),
  password: z.string().min(1, 'Required'),
})

const FormData = () => {
  const router = useRouter()
  const { saveAuth } = useLogin()
  const { mutateAsync: authUser, isLoading } = useSignIn()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthenticationPayload>({
    resolver: zodResolver(LoginSchema),
  })

  const onSubmit = async (data: AuthenticationPayload) => {
    try {
      const response = await authUser({
        username: data.username,
        password: data.password,
      })

      if (response) {
        notification('Login success!', 'success', 3000)
        router.push('/')
      }
      saveAuth(response)
    } catch (error) {
      notification('Login fail!', 'error', 3000)
    }
  }

  return (
    <form
      className="my-1 flex w-[320px] flex-col items-center justify-center px-2 md:w-[520px] lg:w-[39.375rem]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-5 w-full">
        <InputField
          type="text"
          placeholder="Username"
          className={`${
            errors.username
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 focus:border-gray-300'
          } bg-white`}
          {...register('username')}
        />
        {errors.username && (
          <small className="mt-0.5 flex items-center text-red-500">
            <HiExclamationCircle className="ml-1" />
            {errors.username?.message}
          </small>
        )}
      </div>
      <div className="mb-5 w-full">
        <InputPassword
          placeholder="Password"
          className={`${
            errors.password
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 focus:border-gray-300'
          }`}
          {...register('password')}
        />
        {errors.password && (
          <small className="mt-0.5 flex items-center text-red-500">
            <HiExclamationCircle className="ml-1" />
            {errors.password?.message}
          </small>
        )}
      </div>
      <div className="w-full">
        <button
          type="submit"
          className={clsx(
            'w-full justify-center rounded-md bg-blue-600 px-7 py-[14px] text-center text-white',
            'hover:bg-[#1e429f]',
            'disabled:cursor-not-allowed disabled:border-0 disabled:bg-blue-600 disabled:opacity-50'
          )}
        >
          {isLoading ? (
            <div className="flex justify-center">
              <ImSpinner2 className="animate-spin" />
            </div>
          ) : (
            <span>Login</span>
          )}
        </button>
      </div>
    </form>
  )
}

export default FormData
