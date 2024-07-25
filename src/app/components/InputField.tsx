import clsx from 'clsx'
import { forwardRef, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errors?: string
}

const InputField = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className={`${clsx(
        'w-full rounded-[10px] border border-gray-300 bg-slate-50 px-4 py-2 text-sm leading-6 placeholder-gray-400',
        'focus:outline-none',
        'lg:p-4 lg:text-base',
        props.className
      )}`}
    />
  )
})

export default InputField