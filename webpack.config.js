const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    entry: './src/index.js',
    output:{
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    mode:'development',
    resolve:{
        extensions: ['.js', '.jsx'],
        alias:{
            '@components': path.join(__dirname, '/src/components/'),
			'@containers': path.join(__dirname, '/src/containers/'),
			'@pages': path.join(__dirname, '/src/pages/'),
			'@routes': path.join(__dirname, '/src/routes/'),
			'@styles': path.join(__dirname, '/src/styles/'),
			'@icons': path.join(__dirname, '/src/assets/icons/'),
			'@logos': path.join(__dirname, '/src/assets/logos/'),
			'@hooks': path.join(__dirname, '/src/hooks/'),
			'@context': path.join(__dirname, '/src/context/'),
			'@service': path.join(__dirname, '/src/service/'),
        },
        fallback: {
            "fs": false,
            "tls": false,
            "net": false,
            "path": false,
            "zlib": false,
            "http": false,
            "https": false,
            "stream": false,
            "crypto": false,
            "crypto-browserify": require.resolve('crypto-browserify')
          } 
    },

    module:{
        rules:[
            {
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:{
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use:{
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.html$/,
                use:[
                    {
                        loader: 'html-loader'
                    }
                ]
            },
            {
                test: /\.(css)$/,
                use:[
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ],
            },
            {
                test: /\.(scss)$/,
                use:[
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ],
            },
            {
                test: /\.(png)$/,
                type: 'asset'
            },
            {
                test: /\.(webp)$/,
                type: 'asset'
            },
            {
                test: /\.(svg)$/,
                type: 'asset'
            },
            {
                test: /\.(jpg)$/,
                type: 'asset'
            },
            {
                test: /\.(gif)$/,
                type: 'asset'
            },
        ]
    },

    plugins:[
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new Dotenv(),
    ],
    
    devServer:{
        historyApiFallback: true,
    }
}