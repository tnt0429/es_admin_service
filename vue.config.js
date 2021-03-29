'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue Element Admin' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 9527
// const port = process.env.port || process.env.npm_config_port || 8081 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
    /**
     * You will need to set publicPath if you plan to deploy your site under a sub path,
     * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
     * then publicPath should be set to "/bar/".
     * In most cases please use '/' !!!
     * Detail: https://cli.vuejs.org/config/#publicpath
     */
    publicPath: process.env.VUE_APP_BASE_WEB,
    outputDir: process.env.VUE_OUTPUT_DIR,
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    devServer: {
        port: 9000,
        host: 'localhost',
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            [process.env.VUE_APP_BASE_API]: {
                // '/dds': {
                ws: false, // proxy websockets
                target: "http://localhost:8081/"
                // changeOrigin: true,
                // pathRewrite: {
                //   ['^' + process.env.VUE_APP_BASE_API]: ''
                // }
            }
        }
    },
    chainWebpack: config => {
        config.externals({
            jquery: "jQuery",
            moment: "moment",
            rxjs: "Rx"
            // lodash: "_",
            // vue: "Vue",
            // "vue-router": "VueRouter",
            // vuex: "Vuex",
            // "element-ui": "ELEMENT",
            // axios: "axios",
            // xlsx: "XLSX"
        });
    },
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    }
};
