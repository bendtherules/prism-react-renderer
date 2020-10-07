import React from "react";
import { render } from "react-dom";
import { Wrapper, Title, Pre, LineNo } from "./styles";

import Highlight, {
  defaultProps,
  useHighlight,
  DefaultRenderer,
} from "@bendtherules/prism-react-renderer";
import theme from "prism-react-renderer/themes/oceanicNext";

const exampleCode = `
(function someDemo() {
  var test = "Hello World!";
  console.log(test);
})();

return () => <App />;
`.trim();

const App = () => (
  <Wrapper>
    <Title>Welcome to prism-react-renderer!</Title>
    <h2>Using &lt;Highlight/&gt; component -</h2>
    <Highlight
      {...defaultProps}
      code={exampleCode}
      language="jsx"
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              <LineNo>{i + 1}</LineNo>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </Pre>
      )}
    </Highlight>
    <h2>Using useHighlight with explicit render</h2>
    <HighlightConsumer />
    <h2>Using &lt;Highlight/&gt; component with DefaultRenderer-</h2>
    <Highlight
      {...defaultProps}
      code={exampleCode}
      language="jsx"
      theme={theme}
    >
      {(input) => <DefaultRenderer {...input} />}
    </Highlight>
  </Wrapper>
);

function HighlightConsumer() {
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
    <Pre className={className} style={style}>
      {tokens.map((line, i) => (
        <div {...getLineProps({ line, key: i })}>
          <div {...getLineProps({ line, key: i })}>
            <LineNo>{i + 1}</LineNo>
            {line.map((token, key) => (
              <span {...getTokenProps({ token, key })} />
            ))}
          </div>
        </div>
      ))}
    </Pre>
  );
}

render(<App />, document.getElementById("root"));
