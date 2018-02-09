const path = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const WebpackAutoInject = require('webpack-auto-inject-version');
// const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const postcssConfig = require('./webpackinc/postcss.config.js');

// const sourceMap = process.env.SOURCE_MAP ? 'source-map' : 'cheap-module-eval-source-map';
const sourceMap = process.env.SOURCE_MAP ? 'source-map' : 'inline-source-map';

module.exports = {
    devtool: sourceMap,
    // entry: ['./src/index.js'],
    entry: {
        bundler: ['./src/index.js'],
        bundlev: [
            'react',
            'react-dom',
            // 'react-redux',
            // 'redux',
            // 'react-router',
        ],
        // styles: './src/styles/index.scss'
    },
    output: {
        filename: './public/assets/[name].js',
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
            // {
            //     test: /\.scss$/,
            //     use: [{
            //         loader: "style-loader" // creates style nodes from JS strings
            //     }, {
            //         loader: "css-loader" // translates CSS into CommonJS
            //     }, {
            //         loader: "sass-loader", // compiles Sass to CSS
            //         options: {
            //             includePaths: ["src/styles"]
            //         }
            //     }]
            // },
            {
                test: /\.scss$/,
                // use: ExtractCssChunks.extract({
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: false,
                                modules: true,
                                localIdentName: '[name]__[local]_[hash:base64:5]',
                                // sourceMap: sourceMap,
                                sourceMap: true,
                                // importLoaders: 1
                            }
                        },
                        {
                            loader: 'sass-loader',
                            query: {
                                sourceMap: false,
                                // includePaths: ["src/styles"]
                            },
                        }
                    ]
                })

            },
            // {
            //     test: /\.css$/,
            //     use: ExtractCssChunks.extract({
            //         use: [
            //             // {
            //             //     loader: 'css-loader',
            //             //     options: {
            //             //         minimize: false,
            //             //         modules: true,
            //             //         localIdentName: cssLocalIdentName,
            //             //         sourceMap: isSourceMapEnabled,
            //             //         importLoaders: 1
            //             //     }
            //             // },
            //             {
            //                 loader: 'postcss-loader',
            //                 options: {
            //                     sourceMap: true
            //                 }
            //             }
            //         ]
            //     })
            //
            // },
        ],
    },
    plugins: [
        new WebpackNotifierPlugin({title: 'bundler.js', }),
        // excludeWarnings: true,
        //contentImage: path.join(__dirname, '../frontend/Images/ImagesSrc/favicon.png')

        new WebpackAutoInject({
            components: {
                AutoIncreaseVersion: true
            }
        }),
		new webpack.optimize.CommonsChunkPlugin({
			name: "bundlev",
			minChunks: Infinity
		}),

        new ExtractTextPlugin({
            // "public/assets/index.css"
            filename: '[name].css'
        }),
        // new ExtractCssChunks({
        //     filename: '[name].css'
        // }),

        // new webpack.LoaderOptionsPlugin({
        //     test: /\.css/,
        //     options: {
        //         postcss: postcssConfig(),
        //         context: path.resolve(__dirname, '..')
        //     }
        // }),
    ]
};
