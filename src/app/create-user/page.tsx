'use client'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { ImSpinner2 } from 'react-icons/im'
import { AddUserPayload, useAddUser } from '../api/user'
import InputField from '../components/InputField'
import InputPassword from '../components/InputPassword'
import notification from '../helpers/notification'

const create = () => {
  const router = useRouter()
  const { mutateAsync: addUser, isLoading } = useAddUser()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddUserPayload>({})

  const onSubmit = async (data: AddUserPayload) => {
    try {
      const response = await addUser({
        email: data.email,
        username: data.username,
        password: data.password,
        name: data.name,
        address: data.address,
        phone: data.phone,
      })

      if (response) {
        notification('Create success!', 'success', 3000)
        router.push('/')
      }
    } catch (error) {
      notification('Create fail!', 'error', 3000)
    }
  }

  return (
    <main className="flex w-full items-center justify-center bg-white">
      <div className="mx-2 flex w-full flex-col items-center justify-center py-16 lg:w-[39.375rem]">
        <div className="flex w-full flex-col items-center justify-center">
          <div className="mb-8 flex flex-col items-center justify-center text-center">
            <h1 className="mb-2 text-2xl font-bold leading-9 text-gray-900 lg:text-3xl">
              Create User
            </h1>
          </div>
        </div>
        <form
          className="my-1 flex w-[320px] flex-col items-center justify-center px-2 md:w-[520px] lg:w-[39.375rem]"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Email */}
          <div className="mb-5 w-full">
            <InputField
              type="email"
              placeholder="Email"
              className="bg-white"
              {...register('email')}
            />
          </div>

          {/* Username */}
          <div className="mb-5 w-full">
            <InputField
              type="text"
              placeholder="Username"
              className="bg-white"
              {...register('username')}
            />
          </div>

          {/* Password */}
          <div className="mb-5 w-full">
            <InputPassword
              type="password"
              placeholder="Password"
              className="bg-white"
              {...register('password')}
            />
          </div>

          {/* Name */}
          <div className="flex w-full items-center gap-5">
            <div className="mb-5 w-full">
              <InputField
                type="text"
                placeholder="First Name"
                className="bg-white"
                {...register('name.firstname')}
              />
            </div>
            <div className="mb-5 w-full">
              <InputField
                type="text"
                placeholder="Last Name"
                className="bg-white"
                {...register('name.lastname')}
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="mb-5 w-full">
            <InputField
              type="text"
              placeholder="Phone Number"
              className="bg-white"
              {...register('phone')}
            />
          </div>

          {/* Address */}
          <div className="flex w-full items-center gap-5">
            <div className="mb-5 w-full">
              <InputField
                type="text"
                placeholder="Street"
                className="bg-white"
                {...register('address.street')}
              />
            </div>
            <div className="mb-5 w-full">
              <InputField
                type="number"
                placeholder="Number"
                className="bg-white"
                {...register('address.number')}
              />
            </div>
          </div>
          <div className="flex w-full items-center gap-5">
            <div className="mb-5 w-full">
              <InputField
                type="text"
                placeholder="City"
                className="bg-white"
                {...register('address.city')}
              />
            </div>
            <div className="mb-5 w-full">
              <InputField
                type="text"
                placeholder="Zipcode"
                className="bg-white"
                {...register('address.zipcode')}
              />
            </div>
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
                <span>Submit</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default create
