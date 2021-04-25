const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.module\.(scss|sass|css)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: true,
                            modules: {
                                namedExport: true,
                            },
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: true,
                            modules: {
                                namedExport: true,
                            },
                        },
                    },
                    {
                        loader: 'postcss-loader',
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
            {
                test: /\.(scss|sass|css)$/,
                exclude: /\.module\.(scss|sass|css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(jpg|png|webp|jpeg|svg)$/,
                use: {
                    loader: 'url-loader',
                },
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './public/index.html' }),
        new MiniCssExtractPlugin(),
        new ESLintPlugin({ extensions: ['tsx', 'ts', 'js'] }),
        new StylelintPlugin({ fix: false }),
        new CopyPlugin({
            patterns: [
                {
                    from: 'public/**/*',
                    to: '[name][ext]',
                    globOptions: { ignore: ['**/index.html'] },
                },
            ],
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin(), '...'],
    },
};
