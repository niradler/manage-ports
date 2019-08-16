const Utils = require("./Utils");
const _ = require("lodash");

class PortsManagement {
  static getProcessByPort(port) {
    return Utils.findBy("port", port).then(list =>
      _.get(list, "[0].pid", null)
    );
  }

  static async killProcessByPort(port) {
    const pid = await PortsManagement.getProcessByPort(port);
    if (!pid) throw new Error("Process not found.");
    const { exitCode } = await Utils.killProcess(pid);

    return exitCode == 0;
  }
}

module.exports = PortsManagement;
