"use strict";

const debug = process.env.NODE_ENV !== "development";

const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: "development", // "production" | "development" | "none"
  // Chosen mode tells webpack to use its built-in optimizations accordingly.
  entry: path.join(__dirname, 'src', 'app-client.js'),
 



  output: {
    // options related to how webpack emits results
    path: path.join(__dirname, 'src','static','js'), // string
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)
    filename: "bundle.js", // string
    // the filename template for entry chunks
    publicPath: "/js/", // string
    // the url to the output directory resolved relative to the HTML page
    
  },
  module: {
 rules:[{
      test: path.join(__dirname, 'src'),
      loader: 'babel-loader',
      options: {
       
        presets: debug ? ['react', 'es2017', 'react-hmre','stage-2'] : ['react', 'es2017']
      }
   },

{
        test:path.join(__dirname, 'static', 'food.scss') ,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      }

   ]
   },
//lets you precisely control what bundle information gets displayed
  devServer: {
    inline: true,
    port: 3333,
    contentBase: "src/static/",
    historyApiFallback: {
      index: '/index-static.html'
    }
  },
  plugins: [
     new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  // list of additional plugins
  /* Advanced configuration (click to show) */
}
