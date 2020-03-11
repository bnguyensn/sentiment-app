/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const enableCoreJs3 = config => {
  const coreJs2config = config.resolve.alias['core-js'];
  delete config.resolve.alias['core-js'];
  config.resolve.alias[`core-js/modules`] = `${coreJs2config}/modules`;
  try {
    config.resolve.alias[`core-js/es`] = path.dirname(
      require.resolve('core-js/es'),
    );
  } catch (err) {
    // ignore-error, core-js3 isn't available in the current directory
  }

  return config;
};

exports.onCreateWebpackConfig = ({ actions, stage, getConfig }) => {
  const config = getConfig();

  actions.replaceWebpackConfig(enableCoreJs3(config));
};
