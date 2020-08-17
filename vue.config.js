const path = require('path');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
let isDevelopment = process.env.NODE_ENV != 'production';

module.exports = {
  publicPath: isDevelopment ? '/' : './', //vueConf.baseUrl, // 根域上下文目录
  outputDir: 'dist', // 构建输出目录
  assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
  lintOnSave: false, // 是否开启eslint保存检测，有效值：ture | false | 'error'
  runtimeCompiler: true, // 运行时版本是否需要编译
  transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
  productionSourceMap: true, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
  configureWebpack: config => { // webpack配置，值位对象时会合并配置，为方法时会改写配置
    if (isDevelopment) { // 开发环境配置
      config.devtool = 'cheap-module-eval-source-map'
    } else { // 生产环境配置
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true //去掉console.log
      // 配置webpack 压缩
      config.plugins.push(
        new CompressionWebpackPlugin({
          test: /\.js$|\.html$|\.css$/,
          // 超过4kb压缩
          threshold: 4096
        })
      )
    }
    Object.assign(config, { // 开发生产共同配置
      resolve: {
        extensions: ['.js', '.vue', '.json', '.scss'],
        alias: {
          'vue$': 'vue/dist/vue.esm.js',
          '@': path.resolve(__dirname, './src'),
          '@components': path.resolve(__dirname, './src/components'),
          '@utils': path.resolve(__dirname, './src/utils'),
        },
        mainFiles: ['index']
      }
    })
  },
  chainWebpack: config => { // webpack链接API，用于生成和修改webapck配置，https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    if (isDevelopment) {
      // 本地开发配置
    } else {
      // 生产开发配置
      //分析打包后文件
      //config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }

    // 移除 prefetch 插件
    config.plugins.delete('prefetch')

    config.plugin('define').tap(args => {
      // console.log(process.env.BASE_URL)
      args[0]['process.env'].BASE_URL = JSON.stringify(process.env.BASE_URL)
      return args
    });

    //【第三方库引用cdn】对于 vue、vue-router、vuex、axios等等这些不经常改动的库、我们让webpack不对他们进行打包，通过cdn引入
    if (process.env.NODE_ENV === 'production') {
      var externals = {
        vue: 'Vue',
        axios: 'axios',
        vuex: 'Vuex',
        'vue-router': 'VueRouter'
      };
      config.externals(externals);
      const cdn = {
        css: [
          // vant css 注：引用cdn资源 [//]开头可以自动适配 http和https
          //'//cdn.jsdelivr.net/npm/vant@1.5.7/lib/index.css'
        ],
        js: [
          // vue
          '//cdn.bootcss.com/vue/2.6.11/vue.min.js',
          // vue-router
          '//cdn.staticfile.org/vue-router/3.0.1/vue-router.min.js',
          // vuex
          '//cdn.staticfile.org/vuex/3.1.0/vuex.min.js',
          // axios
          '//cdn.staticfile.org/axios/0.19.0/axios.min.js',
          // vant js
          //'//cdn.jsdelivr.net/npm/vant@1.5.7/lib/vant.min.js'
        ]
      };
      config.plugin('html').tap(args => {
        args[0].cdn = cdn
        return args
      });
    }
  },
  css: { // 配置高于chainWebpack中关于css loader的配置
    modules: false, // 是否开启支持‘foo.module.css’样式
    extract: true, // 是否使用css分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用<style>方式内联至html文件中
    sourceMap: false, // 是否在构建样式地图，false将提高构建速度
    loaderOptions: { // css预设器配置项
      // css: {
      //     localIdentName: '[name]-[hash]',
      //     camelCase: 'only'
      // },
      // stylus: {}
      // scss: {
      //   prependData: `@import "~@/variables.scss";` //向预处理器 Loader 传递选项，可以这样向所有 Sass 样式传入共享的全局变量
      // },
    }
  },
  parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
  pluginOptions: { // 第三方插件配置
  },
  pwa: { // 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  },
  devServer: {
    open: false,
    // host: '192.168.8.172',
    // port: 8080,
    // https: false,
    // hotOnly: false,
    // disableHostCheck: true,
    // proxy: 'http://192.168.8.172:16619',
    proxy: {
      '/ydzt': {
        target: 'http://192.168.8.172:16619',
        // target: 'http://192.168.8.90',
        ws: true,
        changOrigin: true,
      }
    },
    before: app => {}
  }
};
