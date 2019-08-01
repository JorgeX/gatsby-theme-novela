import React, { Component } from "react";
import styled from "@emotion/core";

import mediaqueries from "@styles/media";

interface CopyToClipboardProps {
  copyOnClick: string;
  successText?: string;
  iconFill?: string;
  children: React.ReactNodeArray | React.ReactNode;
}

class CopyToClipboard extends Component<
  CopyToClipboardProps,
  { copied: false }
> {
  state = {
    copied: false,
  };

  copyToClipboardOnClick = (text: string) => {
    const tempInput = document.createElement("input");
    document.body.appendChild(tempInput);
    tempInput.setAttribute("value", text);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    this.setState({
      copied: true,
    });
  };

  render() {
    const { copied } = this.state;
    const { copyOnClick, iconFill, children, successText } = this.props;

    return (
      <CopyIconContainer
        copied={copied}
        onClick={() => this.copyToClipboardOnClick(copyOnClick)}
        data-a11y="false"
      >
        {copied ? (
          <CopyIconText>
            <strong>{successText || copyOnClick}</strong> copied to clipboard{" "}
            <CopiedIcon />
          </CopyIconText>
        ) : (
          <>
            {children} <CopyIcon fill={iconFill} />
          </>
        )}
      </CopyIconContainer>
    );
  }
}

export default CopyToClipboard;

const CopyIconContainer = styled.div`
  position: relative;
  cursor: ${p => (p.copied ? "initial" : "pointer")};

  svg {
    margin-left: 3px;
  }

  &[data-a11y="true"]:focus::after {
    content: "";
    position: absolute;
    left: -50%;
    top: -50%;
    width: 200%;
    height: 200%;
    border: 2px solid ${p => p.theme.colors.accent};
    border-radius: 5px;
  }
`;

const CopyIconText = styled.p`
  display: flex;
  align-items: center;
  color: #3f7871;
  opacity: 0;
  animation: fadein 1s linear forwards;

  @keyframes fadein {
    to {
      opacity: 1;
    }
  }

  strong {
    margin-right: 0.5rem;
  }

  svg {
    margin-left: 0.9rem;
  }

  ${mediaqueries.tablet`
    font-size: 1.4rem;
  `};
`;

const CopyIcon = ({ fill = "white" }) => (
  <svg
    width="13"
    height="15"
    viewBox="0 0 13 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    style={{ pointerEvents: "none" }}
  >
    <path
      d="M9.54545 0H1.36364C0.613636 0 0 0.613636 0 1.36364V10.9091H1.36364V1.36364H9.54545V0ZM11.5909 2.72727H4.09091C3.34091 2.72727 2.72727 3.34091 2.72727 4.09091V13.6364C2.72727 14.3864 3.34091 15 4.09091 15H11.5909C12.3409 15 12.9545 14.3864 12.9545 13.6364V4.09091C12.9545 3.34091 12.3409 2.72727 11.5909 2.72727ZM11.5909 13.6364H4.09091V4.09091H11.5909V13.6364Z"
      fill={fill}
    />
  </svg>
);

const CopiedIcon = ({ fill = "#3F7871" }) => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 3.33333H3.33333V5H5V3.33333ZM5 6.66667H3.33333V8.33333H5V6.66667ZM5 0C4.075 0 3.33333 0.75 3.33333 1.66667H5V0ZM8.33333 10H6.66667V11.6667H8.33333V10ZM13.3333 0V1.66667H15C15 0.75 14.25 0 13.3333 0ZM8.33333 0H6.66667V1.66667H8.33333V0ZM5 11.6667V10H3.33333C3.33333 10.9167 4.075 11.6667 5 11.6667ZM13.3333 8.33333H15V6.66667H13.3333V8.33333ZM13.3333 5H15V3.33333H13.3333V5ZM13.3333 11.6667C14.25 11.6667 15 10.9167 15 10H13.3333V11.6667ZM1.66667 3.33333H0V13.3333C0 14.25 0.741667 15 1.66667 15H11.6667V13.3333H1.66667V3.33333ZM10 1.66667H11.6667V0H10V1.66667ZM10 11.6667H11.6667V10H10V11.6667Z"
      fill={fill}
    />
  </svg>
);
