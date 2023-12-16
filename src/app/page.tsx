"use client";

import { FloatLeft } from '@/components/floatLeft'
import { JumbledText } from '@/components/jumbledText'
import styled from 'styled-components';
import { useContent } from '@/lib/ContentContext';
import { Link } from '@/components/link';

const Home = () => {
  const content = useContent()
  return (
    <main>
      <FloatLeft>
        <JumbledText padded weight='600' text={content.primaryParagraph} size="2rem" />
        <JumbledText delay={500} text={content.secondaryParagraph} size="0.9rem" />
        <br />
        <JumbledText delay={1000} text={content.tertiaryParagraph} size="0.9rem" />
        <br />
        <LinkList>
          {content.links.map((link, index) => <Link
            key={link.id}
            href={link.href ?? undefined}
            id={`link-${link.id}`}
          >
            <span>
              <JumbledText
                backgrounded
                weight="200"
                delay={index * 100 + 1500}
                text={`0x${index.toString(16)}.`}
                size="0.9rem"
              />
              <JumbledText
                weight="200"
                delay={index * 100 + 1500}
                text={`${link.title}`}
                size="0.9rem"
              />
            </span>
          </Link>)}
        </LinkList>
      </FloatLeft>
    </main>
  )
}

const LinkList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export default Home;