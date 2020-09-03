import React from "react";

import Subscription from "@components/Subscription";

import { Template } from "@types";


const ArticleFooter: Template = ({ pageContext }) => {
  const { article, mailchimp } = pageContext;

  return (
    <>
      {mailchimp && article.subscription && <Subscription />}
    </>
  );
};

export default ArticleFooter;
