import { ReactNode } from "react";

interface IMeta {
  title: string;
  description: string;
  image: {
    file: {
      url: string;
    };
  };
}

interface IMetaQuery {
  edges: {
    node: { seo: IMeta };
  }[];
}

export interface IPaginator {
  pageCount: number;
  index: number;
  pathPrefix: string;
}

interface ISharpImage {
  src: string;
  base64?: string;
  srcWebp?: string;
  srcSet?: string;
  srcSetWebp?: string;
  tracedSVG?: string;
}

interface ISharpFluidAttrs extends ISharpImage {
  maxHeight: number;
  maxWidth: number;
}

interface ISharpFixedAttrs extends ISharpImage {
  height: number;
  width: number;
}

type ISharpFixedOrFluidAttrs = ISharpFluidAttrs | ISharpFixedAttrs;

export interface ISharpFixedAtKey {
  fixed: ISharpFixedAttrs;
}

export interface ISharpFluidAtKey {
  fluid: ISharpFluidAttrs;
}

interface IGraphqlSharpFixedImage {
  childImageSharp: ISharpFixedAtKey;
}

interface IGraphqlSharpFluidImage {
  childImageSharp: ISharpFluidAtKey;
}

interface IGraphqlFluidImage {
  full: ISharpFixedOrFluidAttrs;
  prevuew: ISharpFixedOrFluidAttrs;
}

interface IAuthor {
  name: string;
  slug: string;
  bio: string;
  avatar: {
    image: ISharpFluidAtKey;
  };
}

export interface IArticleNode {
  slug: string;
  author: string;
  excerpt: string;
  body: string;
  id: string;
  hero: {
    full: ISharpFluidAttrs;
    preview: ISharpFluidAttrs;
  };
  timeToRead: number;
  date: string;
}

interface IArticleNodeQuery {
  edges: {
    node: IArticleNode;
  }[];
}

export interface IMicrodataBreadcrumb {
  levels: {
    item: string;
    name: string;
  }[];
}

export interface IProgress {
  height: number;
  offset: number;
  title: string;
  mode: string;
  onClose?: () => void;
}
