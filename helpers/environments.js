const environments = {};

environments.staging = {
  envName: "STAGING",
  port: 3000,
};

environments.production = {
  envName: "PRODUCTION",
  port: 5000,
};

const currentEnv =
  typeof process.env.NODE_ENV === "string" ? process.env.NODE_ENV : "staging";

const exportEnv =
  typeof environments[currentEnv] === "object"
    ? environments[currentEnv]
    : environments[staging];

module.exports = exportEnv;
