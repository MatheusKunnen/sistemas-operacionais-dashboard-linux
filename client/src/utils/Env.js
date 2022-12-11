const getDefaultServerHost = () => {
  return process.env.REACT_APP_SERVER_HOST || '/api'; //'http://localhost:5100';
};

const getAppBase = () => {
  return process.env.REACT_APP_APP_BASE || '';
};

const getAnimationDuration = () => {
  return 100;
};

module.exports = { getDefaultServerHost, getAppBase, getAnimationDuration };
