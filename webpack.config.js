const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIST = [
    'axios',
    'bootstrap',
    'jquery',
    'react',
    'react-dom',
    'react-redux',
    'react-router-dom',
    'redux',
    'redux-thunk'
]

const optimization = {
    splitChunks: {
        cacheGroups: {
            commons: {
                test: /[\\/]node_modules[\\/]/,
                name: "vendor",                
                chunks: "all",
            }
        }
    },
    runtimeChunk:{
        name: "manifest",
    }
}

module.exports = {
    mode: 'development',
    entry: {
        bundle: './src/index.js', //goi webpack chay vao day dau tien
        vendor: VENDOR_LIST
    },
    output: {
        path: path.join(__dirname, 'dist'),
        // filename: 'bundle.js' //luc nay tach ra 2 file roi nen thay doi (bundle, vendor)
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: '/node_modules' //loai bo khong cho no tim file js trong nay
            },
            {
                use: [
                    'style-loader',
                    'css-loader'
                ],
                test: /\.css$/
            },
            {
                loader: 'file-loader',
                test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.woff2$|\.eot$|\.ttf$|\.wav$|\.mp3$|\.ico$/ //jpg jpeg dung ? de test 2 truong hop hinh
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            'window.$': 'jquery',
            'window.jQuery': 'jquery'
        }), 
        new HtmlWebpackPlugin({
            template : 'src/index.html'
        })       
    ],
    optimization,
}