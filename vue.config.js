module.exports = {
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
    }
  }
}
