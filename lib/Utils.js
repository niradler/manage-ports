const os = require("os");
const find = require("find-process");
const execa = require("execa");
const platform = os.platform();

const commands = {
  darwin: {
    killProcess: pid => `kill -9 ${pid}`,
    processByPid: pid => `lsof -aPi -p ${pid}`
  },
  win32: {
    killProcess: pid => `taskkill /F /PID ${pid}`
  },
  linux: {
    killProcess: pid => `kill -9 ${pid}`
  }
};

const current = commands[platform];

class Utils {
  static killProcess(pid) {
    const cmd = current.killProcess(pid).split(" ");

    return execa(cmd[0], cmd.slice(1, cmd.length));
  }
  static findBy(name, value) {
    return find(name, value);
  }
  static getPortsByPid(pid) {
    const cmd = current.processByPid(pid).split(" ");

    return execa(cmd[0], cmd.slice(1, cmd.length));
  }
}

module.exports = Utils;
