/* eslint-disable @next/next/no-img-element */
"use client";

import styled from "styled-components";
import { useContent } from "@/lib/ContentContext";

export const Header = () => {
  const content = useContent()
  return <HeaderRoot>
    <a href="/">
      <img src={content.logoUrl ?? undefined} alt={content.fullName} />
    </a>
  </HeaderRoot>
}

const HeaderRoot = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  padding: 2rem;
`