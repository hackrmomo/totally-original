import React, { useEffect, useState } from "react";
import styled from "styled-components";

const jumbledTextCipheredDictionary = ".-/<>?~`!@#$%^&*()_+{}|:\\";
const jumbledTextCipheredDictionaryLength = jumbledTextCipheredDictionary.length;

export const JumbledText = ({ text }: { text: string }) => {
  let renderedTextBase = ""
  let resolvedIndices = new Array(text.length).fill(false);
  let threshold = 0.01;
  const thresholdMultiplier = 1.04 * 66.0 / text.length;
  const [renderedText, setRenderedText] = useState<string>("");

  useEffect(() => {
    repeatInInterval(() => {
      // start off by initializing the text to start with all -'s one by one
      if (renderedTextBase.length < text.length) {
        renderedTextBase += "--";
        renderedTextBase = renderedTextBase.length > text.length ? renderedTextBase.substring(0, text.length) : renderedTextBase;
        setRenderedText(renderedTextBase);
      }
      // if the text is fully initialized, start resolving the text
      else {
        for (let i = 0; i < text.length; i++) {
          const shouldResolveCurrentIndex = Math.random() < threshold;
          if (shouldResolveCurrentIndex && !resolvedIndices[i]) {
            renderedTextBase = renderedTextBase.substring(0, i) + text[i] + renderedTextBase.substring(i + 1);
            setRenderedText(renderedTextBase);
            resolvedIndices[i] = true;
            threshold *= thresholdMultiplier;
          } else if (!resolvedIndices[i]) {
            renderedTextBase = renderedTextBase.substring(0, i) + jumbledTextCipheredDictionary[Math.floor(Math.pow(Math.random(), 7) * jumbledTextCipheredDictionaryLength)] + renderedTextBase.substring(i + 1);
            setRenderedText(renderedTextBase);
          }
        }
      }
    }, 30, 10000, () => {
      setRenderedText(text);
    });
  }, [text]);
  
  return <StyledSpan>{renderedText}</StyledSpan>;
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

const StyledSpan = styled.span`
  font-family: "DM Mono", monospace;
  font-size: 1.5rem;
  padding: 1rem;
`;