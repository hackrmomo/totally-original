"use client";

import styled from 'styled-components'
import { JumbledText } from './jumbledText';
import { Link } from './link';
import { useContent } from '@/lib/ContentContext';
import { social } from '@prisma/client';


export const Footer = () => {
  const content = useContent()
  return <>
    <FooterRoot>
      <SocialsContainer>
        {content && content.socials.length > 0 && <>
          <Link href={`tel:${content.phone}`}>
            <JumbledText backgrounded weight="200" text="phone" />
          </Link>
          <Link href={`mailto:${content.email}`}>
            <JumbledText backgrounded weight="200" text="email" />
          </Link>
          {content.socials.map((social: social) =>
            <Link key={social.id} href={social.href}>
              <JumbledText
                backgrounded
                weight='200'
                text={social.title}
              />
            </Link>
          )}
        </>}
      </SocialsContainer>
    </FooterRoot>
  </>
}

const SocialsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
`

const FooterRoot = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
`