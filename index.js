const os = require("os");
const find = require("find-process");
const execa = require("execa");
const _ = require("lodash");
const platform = os.platform();

const commands = {
  darwin: {
    killProcess: pid => `kill -9 ${pid}`,
    processByPid: pid => `lsof -aPi -p ${pid}`,
    listByRange: (from, to) => `lsof -i TCP:${from}-${to}`
  },
  win32: {
    killProcess: pid => `taskkill /F /PID ${pid}`
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

  static listPortsInRange(from, to) {
    const cmd = current.listByRange(from, to).split(" ");

    return execa(cmd[0], cmd.slice(1, cmd.length));
  }
}

class PortsManagement {
  static getProcessByPort(port) {
    return Utils.findBy("port", port).then(list =>
      _.get(list, "[0].pid", null)
    );
  }

  static async getOpenPorts(from = 3000, to = 9999) {
    const { stdout } = await Utils.listPortsInRange(from, to);
    const ports = stdout.split("\n");
    return ports;
  }

  static async killProcessByPort(port) {
    const pid = await PortsManagement.getProcessByPort(port);
    if (!pid) throw new Error("Process not found.");
    const { exitCode } = await Utils.killProcess(pid);

    return exitCode == 0;
  }
}

const main = async () => {
  try {
    const port = 8080;
    const pid = await PortsManagement.killProcessByPort(8080);
    console.log({ pid });
    // const ports = await PortsManagement.getOpenPorts();
    // console.log({ ports });
    console.log(platform);
  } catch (error) {
    console.log({ error });
  }
};
main();
