const package = require("./package.json");
const program = require("commander");
const PortsManagement = require("./lib/PortsManagement");

program
  .version(package.version)
  .command("kill")
  .description("Kill process by port.")
  .option("-p, --port <port>", "port")
  .action(args => {
    const { port } = args;
    if (!port) throw new Error("port is mandatory, use the --port flag.");
    PortsManagement.killProcessByPort(port)
      .then(killed =>
        console.log(
          `Process attached to port ${port}, ${
            killed ? "killed successfully." : "couldn't killed."
          }`
        )
      )
      .catch(e => console.log(e.message));
  });

program.parse(process.argv);

program.on("command:*", function() {
  console.error(
    "Invalid command: %s\nSee --help for a list of available commands.",
    program.args.join(" ")
  );
  process.exit(1);
});

if (!process.argv.slice(2).length) {
  program.help();
}
