// #!/usr/bin/env node

/**
 * 这个文件本是另一种方法实现脚手架，但是由于对tar命令使用有困惑，暂时搁置
 */
const path = require('path')
const readline = require('readline')
const exec = require('child_process').exec
const http = require('http')
const os = require('os')
const fs = require('fs')
const {
  showHelp
} = require('../common/util')


const action = process.argv[2] + (process.argv[3] ? ' ' + process.argv[3] : '')

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '请输入>'
});
// 调用
rl.prompt(); // 控制台结果显示：>请输入

// // TODO 
// //下载仓库
// //用户输入命令交互
var DOWNLOAD_PACKAGE_URL = 'http://git.dev.sh.ctripcorp.com/fx-front-end/node-starter/repository/archive.tar.gz?ref=master';

switch (action) {
  case 'init':
    doInit();
    break;
  case 'help':
  default:
    showHelp();
    break;
}


function doInit() {
  rl.question('请输入项目名' + ' (' + path.basename(process.cwd()) + '): ', function (answer) {})
  download(DOWNLOAD_PACKAGE_URL, (err, file) => {
    if (err) {
      console.log(err)
    } else {

    }
  })
}

function download(url, callback) {
  let req = http.get(url, res => {
    var fileName = ((res.headers['content-disposition'] || '').match(/filename="(.+?)"/) || ['', ''])[1] || 'download.tmp'
    var tmpDir = path.resolve(os.tmpdir(), './tmp_' + (+new Date()) + '_' + ('' + Math.random()).slice(2))
    var filePath = path.resolve(tmpDir, fileName)
    fs.mkdir(tmpDir, err => {
      if (err) {
        callback && callback(err)
        res.destroy()
      } else {
        let stream = fs.createWriteStream(filePath)
        res.pipe(stream)
        stream.on('close', () => {
          callback && callback(null, filePath)
        })
      }
    })
  })
  req.on('error', callback)
}