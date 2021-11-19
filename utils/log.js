const chalk = require('chalk');
const log = require('single-line-log').stdout;

module.exports = {
  success(msg) {
    console.log(chalk.green(`>> ${msg}`));
  },
  error(msg) {
    console.log(chalk.red(`>> ${msg}`))
  },
  info(msg) {
    console.log(chalk.blue(`>> ${msg}`))
  },
  progress(tex = '请稍后') {
    const tags = ['/', '-', '|', '\\', '|', '-']
    let i = 6;
    const time = setInterval(() => {
      log(`${chalk.green(tags[i++ % 6])} ${chalk.gray(tex)}`)
    }, 100)

    return (msg) => {
      log(`${chalk.gray(msg)}\n`)
      clearInterval(time)
    }
  }
}