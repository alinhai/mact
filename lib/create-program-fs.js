
// 创建交互命令 https://www.npmjs.com/package/inquirer
const inquirer = require('inquirer');
const path = require('path');
const FsUtil = require('../utils/fs');
const LogUtil = require('../utils/log');
const customConf = require('./custom-config-merge');
const Config = require('../config');
const __Data__ = {}


__Data__.projectPath = ''
// 处理项目名称
async function dealProjectName() {
  const { projectName } = __Data__;
  // 项目名是否存在
  let projectNameExists = false;
  // 获取项目路径
  __Data__.projectPath = path.join(Config.dir_root, '/', projectName);

  // 检查项目名是否存在
  if(FsUtil.checkFileIsExists(__Data__.projectPath)) {
    projectNameExists = true;
  }

  // 命令行交互
  let question = [
    {
      type: 'list',
      name: 'deleteProject',
      message: `${projectName}目录已存在，是否删除？`,
      choices: [
        'Y',
        'N'
      ],
      when(answer){
        return projectNameExists;
      }
    }
  ]
  const answer = await inquirer.prompt(question).then(answer => answer)
  if(answer.deleteProject === 'N') {
    LogUtil.error(`创建失败：${projectName}目录已存在，请重新命名`)
    
    question = [
      {
        type: 'input',
        name: 'projectName',
        message: '请重新输入项目名：',
        default:`${projectName}(1)`
      }
    ]
    __Data__.projectName = await inquirer.prompt(question).then(answer => answer.projectName)

    // 如果重命名后还是重名，使用递归处理
    if(projectNameExists) {
      await dealProjectName()
      return;
    }
  }
  if(answer.deleteProject === 'Y') {
    await FsUtil.deleteDir(__Data__.projectPath)
    LogUtil.error('删除成功')
  }
}

// 创建模板
async function createProject() {
  __Data__.close = LogUtil.progress(`正在创建${__Data__.projectName}，请稍后`)
  // 项目路径
  const projectRoot = path.join(Config.dir_root, '/', __Data__.projectName)
  await FsUtil.createDir(projectRoot)

  // 模板路径
  const templateRoot = Config.template

  // 复制模板到项目目录
  await FsUtil.copyDir(templateRoot + '/', projectRoot + '/')

  // 修改需要修改的文件
  await writeProjectFile(projectRoot)
}

// 修改文件
async function writeProjectFile(projectRoot) {
  const list = Config.needChangeTemplates;
  while(list.length) {
    const fileSrc = projectRoot + list.shift().replace(/\//g, '\\')

    // 读取文件内容
    if(!FsUtil.checkFileIsExists(fileSrc)) {
      continue;
    }
    const data = await FsUtil.readFile(fileSrc)
    const replaceData = data.replace(Config.fileContentRE, __Data__.projectName)

    // 写入文件
    await FsUtil.writeFile(fileSrc, replaceData)
  }
   
  __Data__.close('')
  LogUtil.success('创建成功，执行请：')
  LogUtil.success(`cd ${__Data__.projectName}`)
  LogUtil.success('mact dev')
}

module.exports = async function (projectName) {
  __Data__.projectName = projectName;
  await dealProjectName();

  customConf();
  await createProject();
}