module.exports = function (env) {
    const config = require(`./webpack/webpack.config.${env}.js`)
    return config()
}