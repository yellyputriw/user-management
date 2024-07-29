'use client'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useListUser } from './api/user'
import UserCard from './components/UserCard'
import { useLogin } from './hooks/useLogin'

export default function Home() {
  const router = useRouter()
  const { revokeAuth, loggedIn } = useLogin()
  const { data } = useListUser()

  const handleLogout = () => {
    try {
      revokeAuth()
      router.push('/login')
    } catch {
      return null
    }
  }

  useEffect(() => {
    if (!loggedIn) {
      router.push('/login')
    }
  }, [loggedIn])

  return (
    <>
      <header className="flex w-full items-center justify-end px-12 py-6">
        <nav>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </header>
      <main className="flex flex-col gap-10 px-12 py-6">
        <div className="flex justify-start">
          <button
            type="button"
            onClick={() => router.push('/create-user')}
            className={clsx(
              'w-fit rounded-md bg-blue-600 px-3 py-1.5 text-center text-white',
              'hover:bg-[#1e429f]'
            )}
          >
            Add User
          </button>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {data &&
            data?.map((data) => (
              <UserCard
                key={data.id}
                name={data.name}
                address={data.address}
                email={data.email}
                phone={data.phone}
                username={data.username}
              />
            ))}
        </div>
      </main>
    </>
  )
}
