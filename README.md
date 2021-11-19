## 如何使用？

```bash

    # 切换到本项目目录下
    1. cd mact

    # 将mact命令链接到系统变量中
    2. npm link

    # 使用 mact create xxx 创建项目
    3. mact create xxx

    # 更多命令使用 -h 查看
    4. mact -h

```

## 可在mact命令执行目录添加mact.config.js配置文件
> + template 模板绝对路径
> + needChangeTemplates 需要修改的文件列表
> + fileContentRE 正则，匹配修改文件列表中文件内容替换为项目名
> + customScripts 自定义mact命令，使用mact run xxx