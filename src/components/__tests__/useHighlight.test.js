import React from "react";
import { render, cleanup } from "@testing-library/react";

import useHighlight from "../useHighlight";
import defaultProps from "../../defaultProps";

const exampleCode = `
(function someDemo() {
  var test = "Hello World!";
  console.log(test);
})();

return () => <App />;
`.trim();

describe("useHighlight()", () => {
  afterEach(cleanup);

  describe("snapshots", () => {
    it("renders correctly", () => {
      function HighlightUser() {
        const {
          className,
          style,
          tokens,
          getLineProps,
          getTokenProps,
        } = useHighlight({
          ...defaultProps,
          code: exampleCode,
          language: "jsx",
        });

        return (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        );
      }
      const { container } = render(<HighlightUser />);

      expect(container).toMatchSnapshot();
    });

    it("renders unsupported languages correctly", () => {
      function HighlightUser() {
        const {
          className,
          style,
          tokens,
          getLineProps,
          getTokenProps,
        } = useHighlight({
          ...defaultProps,
          code: exampleCode,
          language: "abcdefghijklmnop",
        });

        return (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        );
      }

      const { container } = render(<HighlightUser />);

      expect(container).toMatchSnapshot();
    });

    it("renders without style props when no theme is passed", () => {
      function HighlightUser() {
        const {
          className,
          style,
          tokens,
          getLineProps,
          getTokenProps,
        } = useHighlight({
          ...defaultProps,
          theme: undefined,
          code: exampleCode,
          language: "jsx",
        });

        return (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        );
      }

      const { container } = render(<HighlightUser />);

      expect(container.innerHTML.includes("style")).toBeFalsy();
    });
  });

  describe("getLineProps", () => {
    it("transforms lineProps inputs correctly", () => {
      const input = {
        key: "line-1",
        style: { cssProp: "test" },
        className: "line-class",
        line: [{ types: ["punctuation"], content: "!" }],
        restPropsTest: true,
      };

      function HighlightUser() {
        const {
          className,
          style,
          tokens,
          getLineProps,
          getTokenProps,
        } = useHighlight({
          ...defaultProps,
          code: exampleCode,
          language: "jsx",
        });

        const output = getLineProps(input);

        expect(output).toEqual({
          key: "line-1",
          style: {
            cssProp: "test",
            backgroundColor: null,
            color: expect.any(String),
          },
          className: "token-line line-class",
          restPropsTest: true,
        });

        return null;
      }

      render(<HighlightUser />);
    });
  });

  describe("getTokenProps", () => {
    it("transforms tokenProps inputs correctly", () => {
      const input = {
        key: "token-1",
        style: { cssProp: "test" },
        className: "token-class",
        token: { types: ["punctuation"], content: "!" },
        restPropsTest: true,
      };

      function HighlightUser() {
        const {
          className,
          style,
          tokens,
          getLineProps,
          getTokenProps,
        } = useHighlight({
          ...defaultProps,
          code: exampleCode,
          language: "jsx",
        });

        const output = getTokenProps(input);

        expect(output).toEqual({
          key: "token-1",
          style: { cssProp: "test", color: expect.any(String) },
          className: "token punctuation token-class",
          restPropsTest: true,
          children: "!",
        });

        return null;
      }

      render(<HighlightUser />);
    });

    it("transforms constructor token style correctly", () => {
      // From https://github.com/FormidableLabs/prism-react-renderer/issues/11

      function HighlightUser() {
        const {
          className,
          style,
          tokens,
          getLineProps,
          getTokenProps,
        } = useHighlight({
          ...defaultProps,
          code: "open Common;",
          language: "reason",
        });

        const line = tokens[0];
        const token = line[2];
        const output = getTokenProps({ token, key: 2 });

        expect(typeof output.style).not.toBe("function");

        return null;
      }

      render(<HighlightUser />);
    });
  });
});
