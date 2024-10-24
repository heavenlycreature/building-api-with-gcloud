const Hapi = require("@hapi/hapi");
const routes = require("./routes");

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });
  await server.start();
  console.log(`Server running on port ${server.info.uri}`);

  server.route(routes);
};
init();
