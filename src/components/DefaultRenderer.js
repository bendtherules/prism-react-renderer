import React from "react";

export default function DefaultRenderer(props) {
  const { tokens, className, style, getLineProps, getTokenProps } = props;

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
