const path = require('path');
const getSubNpmTask = require('./getSubNpmTask');

const env = process.env.NODE_ENV;
const configByEnv = path.resolve(__dirname, `../config/config.${env}.js`);
const packageInfo = require('../package.json');
const src = path.resolve(__dirname, '../src');
const dist = path.resolve(__dirname, '../dist');
const isLegacy = getSubNpmTask(process);

module.exports = { env, packageInfo, src, dist, isLegacy, configByEnv };
