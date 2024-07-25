import clsx from 'clsx'
import React, { useState } from 'react'
import { forwardRef } from 'react'
import { HiOutlineEye } from 'react-icons/hi'
import { HiOutlineEyeSlash } from 'react-icons/hi2'

interface InputPasswordProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ className, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    const handleTogglePassword = () => {
      setShowPassword(!showPassword)
    }

    return (
      <div className="relative" ref={ref}>
        <div className="flex items-center">
          <input
            type={showPassword ? 'text' : 'password'}
            {...rest}
            className={`${clsx(
              'w-full rounded-[10px] border-gray-300 px-4 py-2 text-sm leading-6 placeholder-gray-400',
              'lg:text-base) lg:p-4',
              className
            )}`}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500"
            onClick={handleTogglePassword}
          >
            {showPassword ? (
              <HiOutlineEyeSlash className="h-5 w-5" />
            ) : (
              <HiOutlineEye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    )
  }
)

export default InputPassword