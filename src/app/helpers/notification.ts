import { toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

const notification = (
  message: string,
  type: string,
  autoClose: number,
  position?: string,
) => {
  const options: string | object = {
    autoClose: autoClose,
    position: position || 'top-right',
  }
  switch (type) {
    case 'success':
      return toast.success(message, options)
    case 'error':
      return toast.error(message, options)
    default:
      return toast.info(message, options)
  }
}

export default notification
