import React, { createContext, useState } from "react";
import { graphql, useStaticQuery } from "gatsby";

interface GridLayoutProviderProps {
  children: React.ReactChild;
}

export const GridLayoutContext = createContext({
  gridLayout: "tiles",
  hasSetGridLayout: false,
  setGridLayout: (tile: string) => {},
  getGridLayout: () => {},
});

const articlesQuery = graphql`
  {
    articles: allArticle {
      edges {
        node {
          id
        }
      }
    }
  }
`;

function GridLayoutProvider({ children }: GridLayoutProviderProps) {
  const results = useStaticQuery(articlesQuery);
  const articles = results.articles.edges;
  const initialLayout = articles.length === 1 ? "rows" : "tiles";

  const [gridLayout, setGridLayout] = useState<string>(initialLayout);
  const [hasSetGridLayout, setHasSetGridLayout] = useState<boolean>(false);

  function setGridLayoutAndSave(tile: string) {
    localStorage.setItem("gridLayout", tile || initialLayout);
    setGridLayout(tile);
  }

  function getGridLayoutAndSave() {
    setGridLayout(localStorage.getItem("gridLayout") || initialLayout);
    setHasSetGridLayout(true);
  }

  return (
    <GridLayoutContext.Provider
      value={{
        gridLayout,
        hasSetGridLayout,
        setGridLayout: setGridLayoutAndSave,
        getGridLayout: getGridLayoutAndSave,
      }}
    >
      {children}
    </GridLayoutContext.Provider>
  );
}

export default GridLayoutProvider;
