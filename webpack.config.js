 var path = require('path');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    debug: true,
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.glsl$/,
                loader: 'webpack-glsl'
            },
            {
                test: /\.vert$/,
                loader: 'webpack-glsl'
            },
            {
                test: /\.frag$/,
                loader: 'webpack-glsl'
            }
        ]
    }
};
