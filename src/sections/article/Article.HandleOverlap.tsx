import React, { Component, ReactNode } from "react";
import styled from "@emotion/styled";

interface OverlapProps {
  children: ReactNode[];
}

interface OverlapState {
  isOverlapping: boolean;
}

/**
 * <HandleOverlap />
 * This is similar to Medium's "show and hide" the sidebar if it's overlapping an
 * element on the page. For our implementation, the only piece of content that can
 * overlap the <Aside /> is an image. and only 1 image at a time!
 *
 * So, this calculates the position of its children and the currently viewable <img />
 * and decides wether or not they're overlapping (with some buffer). If they are overlapping
 * we want to hide the top element.
 */

class HandleOverlap extends Component<OverlapProps, OverlapState> {
  asideRef: React.RefObject<HTMLElement> = React.createRef();
  ticking = false;

  state = { isOverlapping: false };

  componentDidMount() {
    window.addEventListener("scroll", this.onScroll);
    window.addEventListener("resize", this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("resize", this.onScroll);
  }

  onScroll = () => {
    // Elements we want to include for the overlap
    const ctas = Array.from(document.getElementsByClassName("CallToAction"));
    const images = Array.from(document.querySelectorAll("img"));

    const nodesToNotOverlap = [...ctas, ...images];
    const noNodesAreVisible = !nodesToNotOverlap.some(this.isVisible);

    nodesToNotOverlap.forEach(
      (node: HTMLElement): void | null => {
        const isOverlapping = this.collide(this.asideRef.current, node);

        if (noNodesAreVisible) {
          return this.setState({ isOverlapping });
        }
        /**
         * If the node is not in the viewport don't fire state events for it,
         * otherwise we run into issues with multiple nodes on the page.
         */
        if (!this.isVisible(node)) {
          this.ticking = false;
          return null;
        }

        this.setState({ isOverlapping });
      },
    );
  };

  // Is the current element within the window's frame? That's all we care about!
  isVisible = (element: HTMLElement): boolean => {
    const rect = element.getBoundingClientRect();

    return rect.top < window.innerHeight && rect.bottom >= 0;
  };

  /**
   * This is a nice stackoverflow answer that sums up the overlapping feature. All
   * we've added is a small BUFFER because we don't want it to disppear as it touches.
   * We prefer to start the fade out a few pixels before!
   */
  collide = (fixedElement: HTMLElement, node: HTMLElement): boolean => {
    const BUFFER = 40;
    const rect1 = fixedElement.getBoundingClientRect();
    const rect2 = node.getBoundingClientRect();

    return !(
      rect1.top - BUFFER > rect2.bottom ||
      rect1.right < rect2.left ||
      rect1.bottom + BUFFER < rect2.top ||
      rect1.left > rect2.right
    );
  };

  render() {
    return (
      <Frame isOverlapping={this.state.isOverlapping} ref={this.asideRef}>
        {this.props.children}
      </Frame>
    );
  }
}

export default HandleOverlap;

const Frame = styled.div<{ isOverlapping: boolean }>`
  user-select: ${p => (p.isOverlapping ? "none" : "initial")};
  pointer-events: ${p => (p.isOverlapping ? "none" : "initial")};
  opacity: ${p => (p.isOverlapping ? 0 : 1)};
  transition: ${p => (p.isOverlapping ? "opacity 0.3s" : "opacity 0.15s")};
`;
