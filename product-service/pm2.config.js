module.exports = [
    {
        script: './app.js',
        name: 'product-service',
        exec_mode: 'cluster',
        instances: 1,
    }
]