'use strict'
const utils = require('./utils')
const config = require('../config')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction ?
    config.build.productionSourceMap :
    config.dev.cssSourceMap

module.exports = {
    postcss: {
        plugins: [
            autoprefixer(['iOS >= 7', 'last 2 versions', 'Android >= 2', 'Firefox >= 4', 'Chrome >= 4',
                'IE >= 9'
            ])
        ]
    },
    cssSourceMap: sourceMapEnabled,
    cacheBusting: config.dev.cacheBusting,
    transformToRequire: {
        video: ['src', 'poster'],
        source: 'src',
        img: 'src',
        image: 'xlink:href'
    }
}

module.exports.loaders = isProduction ? {
    scss: ExtractTextPlugin.extract({
        allChunks: true,
        fallback: 'vue-style-loader',
        use: [{
                loader: 'css-loader'
            },
            {
                loader: 'sass-loader'
            }
        ]
    })
} : {
    'scss': 'vue-style-loader!css-loader!sass-loader'
}
