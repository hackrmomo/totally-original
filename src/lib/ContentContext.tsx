"use client";

import { createContext, useContext, useEffect, useState, use } from 'react';
import { content, link, social } from '@prisma/client'

export type Content = content & {
  links: link[]
  socials: social[]
}

const contentContext: Content = {
  id: 1,
  email: '',
  fullName: '',
  firstName: '',
  lastName: '',
  logoUrl: '',
  phone: '',
  primaryParagraph: '',
  secondaryParagraph: '',
  tertiaryParagraph: '',
  links: [],
  socials: []
}

// Create the context
export const ContentContext = createContext<Content>(contentContext);

export const ContentProvider = (props: {
  children?: React.ReactNode
}) => {
  const [content, setContent] = useState<Content>(contentContext)
  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(res => {
        setContent(res)
      });
  }, [])

  return <>
    <ContentContext.Provider value={content}>
      {props.children}
    </ContentContext.Provider>
  </>;
}

export const useContent = () => {
  const context = use(ContentContext)
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider')
  }
  return context
}