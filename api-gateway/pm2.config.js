module.exports = [
    {
        script: './app.js',
        name: 'api-gateway',
        exec_mode: 'cluster',
        instances: 1,
        watch: true,
        env: {
            "NODE_ENV": "development",
            PORT: 8080
        }
    }
]