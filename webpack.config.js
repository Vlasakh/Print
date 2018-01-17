const WebpackNotifierPlugin = require('webpack-notifier');
const WebpackAutoInject = require('webpack-auto-inject-version');

const sourceMap = process.env.SOURCE_MAP ? 'source-map' : 'cheap-module-eval-source-map';

module.exports = {
    devtool: sourceMap,
    entry: ['./src/index.js'],
    output: {
        filename: './dst/bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
            },
        ],
    },
    plugins: [
        new WebpackNotifierPlugin({title: 'bundle.js', }),
        // excludeWarnings: true,
        //contentImage: path.join(__dirname, '../frontend/Images/ImagesSrc/favicon.png')

        new WebpackAutoInject({
            components: {
                AutoIncreaseVersion: true
            }
        }),
    ]
};
