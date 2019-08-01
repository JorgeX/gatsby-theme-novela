import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/core";
import { useColorMode } from "theme-ui";

import {
  getHighlightedTextPositioning,
  getSelectionDimensions,
  getSelectionText,
} from "@utils";

import { IAuthorNode } from "@typings";

interface MenuFloatState {
  x: number;
  y: number;
  show: boolean;
}

interface MenuFloatProps {
  author: IAuthorNode;
}

/**
 * Values we get to be able to ensure the positionting context are correct!
 * Padding is derviced from the CSS value in Editor
 */
const MENU_WIDTH: number = 225;
const MENU_HEIGHT: number = 46;

function ArticelShare({ author }: MenuFloatProps) {
  const [colorMode] = useColorMode();
  const [text, setText] = useState("");
  const [focus, setFocus] = useState(false);
  const [canTweet, setCanTweet] = useState(true);
  const [{ x, y, show }, setPosition] = useState<MenuFloatState>({
    x: 0,
    y: 0,
    show: false,
  });

  const share = generateShare(text, author.name);
  const isDark = colorMode === "dark";

  useEffect(() => {
    const events: string[] = ["keydown", "keyup", "mouseup", "resize"];

    function handleMenuFloatSettings() {
      /**
       * Why is there a setTimeout here?
       * There is an issue with clicking on highlited text and the browsers ability
       * to calcualte the correct ranges. If you highlight text, then click on it,
       * the window.selection values will give the previous ranges instead of the current!
       */
      setTimeout(() => {
        const article = document.getElementsByTagName("article")[0];
        const paragraphOffset = document.getElementsByTagName("p")[0]
          .offsetLeft;

        if (!article) return;

        // We want to not show the menu float in code blocks
        const codeBlocks = Array.from(
          article.getElementsByClassName(".prism-code"),
        );
        const isHighlightedInCodeBlock = codeBlocks.some(block =>
          window.getSelection().containsNode(block, true),
        );

        if (isHighlightedInCodeBlock) return;

        const articleBox = article.getBoundingClientRect() as DOMRect;

        const { width, height } = getSelectionDimensions();
        const { x, y } = getHighlightedTextPositioning();

        /**
         * Get the X and Y offsets of the editors Left and Top positions
         * If the height is great than 20 (the user has highlighted more than 2 rows of text)
         * then start the position from the left most edge so we can center the bar in
         * the middle of the text area
         */
        const offset: { x: number; y: number } = {
          x: height > 29 ? paragraphOffset : x,
          y: y - articleBox.y - 160,
        };

        setPosition({
          x: offset.x + width / 2 - MENU_WIDTH / 2,
          y: offset.y - MENU_HEIGHT - 5,
          show: width > 1,
        });

        setText(getSelectionText());
      }, 0);
    }

    // attach all events
    events.forEach(event =>
      window.addEventListener(event, handleMenuFloatSettings),
    );

    return () => {
      // remove all events after mount
      events.forEach(event =>
        window.removeEventListener(event, handleMenuFloatSettings),
      );
    };
  }, []);

  /**
   * Small workaround to set the focus once the x and y positiosn are set.
   * If this is not here the user would see a quick flash of the floating bar
   * in its old position and then animating to the new location. We don't want that.
   */
  useEffect(() => {
    setTimeout(() => {
      const { width } = getSelectionDimensions();
      setFocus(width > 1);
    }, 0);
  }, [show]);

  function handleCopyClick() {
    const tempInput = document.createElement("input");
    document.body.appendChild(tempInput);
    tempInput.setAttribute("value", text);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
  }

  /**
   * Setting the ability to tweet. If the user highlights more than the allowed
   * characters we need to give them feedback that it's too long to tweet.
   */
  useEffect(() => {
    const tweetLimit = 280;
    const otherCharactersInTweet = '""—  '; // 2 quotes, 1 emdash, 2 spaces
    const url = window.location.href;
    const tweet = text + author.name + url + otherCharactersInTweet;

    setCanTweet(tweet.length <= tweetLimit);
  }, [text]);

  return (
    <MenuFloat
      style={{
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        display: show && focus ? "flex" : "none",
        pointerEvents: show && focus ? "initial" : "none",
      }}
      isDark={isDark}
    >
      <MenuText>Share: </MenuText>
      <ReferralLink disabled={!canTweet} share={share.twitter}>
        <TwitterIcon />
      </ReferralLink>
      <ReferralLink disabled={false} share={share.linkedin}>
        <LinkedInIcon />
      </ReferralLink>
      <MenuDivider />
      <MenuButton onClick={handleCopyClick} aria-label="Copy selected text">
        <CopyIcon />
      </MenuButton>
    </MenuFloat>
  );
}

