import { useRouter } from 'next/router'
import { useState } from 'react'
import FormData from './_form'

const Login = () => {
  return (
    <main className="flex w-full items-center justify-center bg-white">
      <div className="mx-2 flex w-full flex-col items-center justify-center py-16 lg:w-[39.375rem]">
        <div className="flex w-full flex-col items-center justify-center">
          <div className="mb-8 flex flex-col items-center justify-center text-center">
            <h1 className="mb-2 text-2xl font-bold leading-9 text-gray-900 lg:text-3xl">
              Login
            </h1>
          </div>
        </div>
        <FormData />
      </div>
    </main>
  )
}

export default Login
