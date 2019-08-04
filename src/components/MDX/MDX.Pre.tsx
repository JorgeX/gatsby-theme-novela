import React from "react";

import CodeBlock from "./MDX.Code";

function preToCodeBlock(preProps) {
  if (
    preProps.children &&
    preProps.children.props &&
    preProps.children.props.mdxType === "code"
  ) {
    const {
      children: codeString,
      className = "",
      ...props
    } = preProps.children.props;

    const matches = className.match(/language-(?<lang>.*)/);

    return {
      codeString: codeString.trim(),
      className,
      language:
        matches && matches.groups && matches.groups.lang
          ? matches.groups.lang
          : "",
      ...props,
    };
  }
}

function PreBlock(preProps) {
  const props = preToCodeBlock(preProps);

  if (props) {
    return <CodeBlock {...props} />;
  } else {
    return <pre {...preProps} />;
  }
}

export default PreBlock;
