const path                   = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin      = require('html-webpack-plugin');
const MiniCssExtractPlugin   = require('mini-css-extract-plugin');
const ImageMinimizerPlugin   = require('image-minimizer-webpack-plugin');

/** @type {import('webpack').Configuration} */
module.exports = {

  entry: ['./src/js/index.js', './src/scss/main.scss'],

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[contenthash].js',
    publicPath: ''
  },
  
  module: {

    rules: [

      {
        test: /\.m?js$/i,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader'
      },

      {
        test: /\.(css|scss|sass)$/i,
        exclude: /main\.(css|sass|scss)$/i,
        use: [ 
          'style-loader',
          'css-loader',
          'sass-loader' 
        ]
      },

      {
        test: /main\.(css|sass|scss)$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [ 'autoprefixer' ]
                ]
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },

      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          sources: {
            list: [
              // All default supported tags and attributes
              '...',
              {
                tag: 'a',
                attribute: 'href',
                type: 'src',
                filter: (tag, attribute, attributes, resourcePath) => {
                  // The `tag` argument contains a name of the HTML tag.
                  // The `attribute` argument contains a name of the HTML attribute.
                  // The `attributes` argument contains all attributes of the tag.
                  // The `resourcePath` argument contains a path to the loaded HTML file.
                  if ( attributes.find(dataSet => dataSet.name === "data-image" && dataSet.value === "true") ) {
                  // console.log(attributes)
                    return true;
                  } return false; 
                }
              },
              {
                tag: 'meta',
                attribute: 'content',
                type: 'src',
                filter: (tag, attribute, attributes, resourcePath) => {
                  // The `tag` argument contains a name of the HTML tag.
                  // The `attribute` argument contains a name of the HTML attribute.
                  // The `attributes` argument contains all attributes of the tag.
                  // The `resourcePath` argument contains a path to the loaded HTML file.

                  if ( attributes.find(dataSet => dataSet.name === "data-meta" && dataSet.value === "true") ) {
                  // console.log(attributes)
                    return true;
                  } return false; 
                }
              },
              {
                tag: 'div',
                attribute: 'data-bg',
                type: 'src',
                filter: (tag, attribute, attributes, resourcePath) => {
                  // The `tag` argument contains a name of the HTML tag.
                  // The `attribute` argument contains a name of the HTML attribute.
                  // The `attributes` argument contains all attributes of the tag.
                  // The `resourcePath` argument contains a path to the loaded HTML file.

                  if ( attributes.find(dataSet => dataSet.name === "data-image" && dataSet.value === "true") ) {
                  // console.log(attributes)
                    return true;
                  } return false; 
                }
              },
              {
                tag: 'img',
                attribute: 'data-src',
                type: 'src'
              }
            ],
          },
        }
      },

      {
        test: /\.(apng|gif|avif|jpg|jpeg|jfif|pjpeg|pjp|png|webp)$/i,
        type: 'asset/resource',
        generator: {
         filename: 'assets/img/[name].[hash].webp[query]'
        }, 
        use: [
          {
            loader: ImageMinimizerPlugin.loader,
            options: {
              minimizerOptions: {
                plugins: [ 'imagemin-webp' ]
              }
            }
          },
          {
            loader: ImageMinimizerPlugin.loader,
            options: {
              minimizerOptions: {
                plugins: [
                  ['gifsicle', { interlaced: true, optimizationLevel: 3 }],
                  ['mozjpeg', { quality: 80 }],
                  ['pngquant', { quality: [0.6, 0.8] }]
                ]
              }
            }
          }
        ]
      },

      {
        test: /\.svg$/i,
        type: 'asset',
        generator: {
         filename: 'assets/img/[name].[hash][ext][query]'
        }, 
        use: {
          loader: ImageMinimizerPlugin.loader,
          options: {
            minimizerOptions: {
              plugins: [
                [ 'svgo', { plugins: [{ removeViewBox: false }] } ]
              ]
            }
          }
        }
      },

      {
        test: /\.(ttf|otf|woff|woff2|eot)$/i,
        type: 'asset/resource',
        generator: {
         filename: 'assets/fonts/[name].[hash][ext][query]'
        }
      },

      {
        test: /\.(webm|ogg|mp4|mp3|3gpp|3gpp2|3gp2|mpeg)$/i,
        type: 'asset',
        generator: {
         filename: 'assets/media/[name].[hash][ext][query]'
        }
      },

      {
        test: /\.pdf$/i,
        type: 'asset/resource',
        generator: {
         filename: 'assets/media/[name][ext][query]'
        }
      }
    ]
  },

  plugins: [

    new CleanWebpackPlugin(),

    new HtmlWebPackPlugin({
      template: 'public/index.html',
      filename: 'index.html'
    }),

    new HtmlWebPackPlugin({
      template: 'public/spanish.html',
      filename: 'spanish.html'
    }),

    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      ignoreOrder: false
    })
  ]
};