export default ArticelShare;

function ReferralLink({ disabled, share, children }) {
  function handleClick(event) {
    event.preventDefault();
    if (disabled) return;

    window.open(
      share,
      "",
      "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600",
    );
  }

  return (
    <MenuShare
      href={disabled ? "" : share}
      onClick={handleClick}
      disabled={disabled}
    >
      <Hidden>Share the selected text</Hidden>
      {children}
    </MenuShare>
  );
}

function generateShare(shareText: string, author: string) {
  if (!shareText) return {};
  const url = window.location.href;

  return {
    twitter: `https://twitter.com/intent/tweet?text="${shareText}" — ${author} ${url}`,
    linkedin: `http://www.linkedin.com/shareArticle?mini=true&url=${url}&summary=${shareText}&title=${shareText}`,
  };
}

const popUpwards = keyframes`
  0% {
    transform:matrix(.97,0,0,1,0,12);
    opacity:0
  }
  20% {
    transform:matrix(.99,0,0,1,0,2);
    opacity:.7
  }
  40% {
    transform:matrix(1,0,0,1,0,-1);
    opacity:1
  }
  70% {
    transform:matrix(1,0,0,1,0,0);
    opacity:1
  }
  100% {
    transform:matrix(1,0,0,1,0,0);
    opacity:1
  }
`;

const MenuFloat = styled.div<{ isDark: string }>`
  position: absolute;
  align-items: center;
  z-index: 1;
  width: ${MENU_WIDTH}px;
  height: ${MENU_HEIGHT}px;
  padding: 7px 11px 7px 19px;
  color: ${p => p.theme.colors.grey};
  background: ${p => (p.isDark ? "#fafafa" : "#000")};
  border-radius: 5px;
  font-size: 18px;
  font-weight: 600;
  transition: left 75ms ease-out, right 75ms ease-out, background 200ms;
  animation: ${popUpwards} 200ms forwards;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    bottom: -8px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid ${p => (p.isDark ? "#fafafa" : "#000")};
    transition: border-color 200ms;
  }

  svg {
    path {
      fill: ${p => (p.isDark ? "#000" : "#fff")};
    }
  }
`;

const MenuText = styled.span`
  margin-right: 11px;
`;

const Hidden = styled.div`
  width: 0px;
  height: 0px;
  visibility: hidden;
  opacity: 0;
`;

const MenuShare = styled.a`
  display: flex;
  align-items: center;
  padding: 16px 11px;
  cursor: ${p => (p.disabled ? "not-allowed" : "pointer")};

  svg {
    path {
      fill: ${p => (p.disabled ? "#F89797" : "")};
    }
  }
`;

const MenuButton = styled.button`
  display: inline-block;
  padding: 16px 11px;
`;

const MenuDivider = styled.div`
  display: inline-block;
  height: 17px;
  width: 1px;
  position: relative;
  margin: 0 8px;
  background: rgba(115, 115, 125, 0.3);
`;

