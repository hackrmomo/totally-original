"use client";
import { Root } from '@/components/Root'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import StyledComponentsRegistry from '@/lib/registry'
import "@/app/globals.css"
import { useRouter } from "next/navigation";
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Suspense, useEffect } from 'react';
import { ContentProvider, useContent } from '@/lib/ContentContext';
import Loading from './loading';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function App({
  children,
}:
  {
    children: React.ReactNode
  }) {
  return (
    <ContentProvider>
      <RootLayout>
        {children}
      </RootLayout>
    </ContentProvider>
  )
}

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const content = useContent()
  const { isAuthenticated } = useKindeBrowserClient()
  const { push } = useRouter()

  useEffect(() => {
    // add an event listener to listen for the key combination to login/logout, cmd+ctrl+L
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.ctrlKey && e.key === 'l') {
        // toggle the login state
        console.log('isAuthenticated', isAuthenticated)
        if (isAuthenticated) {
          push("/api/auth/logout")
        } else {
          push("/api/auth/login")
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  })

  return (
    <html lang="en">
      <head>
        <title>{content.fullName}</title>
        <link rel="icon" href={content.logoUrl ?? undefined} />
      </head>
      <body>
        <SpeedInsights />
        <StyledComponentsRegistry>
          {<Suspense fallback={<Loading />}>
            <Header />
            <Root>
              {children}
            </Root>
            <Footer />
          </Suspense>}
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
