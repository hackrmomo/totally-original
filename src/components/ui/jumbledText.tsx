import React, { useEffect, useState } from "react";
import styled from "styled-components";

const jumbledTextCipheredDictionary = ".-/<>?~`!@#$%^&*()_+{}|:\\";
const jumbledTextCipheredDictionaryLength = jumbledTextCipheredDictionary.length;

export const JumbledText = ({ text }: { text: string }) => {
  let renderedTextBase = ""
  let resolvedIndices = new Array(text.length).fill(false);
  let threshold = 0.01;
  const thresholdMultiplier = 1.04 * 66.0 / text.length;
  const [unresolvedText, setUnresolvedText] = useState<string>("");
  const [resolvedText, setResolvedText] = useState<string>("");

  useEffect(() => {
    repeatInInterval(() => {
      // start off by initializing the text to start with all -'s one by one
      if (renderedTextBase.length < text.length) {
        renderedTextBase += "---";
        renderedTextBase = renderedTextBase.length > text.length ? renderedTextBase.substring(0, text.length) : renderedTextBase;
        setUnresolvedText(renderedTextBase);
        setResolvedText(renderedTextBase.replace(/-/g, " "));
      }
      // if the text is fully initialized, start resolving the text
      else {
        for (let i = 0; i < text.length; i++) {
          const shouldResolveCurrentIndex = Math.random() < threshold;
          if (shouldResolveCurrentIndex && !resolvedIndices[i]) {
            renderedTextBase = renderedTextBase.substring(0, i) + text[i] + renderedTextBase.substring(i + 1);
            resolvedIndices[i] = true;
            setUnresolvedText(resolvedIndices.map((resolved, index) => resolved ? ` ` : renderedTextBase[index]).join(""));
            setResolvedText(resolvedIndices.map((resolved, index) => resolved ? renderedTextBase[index] : ` `).join(""));
            threshold *= thresholdMultiplier;
          } else if (!resolvedIndices[i]) {
            renderedTextBase = renderedTextBase.substring(0, i) + jumbledTextCipheredDictionary[Math.floor(Math.pow(Math.random(), 7) * jumbledTextCipheredDictionaryLength)] + renderedTextBase.substring(i + 1);
            setUnresolvedText(resolvedIndices.map((resolved, index) => resolved ? ` ` : renderedTextBase[index]).join(""));
          }
        }
      }
    }, 50, 10000, () => {
      setUnresolvedText("");
      setResolvedText(text);
    });
  }, [text]);
  
  return <StyledSpan unresolvedText={`${unresolvedText}`}>{`${resolvedText}`}</StyledSpan>
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

const StyledSpan = styled.span<{ unresolvedText: string }>`
  font-family: 'Roboto Mono', monospace;
  position: relative;
  font-size: 1.5rem;
  padding: 1rem;
  top: 0;
  left: 0;
  color: #f4dbd6;
  white-space: pre-wrap;
  
  &::before {
    content: "${props => props.unresolvedText}";
    font-family: 'Roboto Mono', monospace;
    font-size: 1.5rem;
    padding: 1rem;
    position: absolute;
    top: 0;
    left: 0;
    color: #494d64;
    white-space: pre-wrap;
  }
`;