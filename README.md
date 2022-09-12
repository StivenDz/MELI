#  📝 Documentation

This project was created with custom webpack

## Available Scripts

```json
"scripts": {
    "devHardCore": "nodemon -e jsx -x \"webpack serve\"",
    "dev": "webpack serve",
    "buildLocal": "webpack --mode production && serve dist",
    "build": "webpack --mode production",
    "build-sass": "node-sass --include-path scss src/sass/index.scss src/styles/index.css",
    "watch-sass": "nodemon -e scss -x \"npm run build-sass\" "
  }
```

In the project directory, you can run:

#### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm run build`

Builds the app for production to the `dist` folder.\

## Dependencies
```json
"dependencies": {
    "@babel/core": "^7.18.10",
    "@babel/plugin-transform-runtime": "^7.18.10",
    "@babel/preset-env": "^7.18.10",
    "@babel/preset-react": "^7.18.6",
    "@fortawesome/fontawesome-svg-core": "^6.1.2",
    "@fortawesome/free-brands-svg-icons": "^6.1.2",
    "@fortawesome/free-regular-svg-icons": "^6.1.2",
    "@fortawesome/free-solid-svg-icons": "^6.1.2",
    "@fortawesome/react-fontawesome": "^0.2.0",
    "axios": "^0.27.2",
    "babel-loader": "^8.2.5",
    "dotenv": "^16.0.2",
    "dotenv-webpack": "^8.0.1",
    "framer-motion": "^7.2.1",
    "html-loader": "^4.1.0",
    "html-webpack-plugin": "^5.5.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router": "^6.3.0",
    "react-router-dom": "^6.3.0",
    "sass-loader": "^13.0.2",
    "webpack": "^5.74.0",
    "webpack-cli": "^4.10.0",
    "webpack-dev-server": "^4.10.0"
  }
```
## Dev Dependencies

```json
"devDependencies": {
    "css-loader": "^6.7.1",
    "mini-css-extract-plugin": "^2.6.1",
    "node-sass": "^7.0.1",
    "nodemon": "^2.0.19",
    "sass": "^1.54.5",
    "source-map-loader": "^4.0.0",
    "style-loader": "^3.3.1"
  }
```
## WebPack.config.js

```javascript
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
```

## Folders

  *  ### [`src/assets/`](https://github.com/StivenDz/MELI/tree/master/src/assets)
  
      * In this folder you can find all the local images
          * #### [Icons](https://github.com/StivenDz/MELI/tree/master/src/assets/icons)
            <div >
               <img src="https://github.com/StivenDz/MELI/blob/master/src/assets/icons/notFound.svg" height="100"/>
               <p align="left">Not Found svg</p>
            </div>
          * #### [Logos](https://github.com/StivenDz/MELI/tree/master/src/assets/logos)
            <div ><br>
              <img align="center"  height="50" width:"50" src="https://github.com/StivenDz/MELI/blob/master/src/assets/logos/nav_logo_responsive.png"/>
               <br>
               <br>
               <img align="center"  height="50" width:"50" src="https://github.com/StivenDz/MELI/blob/master/src/assets/logos/nav_logo.png"/>
               <br>
               <br>
               <img align="center"  height="50" width:"50" src="https://github.com/StivenDz/MELI/blob/master/src/assets/logos/nav_ads.webp"/>
            </div>

  * ### [`src/components/`](https://github.com/StivenDz/MELI/tree/master/src/components)
  
      * in this folder you can find all the jsx components like:
      
        * CartItem.jsx
        * CartList.jsx
        * CategoriesList.jsx
        * Loading.jsx
        * PaymentMethodItem.jsx
        * Productitem.jsx
        * ProductRating.jsx
      
  * ### [`src/containers/`](https://github.com/StivenDz/MELI/tree/master/src/containers)
  
      * in this folder you can find all the jsx containers like:

        * Carousel.jsx
        * CartContainer.jsx
        * CategoriesContainer.jsx
        * Navigation.jsx
        * NavigationResponsive.jsx
        * PaymentMethodContainer.jsx
        * ProductList.jsx
      
  * ### [`src/context/`](https://github.com/StivenDz/MELI/tree/master/src/context)
  
      * in this folder you can find the AppContext:
      
        * AppContext.js
      
  * ### [`src/hooks/`](https://github.com/StivenDz/MELI/tree/master/src/hooks)
  
       * in this folder you can find all the custom hooks like:
       
         * useinitialState.js
         * usePriceFormat.js
      
  * ### [`src/pages/`](https://github.com/StivenDz/MELI/tree/master/src/pages)
  
      * in this folder you can find all the pages like:
      
        * Categories.jsx
        * Home.jsx
        * NotFound.jsx
        * productDetail.jsx
        * ProductsByCategory.jsx
      
  * ### [`src/routes/`](https://github.com/StivenDz/MELI/tree/master/src/routes)
  
      * in this folder you can find the App.jsx file, which contains the routes of the application:
      
        *  App.jsx
      
  * ### [`src/styles/`](https://github.com/StivenDz/MELI/tree/master/src/styles)
  
      * in this folder you can find the index.css which contains all the styles:
      
        * index.css
      
