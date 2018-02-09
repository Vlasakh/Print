/* eslint-disable import/no-commonjs, global-require */

const autoprefixer = require('autoprefixer');
// const imageSetPolyfill = require('postcss-image-set-polyfill');
// const baseCustomProperties = require('../constants/styles/index');
// const baseCssMediaVariables = require('../constants/styles/media');
// const commonCssCustomSelectors = require('../constants/styles/customSelectors');
// const customProperties = {
//     common: require('../packages/common/constants/styles/index'),
//     travel: require('../packages/travel/constants/styles/index'),
//     mtravel: require('../packages/travel/constants/styles/index')
// };
// const customCssMediaVariables = {
//     common: require('../packages/common/constants/styles/media'),
//     travel: require('../packages/travel/constants/styles/media'),
//     mtravel: require('../packages/travel/constants/styles/media')
// };
// const customCssCustomSelectors = {
//     common: require('../packages/common/constants/styles/customSelectors'),
//     travel: require('../packages/travel/constants/styles/customSelectors'),
//     mtravel: require('../packages/travel/constants/styles/customSelectors')
// };

// const getVariables = (commonVariables, packageVariables) => Object.assign({}, commonVariables, packageVariables);

module.exports = function() {
    return {
        plugins: [
            // require('postcss-global-import')({
            //     sync: true
            // }),
            // require('postcss-use')({ modules: '*' }),
            // require('postcss-nested'),
            // require('postcss-custom-properties')({
            //     variables: getVariables(baseCustomProperties, customProperties[appId])
            // }),
            // require('postcss-at-rules-variables'),
            // require('postcss-calc'),
            // require('postcss-custom-media')({
            //     extensions: getVariables(baseCssMediaVariables, customCssMediaVariables[appId])
            // }),
            // require('postcss-custom-selectors')({
            //     extensions: getVariables(commonCssCustomSelectors, customCssCustomSelectors[appId])
            // }),
            // require('postcss-conditionals'),
            // require('postcss-color-function'),
            // imageSetPolyfill,
            autoprefixer()
        ]
    };
};
