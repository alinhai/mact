// #!/usr/bin/env node

const spawn =  require('cross-spawn');  
const version = require('./package').version;

// 配置命令 https://www.npmjs.com/package/commander
const commander = require('commander');


const createProgramFs = require('./lib/create-program-fs');
const originPrototype = require('./lib/origin-prototype');
const Config = require('./config');

// 获取自定义命令
function getCustomScriptDesc() {
  return Config.customScripts.map(({ name, desc }) => `${name} -> ${desc}`).join(' | ')
}

// 版本号
commander.version(version, '-v, --version');

// 创建含有默认模板或自定义模板的项目
commander
  .command('create <name>')
  .description('创建模板项目<name>')
  .action((cmd, option) => createProgramFs(cmd));

// 本地构建
commander
  .command('dev')
  .description('本地构建')
  .action(() => spawn('npm', ['run', 'dev'], { stdio: 'inherit' }))

// 生产构建
commander
  .command('build')
  .description('生产构建')
  .action(() => spawn('npm', ['run', 'build'], { stdio: 'inherit' }))

// 自定义命令
commander
  .command('run <cmd>')
  .description('当前<cmd>包含：' + getCustomScriptDesc())
  .action(async (cmd, option) => {
    const script = Config.customScripts.find(s => s.name === cmd);

    await script.callback.call(originPrototype, cmd, option)
  })

// main entry
commander.parse(process.argv)
