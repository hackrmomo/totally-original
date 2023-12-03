import React, { useEffect, useState } from "react";
import styled from "styled-components";

const jumbledTextCipheredDictionary = ".-/?&*;:^%$#@!";
const jumbledTextCipheredDictionaryLength = jumbledTextCipheredDictionary.length;

export const JumbledText = ({ text, size, padded = false, delay = 0, backgrounded = false, weight = "400"}: { text: string, size?: string | number, padded?: boolean, delay?: number, backgrounded?: boolean, weight?: "200" | "400" | "600" }) => {
  let renderedTextBase = ""
  let resolvedIndices = new Array(text.length).fill(false);
  let threshold = 0.01;
  const thresholdMultiplier = 1.1;
  // adding a space reserves the space for the text to be rendered
  const [unresolvedtext, setunresolvedtext] = useState<string>(" ");
  const [resolvedtext, setresolvedtext] = useState<string>(" ");

  const resolveText = () => {
    repeatInInterval(() => {
      // start off by initializing the text to start with all -'s one by one
      if (renderedTextBase.length < text.length) {
        renderedTextBase += jumbledTextCipheredDictionary[Math.floor(Math.pow(Math.random(), 7) * jumbledTextCipheredDictionaryLength)] + jumbledTextCipheredDictionary[Math.floor(Math.pow(Math.random(), 7) * jumbledTextCipheredDictionaryLength)]
        renderedTextBase = renderedTextBase.length > text.length ? renderedTextBase.substring(0, text.length) : renderedTextBase;
      }
      for (let i = 0; i < Math.min(text.length, renderedTextBase.length); i++) {
        const shouldResolveCurrentIndex = Math.random() < threshold;
        const shouldReshuffleCurrentIndex = Math.random() < threshold * 3;
        if (shouldResolveCurrentIndex && !resolvedIndices[i]) {
          renderedTextBase = renderedTextBase.substring(0, i) + text[i] + renderedTextBase.substring(i + 1);
          resolvedIndices[i] = true;
        } else if (!resolvedIndices[i] && shouldReshuffleCurrentIndex) {
          renderedTextBase = renderedTextBase.substring(0, i) + jumbledTextCipheredDictionary[Math.floor(Math.pow(Math.random(), 7) * jumbledTextCipheredDictionaryLength)] + renderedTextBase.substring(i + 1);
        }
        setunresolvedtext(resolvedIndices.map((resolved, index) => resolved ? ` ` : renderedTextBase[index]).join("").substring(0, renderedTextBase.length));
        setresolvedtext(resolvedIndices.map((resolved, index) => resolved ? renderedTextBase[index] : ` `).join("").substring(0, renderedTextBase.length));
      }
      threshold *= thresholdMultiplier;

    }, 40, 20000, () => {
      setunresolvedtext("");
      setresolvedtext(text);
    });
  }

  useEffect(() => {
    setTimeout(() => {
      resolveText();
    }, delay); 
  }, [text]);

  return <StyledSpan weight={weight} backgrounded={backgrounded} padded={padded} size={size} unresolvedtext={`${unresolvedtext}`}>{`${resolvedtext}`}</StyledSpan>
};

const repeatInInterval = (func: () => void, milliseconds: number, untilMilliseconds: number, finallyDo: () => void) => {
  let interval = setInterval(() => {
    func();
  }, milliseconds);
  setTimeout(() => {
    clearInterval(interval);
    finallyDo();
  }, untilMilliseconds);
}

const StyledSpan = styled.span<{ unresolvedtext: string, size?: string | number, padded: boolean, backgrounded: boolean, weight: "200" | "400" | "600" }>`
  font-family: 'Roboto Mono', monospace;
  font-weight: ${props => props.weight};
  position: relative;
  font-size: ${props => props.size ?? "1rem"};
  padding: ${props => props.padded ? "1rem" : "0"} ${props => props.padded ? "1rem" : "0"} ${props => props.padded ? "1rem" : "0"} 0;
  top: 0;
  left: 0;
  color: ${props => props.backgrounded ? "#494d64" : "#f4dbd6"};
  white-space: pre-wrap;
  
  &::before {
    content: "${props => props.unresolvedtext}";
    font-family: 'Roboto Mono', monospace;
    font-weight: ${props => props.weight};
    font-size: ${props => props.size ?? "1rem"};
    padding: ${props => props.padded ? "1rem" : "0"} ${props => props.padded ? "1rem" : "0"} ${props => props.padded ? "1rem" : "0"} 0;
    position: absolute;
    top: 0;
    left: 0;
    color: #494d64;
    white-space: pre-wrap;
  }
`;