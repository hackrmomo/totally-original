import {} from "react"
import styled from "styled-components"

export const FloatLeft = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 5rem;
  padding-right: 5rem;
  justify-content: center;

  @media screen and (max-width: 1024px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`