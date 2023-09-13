const chalk = require("chalk");

class Logging {
  static log(args) {
    return this.info(args);
  }

  static info(args) {
    const timestamp = new Date().toLocaleString();
    console.log(chalk.blue(`[${timestamp}][INFO]`), typeof args === 'string' ? chalk.blueBright(args) : args);
  }

  static warning(args) {
    const timestamp = new Date().toLocaleString();
    console.log(chalk.yellow(`[${timestamp}][INFO]`), typeof args === 'string' ? chalk.yellowBright(args) : args);
  }

  static error(args) {
    const timestamp = new Date().toLocaleString();
    console.log(chalk.red(`[${timestamp}][INFO]`), typeof args === 'string' ? chalk.redBright(args) : args);
  }
}

module.exports = Logging;
