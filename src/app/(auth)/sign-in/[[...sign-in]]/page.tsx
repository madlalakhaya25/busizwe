import { SignIn } from '@clerk/nextjs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your Busizwe Burial Society member account.',
}

export default function SignInPage() {
  return (
    <SignIn
      appearance={{
        elements: {
          rootBox: 'w-full',
          card: 'shadow-none bg-transparent p-0',
          headerTitle: 'text-2xl font-bold text-[#014D4E]',
          headerSubtitle: 'text-[#6b6b6b]',
          formButtonPrimary: 'bg-[#014D4E] hover:bg-[#013638] text-white',
          footerActionLink: 'text-[#C89B3C] hover:text-[#A8832A]',
          identityPreviewEditButton: 'text-[#C89B3C]',
          formFieldInput: 'rounded-lg border-[#e0d9cc] focus:border-[#014D4E] focus:ring-[#014D4E]',
          socialButtonsBlockButton: 'border-[#e0d9cc] hover:bg-[#F7F3EA]',
        },
      }}
      fallbackRedirectUrl="/dashboard"
      signUpUrl="/sign-up"
    />
  )
}
