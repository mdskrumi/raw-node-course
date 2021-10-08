const handler = {};

handler.sampleHandler = (requestProperties, callBack) => {
  callBack(200, {
    status_code: 200,
    message: "This is sample response",
    data: requestProperties,
  });
};

module.exports = handler;
