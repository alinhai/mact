const Config = require('../config');
const FsUtil = require('../utils/fs')

function merge() {
    const customConfPath = `${Config.dir_root}/mact.config.js`;
    if(!FsUtil.checkFileIsExists(customConfPath)) {
        return
    }
    const { template, needChangeTemplates = [], fileContentRE } = require(customConfPath)

    FsUtil.checkFileIsExists(template) && (Config.template = template,Config.needChangeTemplates = needChangeTemplates,Config.fileContentRE = fileContentRE);
    Config.customScripts = checkCustomScript()
}

function checkCustomScript(script = []) {
    return script.filter(({ name, desc, callback }) => (typeof name === 'string' && name) && (typeof desc === 'string' && desc) && typeof callback === 'function')
}

module.exports = merge