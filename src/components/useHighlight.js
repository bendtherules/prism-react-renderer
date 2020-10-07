// @flow

import React, {
  Component,
  type Node,
  useRef,
  useMemo,
  useCallback,
} from "react";
import normalizeTokens from "../utils/normalizeTokens";
import themeToDict, { type ThemeDict } from "../utils/themeToDict";

import type {
  Language,
  Token,
  LineInputProps,
  LineOutputProps,
  TokenInputProps,
  TokenOutputProps,
  RenderProps,
  PrismLib,
  PrismTheme,
} from "../types";

type Props = {
  Prism: PrismLib,
  theme?: PrismTheme,
  language: Language,
  code: string,
};

function useHighlight(args: Props) {
  const { Prism, theme, language, code } = args;

  const themeDict = useMemo(() => {
    const tmpDict = theme ? themeToDict(theme, language) : undefined;
    return tmpDict;
  }, [theme, language]);

  const getLineProps = useCallback(
    ({
      key,
      className,
      style,
      line,
      ...rest
    }: LineInputProps): LineOutputProps => {
      const output: LineOutputProps = {
        ...rest,
        className: "token-line",
        style: undefined,
        key: undefined,
      };

      if (themeDict !== undefined) {
        output.style = themeDict.plain;
      }

      if (style !== undefined) {
        output.style =
          output.style !== undefined ? { ...output.style, ...style } : style;
      }

      if (key !== undefined) output.key = key;
      if (className) output.className += ` ${className}`;

      return output;
    },
    [themeDict]
  );

  const getStyleForToken = ({ types, empty }: Token) => {
    const typesSize = types.length;

    if (themeDict === undefined) {
      return undefined;
    } else if (typesSize === 1 && types[0] === "plain") {
      return empty ? { display: "inline-block" } : undefined;
    } else if (typesSize === 1 && !empty) {
      return themeDict[types[0]];
    }

    const baseStyle = empty ? { display: "inline-block" } : {};
    // $FlowFixMe
    const typeStyles = types.map((type) => themeDict[type]);
    return Object.assign(baseStyle, ...typeStyles);
  };

  const getTokenProps = ({
    key,
    className,
    style,
    token,
    ...rest
  }: TokenInputProps): TokenOutputProps => {
    const output: TokenOutputProps = {
      ...rest,
      className: `token ${token.types.join(" ")}`,
      children: token.content,
      style: getStyleForToken(token),
      key: undefined,
    };

    if (style !== undefined) {
      output.style =
        output.style !== undefined ? { ...output.style, ...style } : style;
    }

    if (key !== undefined) output.key = key;
    if (className) output.className += ` ${className}`;

    return output;
  };

  const grammar = Prism.languages[language];
  const mixedTokens =
    grammar !== undefined ? Prism.tokenize(code, grammar, language) : [code];
  const tokens = normalizeTokens(mixedTokens);

  return {
    tokens,
    className: `prism-code language-${language}`,
    style: themeDict !== undefined ? themeDict.root : {},
    getLineProps: getLineProps,
    getTokenProps: getTokenProps,
  };
}

export default useHighlight;
