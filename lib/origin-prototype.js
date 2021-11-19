const spawn =  require('cross-spawn');
const LogUtil =  require('../utils/log');
const inquirer = require('inquirer')

module.exports = {
    // 开启子进程（异步）
    spawn: function(cmd = '', args = [], stdio = 'inherit') {
        return spawn(cmd, args, { stdio });
    },

    // 日志输出
    log: function(content, type = 'success') {
        LogUtil[type](content);
    },

    // 交互命令行
    inquirer: inquirer
}