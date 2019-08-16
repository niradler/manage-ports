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
