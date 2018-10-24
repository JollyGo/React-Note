const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports ={
    mode: 'development',
    entry: [
        "./source/app.js"
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules:[ 
        {
            test: /\.(js|jsx)?$/,
            exclude: [
              path.resolve(__dirname, 'node_modules')
            ],
            use:{
              loader:"babel-loader"
            }
        },
        {
            test:/\.html$/,
            use:[{
              loader:"html-loader",
              options:{minimize:true}
            }]
          },
          {
            test:/\.css$/,
            use:[MiniCssExtractPlugin.loader,'css-loader']
          },
        ]
    },
    resolve: {
        extensions: ['.json', '.js', '.jsx', '.css']
    },
    devServer: {
        open:true,
        progress:true,
        port:8080,
        inline:true,
        // publicPath: path.join('/dist/')
      },
      plugins:[
        new HtmlWebpackPlugin({
            template:'./source/index.html',
            filename:'index.html',
            favicon: './source/favicon.ico'
        }),
        new MiniCssExtractPlugin({
            template:'./source/',
            filename:'[name].css',
            chunkFilename:'[id].css'
    })
    ]
}