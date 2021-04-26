module.exports = {
    baseUrl: '',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:12002/',//代理的域名地址
                // target:'http://192.168.1.121:12002/',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/score': {
                target: 'http://127.0.0.1:12002/',//代理的域名地址
                // target:'http://192.168.1.108:12002/',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/score': ''
                }
            }
        }
    }
}