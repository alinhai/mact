const { createDecipheriv } = require('crypto');
const fs = require('fs');
const path = require('path');



module.exports = {

  // 查看文件/文件夹是否存在
  checkFileIsExists(path) {
    return fs.existsSync(path);
  },

  // 删除文件/文件夹
  deleteDir(path) {
    return new Promise(resolve => {
      fs.rm(path, {recursive: true}, err => {
        if(err) {
          throw err;
        }
        return resolve()
      })
    })
  },

  // 创建文件夹
  createDir(path) {
    return new Promise(resolve => {
      fs.mkdir(path, {recursive: false}, err => {
        if(err) {
          throw err;
        }
        return resolve()
      })
    })
  },
  
  // 获取文件
  readFile(path) {
    return new Promise(resolve => {
      fs.readFile(path, { encoding: 'utf8' }, (err, data) => {
        if(err) {
          throw err;
        }
        return resolve(data)
      })
    })
  },
  
  // 写入文件
  writeFile(path, data) {
    return new Promise(resolve => {
      fs.writeFile(path, data, {}, (err) => {
        if(err) {
          throw err;
        }
        return resolve()
      })
    })
  },
  
  // 复制目录/文件
  copyDir(src, dest) {
    const srcRE = src.replace(/\//g, '\\');
    return new Promise(resolve => {
      fs.cp(
        src,
        dest,
        {
          recursive: true,
          // filter: (item) => {
          //   const str = item.replace(srcRE, '').replace(/\\/g, '/');
          //   return !ignoreFiles.find(file => str.includes(file));
          // }
        }, 
        (err) => {
          if(err) {
            throw err;
          }
          return resolve()
        }
      )
    })
  },

}