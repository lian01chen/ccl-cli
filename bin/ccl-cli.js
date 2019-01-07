#!/usr/bin/env node

const download = require('download-git-repo') // 下载模版
const program = require('commander') // 命令处理
const chalk = require('chalk') // 打印字体颜色
const ora = require('ora')  // 设置
const fs = require('fs')

const { message, isEmptyDir, abort } = require('../common/util')

// 初始化一个项目
program
  .command('init <projectName>')
  .alias('i')
  .description('init a new template project')
  .action((projectName)=>{
    loadTemplate(projectName)
  })
program.parse(process.argv)

/**
 * 下载项目模板
 */
function loadTemplate(dir){
  // 查看是否已经有同名的项目了？
  if(fs.existsSync(dir) && isEmptyDir(dir)){
    abort('dir exist!') 
  }
  let spinner = ora('Loading rainbows ...').start()
  download('lian01chen/ccl-base', dir, function (err) {
    spinner.stop()
    err ? message.error('fail') : message.success('success')
  })
}