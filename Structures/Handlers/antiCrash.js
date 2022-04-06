const chalk = require("chalk");

module.exports = async (client) => {
    process.on(`unhandledRejection`, (reason, p) => {
        console.log(chalk.green("unhandledRejection") + " " + chalk.blue("Anti Crash Ignoring It") + chalk.red("!!"))
        console.log(reason, p)
    })
    process.on(`uncaughtException`, (err, origin) => {
        console.log(chalk.green("uncaughtException") + " " + chalk.blue("Anti Crash Ignoring It") + chalk.red("!!"))
        console.log(err, origin)
    })
    process.on(`uncaughtExceptionMonitor`, (err, origin) => {
        console.log(chalk.green("uncaughtExceptionMonitor") + " " + chalk.blue("Anti Crash Ignoring It") + chalk.red("!!"))
        console.log(err, origin)
    })
    process.on(`multipleResolves`, (type, promise, reason) => {
        console.log(chalk.green("multipleResolves") + " " + chalk.blue("Anti Crash Ignoring It") + chalk.red("!!"))
        console.log(type, promise, reason)
    })
    
    
}