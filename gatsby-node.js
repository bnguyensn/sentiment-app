/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// Gatsby seems to be using core-js < 3, which is not supported. The code blocks
// below attempt to fix build issues stemming from this.
// https://github.com/gatsbyjs/gatsby/issues/15601#issuecomment-585431406
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
