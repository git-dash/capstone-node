module.exports = [
    {
        script: './app.js',
        name: 'order-service',
        exec_mode: 'cluster',
        instances: 1,
    }
]