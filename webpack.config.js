module.exports = {
    entry: './public/javascripts/index.js',
    output: {
        path: __dirname,
        filename: "./public/bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['react']
                }
            }
        ]
    }
}