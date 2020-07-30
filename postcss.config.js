module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-plugin-px2rem')({
      rootValue: 100,
      exclude: /(node_module)/
    })
  ]
}
