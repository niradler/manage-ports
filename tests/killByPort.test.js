const path = require("path");
const PortsManagement = require("../lib/PortsManagement");

const { fork } = require("child_process");

test("kill process by port", async () => {
  try {
    const forked = fork(path.join(__dirname, "webServer.js"));

    const wait = new Promise(resolve =>
      forked.on("message", msg => {
        resolve(msg);
      })
    );
    const { port } = await wait;

    const pid = await PortsManagement.getProcessByPort(port);
    expect(pid).toBeDefined();
    const killed = await PortsManagement.killProcessByPort(port);

    expect(killed).toEqual(true);
    expect(forked.connected).toEqual(false);
  } catch (error) {
    throw error;
  }
});
