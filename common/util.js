const chalk = require('chalk')
const fs = require('fs')

const message = {
  success(text) {
    console.log(chalk.green.bold(text))
  },
  error(text) {
    console.log(chalk.red.bold(text));
  },
  info(text) {
    console.log(chalk.blue.bold(text));
  },
  light(text) {
    console.log(chalk.yellow.bold(text));
  }
}
/**
 * node 异常，终止
 * @param {*} msg 
 */
function abort(msg) {
  message.error(msg)
  process.exit(1)
}

/**
 * 判断一个目录是否是空目录
 * @param {*} dir 
 */
function isEmptyDir(dir) {
  let files = fs.readdirSync(dir)
  return files.length ? true : false
}
/**
 * ccl-starter-cli hlep
 */
function showHelp() {
  console.log('Basic Usage:');
  console.log('\tccl-starter-cli init\tCreate New Empty Project');
  console.log('\tccl-starter-cli help\tShow Help');
}
module.exports = {
  message,
  abort,
  isEmptyDir,
  showHelp
}