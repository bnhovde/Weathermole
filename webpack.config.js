const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/app/index.html',
    filename: 'index.html',
    inject: 'body',
});

module.exports = {
    devtool: 'source-map',
    entry: [
        './app/app.js',
    ],
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            {test: /\.scss$/, loader: ExtractTextPlugin.extract(
                    'css?sourceMap!sass?sourceMap!postcss-loader'
                ),
            },
            {test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader'},
        ],
    },
    sassLoader: {
        includePaths: ['app/styles'],
    },
    output: {
        path: __dirname + '/dist',
        filename: 'app_bundle.js',
    },
    postcss: [autoprefixer({browsers: ['last 2 versions']})],
    plugins: [
        HTMLWebpackPluginConfig, new ExtractTextPlugin('dist/app.css'),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings: true,
            },
        }),
    ],
    publicPath: 'http://localhost:8080/dist/app_bundle.js',
    devServer: {
        proxy: [
            {
                path: /./,
                target: 'http://localhost:8888/front-end-assignment-using-forecast-io-bnhovde',
            },
        ],
    },
};
