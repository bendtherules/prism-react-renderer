import React from "react";
import { render, cleanup } from "@testing-library/react";

import Highlight from "../Highlight";
import DefaultRenderer from "../DefaultRenderer";
import defaultProps from "../../defaultProps";

const exampleCode = `
(function someDemo() {
  var test = "Hello World!";
  console.log(test);
})();

return () => <App />;
`.trim();

describe("<Highlight /> with DefaultRender", () => {
  afterEach(cleanup);

  describe("snapshots", () => {
    it("renders correctly", () => {
      const { container } = render(
        <Highlight {...defaultProps} code={exampleCode} language="jsx">
          {(input) => <DefaultRenderer {...input} />}
        </Highlight>
      );

      expect(container).toMatchSnapshot();
    });

    it("renders unsupported languages correctly", () => {
      const { container } = render(
        <Highlight
          {...defaultProps}
          code={exampleCode}
          language="abcdefghijklmnop"
        >
          {(input) => <DefaultRenderer {...input} />}
        </Highlight>
      );

      expect(container).toMatchSnapshot();
    });

    it("renders without style props when no theme is passed", () => {
      const { container } = render(
        <Highlight
          {...defaultProps}
          theme={undefined}
          code={exampleCode}
          language="jsx"
        >
          {(input) => <DefaultRenderer {...input} />}
        </Highlight>
      );

      expect(container.innerHTML.includes("style")).toBeFalsy();
    });
  });
});
