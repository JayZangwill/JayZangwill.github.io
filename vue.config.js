module.exports = {
  assetsDir: 'static/',
  productionSourceMap: false,
  pages: {
    index: {
      entry: 'src/pages/index/index.js',
      template: 'template.html',
      filename: 'index.html',
      title: 'Index Page',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    resume: {
      entry: 'src/pages/resume/resume.js',
      template: 'template.html',
      filename: 'resume.html',
      title: 'Index Page',
      chunks: ['chunk-vendors', 'chunk-common', 'resume']
    },
    noFound: {
      entry: 'src/pages/noFound/noFound.js',
      template: 'template.html',
      filename: 'noFound.html',
      title: 'noFound Page',
      chunks: ['chunk-vendors', 'chunk-common', 'noFound']
    }
  },
  devServer: {
    proxy: 'https://www.jayzangwill.cn/'
  }
}
