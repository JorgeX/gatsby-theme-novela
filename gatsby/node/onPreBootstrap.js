"use strict";

const fs = require("fs-extra");

module.exports = ({ reporter }, themeOptions) => {
  const postsPath = themeOptions.contentPosts || "content/posts";

  const authorsPath = themeOptions.contentAuthors || "content/authors";

  if (!fs.existsSync(postsPath)) {
    reporter.info(`creating the ${postsPath} directory`);
    fs.mkdirSync(postsPath);
  }

  if (!fs.existsSync(authorsPath)) {
    reporter.info(`creating the ${authorsPath} directory`);
    fs.mkdirSync(authorsPath);
  }
};