const TwitterIcon = () => (
  <svg
    width="18"
    height="15"
    viewBox="0 0 18 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.1631 2.40712C15.8912 1.97066 16.4504 1.27958 16.7137 0.456143C16.0323 0.86022 15.2776 1.15371 14.4744 1.31189C13.8311 0.626525 12.9146 0.198242 11.9003 0.198242C9.95274 0.198242 8.37378 1.77714 8.37378 3.7246C8.37378 4.00098 8.40502 4.27014 8.46513 4.52823C5.53429 4.38117 2.93586 2.97724 1.19658 0.843747C0.893032 1.36458 0.719128 1.97035 0.719128 2.61661C0.719128 3.84003 1.34175 4.91941 2.28797 5.55178C1.70986 5.53348 1.16615 5.37486 0.690647 5.11073C0.690396 5.12545 0.690396 5.14022 0.690396 5.15506C0.690396 6.86366 1.90596 8.28897 3.51919 8.61289C3.22325 8.69349 2.91172 8.73655 2.59007 8.73655C2.36285 8.73655 2.14192 8.71449 1.92665 8.6733C2.37536 10.0743 3.67769 11.0939 5.22082 11.1224C4.01393 12.0681 2.49337 12.6319 0.841225 12.6319C0.556604 12.6319 0.275882 12.6152 0 12.5827C1.56061 13.5832 3.41426 14.167 5.40572 14.167C11.8921 14.167 15.4391 8.79352 15.4391 4.13352C15.4391 3.98061 15.4357 3.82853 15.4289 3.67732C16.1178 3.18013 16.7157 2.55902 17.1885 1.85183C16.5561 2.13231 15.8765 2.32186 15.1631 2.40712Z"
      fill="black"
    />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.17191 15.9467H1.04978V5.90884H4.17191V15.9467ZM2.6273 4.53195C2.13492 4.53195 1.70969 4.3529 1.35159 3.99481C0.9935 3.63671 0.814453 3.21148 0.814453 2.7191C0.814453 2.22672 0.9935 1.80148 1.35159 1.44339C1.70969 1.0853 2.13492 0.90625 2.6273 0.90625C3.11968 0.90625 3.54492 1.0853 3.90301 1.44339C4.26111 1.80148 4.44015 2.22672 4.44015 2.7191C4.44015 3.21148 4.26111 3.63671 3.90301 3.99481C3.54492 4.3529 3.11968 4.53195 2.6273 4.53195ZM15.8547 15.9467H12.7326V11.0452C12.7326 10.2395 12.6655 9.65763 12.5312 9.29954C12.285 8.69526 11.8038 8.39311 11.0876 8.39311C10.3714 8.39311 9.86785 8.66169 9.5769 9.19883C9.35309 9.60168 9.24118 10.1948 9.24118 10.9781V15.9467H6.15263V5.90884H9.14047V7.28526H9.17404C9.39785 6.83765 9.75594 6.46836 10.2483 6.17741C10.7855 5.81932 11.4121 5.64027 12.1283 5.64027C13.5831 5.64027 14.6014 6.09908 15.1833 7.01669C15.6309 7.75526 15.8547 8.89668 15.8547 10.441V15.9467Z"
      fill="black"
    />
  </svg>
);

const CopyIcon = () => (
  <svg
    width="15"
    height="19"
    viewBox="0 0 15 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.0475 0.905273H1.67197C0.812542 0.905273 0.109375 1.60844 0.109375 2.46787V13.406H1.67197V2.46787H11.0475V0.905273ZM13.3914 4.03046H4.79716C3.93773 4.03046 3.23456 4.73363 3.23456 5.59306V16.5312C3.23456 17.3906 3.93773 18.0938 4.79716 18.0938H13.3914C14.2509 18.0938 14.954 17.3906 14.954 16.5312V5.59306C14.954 4.73363 14.2509 4.03046 13.3914 4.03046ZM13.3914 16.5312H4.79716V5.59306H13.3914V16.5312Z"
      fill="#08080B"
    />
  </svg>
);
