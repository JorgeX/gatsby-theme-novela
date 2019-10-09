module.exports = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = `
    type PluginOptions {
      rootPath: String
    }
    type SitePlugin implements Node {
      pluginOptions: PluginOptions
    }
  `;

  createTypes(typeDefs);
};
