import React, { useContext } from "react";
import styled from "@emotion/styled";

import { IArticleNode } from "@typings";

import ArticlesGridTiles from "./Articles.Grid.Tiles";
import ArticlesGridRows from "./Articles.Grid.Rows";

import { GridLayoutContext } from "./Articles.Grid.Context";

function ArticlesGrid({
  articles,
  basePath,
}: {
  articles: IArticleNode[];
  basePath: string;
}) {
  const { gridLayout, hasSetGridLayout } = useContext(GridLayoutContext);
  /**
   * We have to wait until we read from localStorage to see which layout
   * the user has chosen. Since Gatsby is HTML that's visible before JS is
   * loaded with have to hide the Grid until JS has loaded and we'r set the memory.
   */
  return (
    <ArticlesGridContainer
      style={{ opacity: hasSetGridLayout ? 1 : 0 }}
      id="Articles__Grid"
    >
      {gridLayout === "tiles" ? (
        <ArticlesGridTiles articles={articles} />
      ) : (
        <ArticlesGridRows articles={articles} />
      )}
    </ArticlesGridContainer>
  );
}

export default ArticlesGrid;

const ArticlesGridContainer = styled.div`
  transition: opacity 0.25s;
`;
