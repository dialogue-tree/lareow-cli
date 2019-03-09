const debug = require('debug');
const { promisify } = require('util');
const path = require('path');
const fs = require('fs-extra');
const ejsRenderFile = promisify(require('ejs').renderFile);
const glob = promisify(require('glob'));

module.exports = {
	test: (foo) => console.log(foo || `no foo`)
};