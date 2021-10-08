const url = require("url");
const { StringDecoder } = require("string_decoder");

const routes = require("../route");

const handler = {};

handler.handleReqRes = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname.replace(/^\/+|\/+$/g, "");
  const method = req.method.toLowerCase();
  const queryObj = parsedUrl.query;
  const headers = req.headers;

  const requestProperties = {
    parsedUrl,
    path,
    method,
    queryObj,
    headers,
  };

  const chosenHandler = routes[path] ? routes[path] : routes["notFound"];

  const decoder = new StringDecoder("utf-8");
  let realData = "";

  req.on("data", (buffer) => {
    realData += decoder.write(buffer);
  });

  req.on("end", () => {
    realData += decoder.end();

    chosenHandler(requestProperties, (statusCode, payload) => {
      statusCode = typeof statusCode === "number" ? statusCode : 500;
      payload = typeof payload === "object" ? payload : {};

      res.writeHead(statusCode);
      res.end(JSON.stringify(payload));
    });

    console.log("Real Data: ", realData);
  });
};

module.exports = handler;
