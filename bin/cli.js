#!/usr/bin/env node
const debug = require('debug')('SiteGen:CLI');
const commander = require('commander');
const colors = require('colors/safe');
const fs = require('fs-extra');

const Builder = require('../lib');

const version = require('../package.json').version;
const defaultSiteConfig = require('../lib/config/defaultSiteConfig');

commander
	.name('static-gen')
	.version(version, '-v, --version');

// commander
// 	.command('help')
// 	.action( () => {
// 		console.log('foo help');
// 	});

commander
	.command('init')
	.description('Creates a `site.config.json` in the current directory with the default site options')
	.action( async () => {
		debug('Initializing with default config \n %o', defaultSiteConfig);
		console.log(colors.green('Initializing new site.config.json'));

		if (await fs.exists('./site.config.json')) {
			console.log(colors.yellow('A site.config.json already exists...'));
		} else {
			fs.writeJSON('./site.config.json', defaultSiteConfig, {spaces: 4});
		}
	});

commander
	.command('clear')
	.description('Clears the default output directory')
	.action( async () => {
		console.log(colors.green(`Deleting ./dist`));
		await fs.emptyDir('./dist');
	});

commander
	.command('build [configjson]')
	.description('Build site based on provided config, or looks for `site.config.json` by default')
	.action( async (configjson) => {
		if (!configjson) {
			configjson = './site.config.json';
		}

		if (await fs.exists(configjson)) {
			const siteConfig = await fs.readJSON(configjson);
			const builder = new Builder(siteConfig);

			debug('loaded config', siteConfig);

			builder.build();

		} else {
			console.log(colors.red(`File ${configjson} does not exist...`));
		}
	});

commander.parse(process.argv);
