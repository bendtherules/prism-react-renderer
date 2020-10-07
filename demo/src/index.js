import React from "react";
import { render } from "react-dom";
import { Wrapper, Title, Pre, LineNo } from "./styles";

import Highlight, { defaultProps, useHighlight } from "@bendtherules/prism-react-renderer";
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
    <h1>Welcome to prism-react-renderer!</h1>
    <Title>Using &lt;Highlight/&gt; component -</Title>
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
    <Title>Using useHighlight with explicit render</Title>
    <HighlightConsumer />
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
