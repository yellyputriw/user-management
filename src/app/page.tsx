'use client'
import { useLogin } from "./hooks/useLogin";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const { revokeAuth } = useLogin()

  const handleLogout = () => {
    try {
      revokeAuth()
      router.push('/login')
    } catch {
      return null
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <button type="button" onClick={handleLogout}>Logout</button>
    </div>
  );
}
