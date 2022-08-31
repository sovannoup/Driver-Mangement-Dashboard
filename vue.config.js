 
module.exports = {
  publicPath: '/', 
  configureWebpack: {
    stats: { warnings: false },
  }, 
  devServer: {
    // host: '0.0.0.0',
    // public: '0.0.0.0:8080',
    // disableHostCheck: true,
  },
  chainWebpack: config => {
    config.module.rules.delete('eslint') 
  } 
  
 
}

