"use client";
import { Root } from '@/components/Root'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import StyledComponentsRegistry from '@/lib/registry'
import "@/app/globals.css"
import { Suspense, use, useEffect, useState } from 'react';
import { ContentProvider, useContent } from '@/lib/ContentContext';
import Loading from './loading';

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

  return (
    <html lang="en">
      <head>
        <title>{content.fullName}</title>
        <link rel="icon" href={content.logoUrl ?? undefined} />
      </head>
      <body>
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
