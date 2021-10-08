const http = require("http");
const { handleReqRes } = require("./helpers/handleReqRes");
const environment = require("./helpers/environments");
const data = require("./lib/data");

data.delete("test", "test", (err) => console.log(err));

const app = {};

app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(environment.port, () => {
    console.log(`Listening at post: ${environment.port}`);
  });
};

app.handleReqRes = handleReqRes;

app.createServer();
