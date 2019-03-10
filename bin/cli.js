#!/usr/bin/env node
const debug = require('debug')('Lareow:cli');
const yargs = require('yargs');
const colors = require('colors/safe');
const fs = require('fs-extra');
const { Builder, Initializer } = require('../lib');

yargs
	.scriptName('lareow')
	.demandCommand(1)
	.usage('$0 <cmd> [args]')
	// .command('version', 'Returns the version of the tool')
	.command(
		'init <project>',
		'Initialize a new site in the given directory',
		yargs => {
			yargs.positional('project', {
				describe: 'Folder name to be created for the project.'
			});
		},
		async argv => {
			debug('Initializing with default config');
			const projectPath = argv.project || '.';
			const initializer = new Initializer(projectPath);

			try {
				await initializer.init();
			} catch(error) {
				console.error(error);
			}
		}
	)
	.command(
		'build [config]',
		'Build site from templates into the output directory',
		yargs => {
			yargs.positional('config', {
				describe: 'Config file describing the site',
				default: './site.config.json'
			});
		},
		async argv => {
			try {
				if (await fs.exists(argv.config)) {
					const siteConfig = await fs.readJSON(argv.config);
					debug('loaded config', argv.config);

					const builder = new Builder(siteConfig);
					builder.build();
				} else {
					console.log(colors.red(`File ${argv.config} does not exist, cannot continue`));
				}
			} catch (error) {
				console.error(error);
			}
		}
	)
	.help()
	.argv;
