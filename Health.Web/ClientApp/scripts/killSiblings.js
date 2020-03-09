/**
 * VS Code does not kill child `node` processes, which keeps tons of them in memory. Those instances interfere preventing Wepback dev server to work correctly.
 * Here we send a message to our old `node` process to kill itself.
 */

const client = require("node-ipc");
const server = require("node-ipc");
const srvName = "policy-catalog-web-node-ipc-server";


client.config.retry = 1;
client.config.silent = true;
client.connectTo(srvName, () => {
    client.of[srvName].on("connect", () => {
        client.of[srvName].emit("policy-catalog-web-node-instance-started");
        client.disconnect(srvName);
        setTimeout(startServer, 1000);      // wait for the server in other process to die
    });

    client.of[srvName].on("error", () => {
        client.disconnect(srvName);
        startServer();
    });

});


let isServerStarted = false;
function startServer() {
    if (isServerStarted)
        return;

    server.config.id = srvName;
    server.config.silent = true;
    server.serve(() => server.server.on("policy-catalog-web-node-instance-started", () => {
        process.exit(1);
    }));
    server.server.start();
    isServerStarted = true;
}
