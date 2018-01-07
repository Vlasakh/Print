module.exports = {
    entry: ['./src/index.js'],
    output: {
        filename: './dst/bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },
};
