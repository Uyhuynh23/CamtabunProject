'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RootPage() {
  const router = useRouter()
  
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      router.push('/pages/home')
    } else {
      router.push('/pages/login')
    }
  }, [router])

  return null
}
