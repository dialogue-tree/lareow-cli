const debug = require('debug')('Builder');
const { promisify } = require('util');
const path = require('path');
const fs = require('fs-extra');
const ejsRenderFile = promisify(require('ejs').renderFile);
const glob = promisify(require('glob'));

// --------------

class Builder {
	static test(foo) {
		debug('test: %s', foo);
		if (foo) {
			console.log(foo);
		} else {
			console.log('no foo found :(');
		}
	}
};

module.exports = Builder;