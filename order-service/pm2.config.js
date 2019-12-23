module.exports = [
    {
        script: './app.js',
        name: 'order-service',
        exec_mode: 'cluster',
        instances: 3,
        watch: true,
        env: {
            "NODE_ENV": "development",
            PORT: 3001
        }
    }
]