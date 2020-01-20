module.exports = [
    {
        script: './app.js',
        name: 'search-restaurants',
        exec_mode: 'cluster',
        instances: 1,
        watch: false,
        env: {
            "NODE_ENV": "development",
            PORT: 3000
        }
    }
]