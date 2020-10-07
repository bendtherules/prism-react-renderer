import React from "react";
import { render, cleanup } from "@testing-library/react";

import useHighlight from "../useHighlight";
import DefaultRenderer from "../DefaultRenderer";
import defaultProps from "../../defaultProps";

const exampleCode = `
(function someDemo() {
  var test = "Hello World!";
  console.log(test);
})();

return () => <App />;
`.trim();

describe("useHighlight() with DefaultRender", () => {
  afterEach(cleanup);

  describe("snapshots", () => {
    it("renders correctly", () => {
      function HighlightUser() {
        const input = useHighlight({
          ...defaultProps,
          code: exampleCode,
          language: "jsx",
        });

        return <DefaultRenderer {...input} />;
      }
      const { container } = render(<HighlightUser />);

      expect(container).toMatchSnapshot();
    });

    it("renders unsupported languages correctly", () => {
      function HighlightUser() {
        const input = useHighlight({
          ...defaultProps,
          code: exampleCode,
          language: "abcdefghijklmnop",
        });

        return <DefaultRenderer {...input} />;
      }

      const { container } = render(<HighlightUser />);

      expect(container).toMatchSnapshot();
    });

    it("renders without style props when no theme is passed", () => {
      function HighlightUser() {
        const input = useHighlight({
          ...defaultProps,
          theme: undefined,
          code: exampleCode,
          language: "jsx",
        });

        return <DefaultRenderer {...input} />;
      }

      const { container } = render(<HighlightUser />);

      expect(container.innerHTML.includes("style")).toBeFalsy();
    });
  });
});
