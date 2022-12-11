const Env = require('./Env.js');

const defaultServerHost = 'http://localhost:5100/api';
//Env.getDefaultServerHost() || 'http://localhost:5100/api';
const defaultAppBase = Env.getAppBase() || '';

// Back-end
const getLoginUrl = (host = defaultServerHost) => {
  return `${host}/user/login`;
};

const getSystemInfoUrl = (host = defaultServerHost) => {
  return `${host}/system/info`;
};

const getDiskInfoUrl = (host = defaultServerHost) => {
  return `${host}/system/disk`;
};

// Front-end
const getLoginPageUrl = (appBase = defaultAppBase) => {
  return `${appBase}/login`;
};

const getHomePageUrl = (appBase = defaultAppBase) => {
  return `${appBase}/home`;
};

module.exports = {
  getLoginUrl,
  getLoginPageUrl,
  getHomePageUrl,
  getSystemInfoUrl,
  getDiskInfoUrl,
};
