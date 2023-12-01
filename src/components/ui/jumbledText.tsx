import React, { useEffect, useState } from "react";
import styled from "styled-components";

const jumbledTextCipheredDictionary = ".-/?&*;:^%$#@!";
const jumbledTextCipheredDictionaryLength = jumbledTextCipheredDictionary.length;

export const JumbledText = ({ text }: { text: string }) => {
  let renderedTextBase = ""
  let resolvedIndices = new Array(text.length).fill(false);
  let threshold = 0.01;
  const thresholdMultiplier = 1.1;
  const [unresolvedText, setUnresolvedText] = useState<string>("");
  const [resolvedText, setResolvedText] = useState<string>("");

  useEffect(() => {
    repeatInInterval(() => {
      // start off by initializing the text to start with all -'s one by one
      if (renderedTextBase.length < text.length) {
        renderedTextBase += jumbledTextCipheredDictionary[Math.floor(Math.pow(Math.random(), 7) * jumbledTextCipheredDictionaryLength)] + jumbledTextCipheredDictionary[Math.floor(Math.pow(Math.random(), 7) * jumbledTextCipheredDictionaryLength)]
        renderedTextBase = renderedTextBase.length > text.length ? renderedTextBase.substring(0, text.length) : renderedTextBase;
        setUnresolvedText(renderedTextBase);
        setResolvedText(Array(renderedTextBase.length).fill(" ").join(""));
      }
      for (let i = 0; i < Math.min(text.length, renderedTextBase.length); i++) {
        const shouldResolveCurrentIndex = Math.random() < threshold;
        const shouldReshuffleCurrentIndex = Math.random() < threshold * 3;
        if (shouldResolveCurrentIndex && !resolvedIndices[i]) {
          renderedTextBase = renderedTextBase.substring(0, i) + text[i] + renderedTextBase.substring(i + 1);
          resolvedIndices[i] = true;
          setUnresolvedText((resolvedIndices.map((resolved, index) => resolved ? ` ` : renderedTextBase[index]).join("")).substring(0, renderedTextBase.length));
          setResolvedText(resolvedIndices.map((resolved, index) => resolved ? renderedTextBase[index] : ` `).join("").substring(0, renderedTextBase.length));
        } else if (!resolvedIndices[i] && shouldReshuffleCurrentIndex) {
          renderedTextBase = renderedTextBase.substring(0, i) + jumbledTextCipheredDictionary[Math.floor(Math.pow(Math.random(), 7) * jumbledTextCipheredDictionaryLength)] + renderedTextBase.substring(i + 1);
          setUnresolvedText(resolvedIndices.map((resolved, index) => resolved ? ` ` : renderedTextBase[index]).join("").substring(0, renderedTextBase.length));
          setResolvedText(resolvedIndices.map((resolved, index) => resolved ? renderedTextBase[index] : ` `).join("").substring(0, renderedTextBase.length));
        }
      }
      threshold *= thresholdMultiplier;

    }, 75, 20000, () => {
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