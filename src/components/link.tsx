"use client";

import styled from "styled-components"
import NextLink from "next/link"
import { HTMLAttributeAnchorTarget } from "react"

export const Link = (props: {
  id?: string
  href: string
  target?: HTMLAttributeAnchorTarget
  children?: React.ReactNode
}) => {
  return <LinkItem {...props} />
}

const LinkItem = styled(NextLink)`
  display: inline-block;
  position: relative;
  text-decoration: none;
  color: #fff;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 1px;
    bottom: 0;
    left: 0;
    color: #59618b;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }
  &:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`