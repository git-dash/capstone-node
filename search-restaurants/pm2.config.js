module.exports = [
    {
        script: './app.js',
        name: 'search-service',
        exec_mode: 'cluster',
        instances: 1,
    }
]