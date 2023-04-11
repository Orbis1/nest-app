'use strict';
const { exec } = require('pkg');

const build = async (enter, out) => {
  try {
    await exec([
      enter,
      '--config',
      './pkg.config.json',
      '--output',
      out,
      '--debug',
    ]);
  } catch (error) {
    console.error(error);
  }
};

build('./dist/src/main.js', './auto-execution-server.exe').then(() =>
  console.log(`build is complete`),
);
