module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8081',
                changeOrigin: false
            },
            '/prodapi': {
                target: 'https://reference.dn.divinitor.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/prodapi': '/api'
                }
            }
        }
    }
};