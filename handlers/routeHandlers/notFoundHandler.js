const handler = {};

handler.notFoundHandler = (requestProperties, callBack) => {
  callBack(404, {
    status_code: 404,
    message: "Not Found",
    data: {},
  });
};

module.exports = handler;
