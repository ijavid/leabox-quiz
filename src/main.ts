import Server from "./server/server";
import {setupDatabase} from "./database";
import {configuration} from "./config";

const server = new Server(configuration);
setupDatabase(configuration).then(() => {
    server.start();
});
