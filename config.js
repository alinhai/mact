module.exports = {

    // 根目录
    root: __dirname,

    // 执行命令目录路径
    dir_root: process.cwd(),

    // 项目路径
    entry: './',

    // 项目编译输出文件夹
    output: './',

    // 模版目录
    template: __dirname + '/template',

    // 需要修改的模板文件列表
    needChangeTemplates: [
      '/.drone.yml',
      '/.project',
      '/appspec.yml',
      '/Dockerfile',
      '/package-lock.json',
      '/package.json',
      '/README.md',
      '/config/dev.env.js',
      '/config/prod.env.js',
      '/config/test.env.js',
      '/config/index.js',
      '/scripts/nginx.conf.tpl',
      '/scripts/patch.sh.tpl',
      '/scripts/start.sh',
      '/src/config/config_master.ts',
      '/src/config/config_uat.ts',
      '/src/views/home.vue',
    ],

    // 替换needChangeTemplates中的内容正则
    fileContentRE: /\$projectName/g,

    /**
     * 自定义命令
     *  {
     *     name: string
     *     desc: string
     *     callback: function
     *  }[]
     */
    customScripts: []

};