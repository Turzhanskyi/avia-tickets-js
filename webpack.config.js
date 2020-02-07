const path = require("path");
const autoprefixer = require("autoprefixer");
const precss = require("precss");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // Щоб веб-сайт почав свою роботу, потрібно вказати головний (основний) файл,
  // який буде включати в себе всі інші необхідні файли (модулі).
  entry: {
    polyfill: "babel-polyfill",
    app: "./js/app.js"
  },
  // Також webpack рекомендує явно вказувати, у якій директорії знаходяться вихідні файли проекту.
  // Для цього слід використовувати властивість context:
  context: path.resolve(__dirname, "src"),
  devServer: {
    publicPath: "/",
    port: 9000,
    contentBase: path.join(process.cwd(), "dist"),
    host: "localhost",
    historyApiFallback: true,
    noInfo: false,
    stats: "minimal",
    hot: true
  },
  module: {
    // Для того, щоб трансформувати файл, використовуються спеціальні утиліти-завантажувачі (loaders).
    // Для будь-яких налаштувань модуля вебпак використовується поле module.
    // Масив rules всередині об'єкта module визначає список правил для завантажувачів.
    rules: [
      {
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        },
        test: /\.js$/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",

            options: {
              importLoaders: 1,
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [precss, autoprefixer]
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]"
            }
          }
        ]
      }
    ]
  },
  // Вебпак плагіни використовуються для налаштування та автоматизації збірки.
  // Наприклад, плагін для мініфікаціі коду (під час складання код піддається очищенню і мініфікаціі).
  // Або плагін для збірки html сторінки і css коду (скрипти вставляються в html, шматки css збираються в один файл).
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: "./style.css" }),
    new HtmlWebpackPlugin({
      template: "index.html"
    })
  ],
  // Крім entry, ми можемо вказати поле, куди (в який файл) збирати кінцевий результат. Це властивість задається за допомогою поля output.
  // За замовчуванням, весь результуючий код збирається в папку dist.
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash].js"
  },
  mode: "development"
};
