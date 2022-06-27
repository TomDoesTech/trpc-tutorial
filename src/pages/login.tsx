import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import dynamic from 'next/dynamic'
import { CreateUserInput } from '../schema/user.schema'
import { trpc } from '../utils/trpc'

const LoginForm = dynamic(() => import('../components/LoginForm'), {
  ssr: false,
})

function LoginPage() {
  return (
    <div>
      <LoginForm />
    </div>
  )
}

export default LoginPage
