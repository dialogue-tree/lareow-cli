#!/usr/bin/env node
const debug = require('debug')('SiteGen:CLI');
const commander = require('commander');
const colors = require('colors/safe');
const fs = require('fs-extra');
const {Builder, Initializer} = require('../lib');
const version = require('../package.json').version;

commander
	.name('static-gen')
	.version(version, '-v, --version');

commander
	.command('init')
	.description('Initialize a new site, creating files and a folder structure. Warning, can overwrite some files.')
	.action( async () => {
		debug('Initializing with default config');
		console.log(colors.green('Initializing new site.'));
		Initializer.init();
	});

commander
	.command('build [configjson]')
	.description('Build site based on provided config, or looks for `site.config.json` by default')
	.action( async (configjson) => {
		if (!configjson) {
			configjson = './site.config.json';
		}

		try {
			if (await fs.exists(configjson)) {
				const siteConfig = await fs.readJSON(configjson);
				debug('loaded config', configjson);

				const builder = new Builder(siteConfig);
				builder.build();
			} else {
				console.log(colors.red(`File ${configjson} does not exist...`));
			}
		} catch (error) {
			console.error(error);
		}
	});

commander
	.command('*', 'foo', {})
	.action( async () => {
		commander.outputHelp();
	});

commander.parse(process.argv);

if (process.argv.length == 2) {
	commander.outputHelp();
}
