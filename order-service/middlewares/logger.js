const { createLogger, format, transports } = require('winston');
const { combine, timestamp, prettyPrint } = format;
const path = require('path');

const logger = createLogger({
    // format: combine(
    //     prettyPrint(),
    //     format.timestamp({
    //         format: 'YYYY-MM-DD HH:mm:ss'
    //     }),
    //     format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    // ),
    transports: [
        new transports.Console(),
        new transports.File(
            {
                filename: 'log/error.log', level: 'error', handleExceptions: true,
                format: format.combine(
                    format.label({ label: path.basename('logs/error.log') }),
                    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                    format.json(),
                )
            }),
        new transports.File({
            filename: 'log/info.log', level: 'info',
            format: format.combine(
                format.label({ label: path.basename('logs/error.log') }),
                format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                format.json(),
            )
        })
    ],
    exitOnError: false
});

module.exports = logger;