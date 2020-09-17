const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
    },
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: ["@babel/plugin-proposal-class-properties"/*, "@babel/plugin-transform-runtime"*/],
                }
            }
        }]
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 3004
    },
};
