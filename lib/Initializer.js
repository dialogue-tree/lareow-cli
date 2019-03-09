const debug = require('debug')('SiteGen:Initializer');
const path = require('path');
const colors = require('colors');
const fs = require('fs-extra');
const prettier = require('prettier');

const {defaultSiteConfig, starterProject, defaultOptions} = require('./config/init');

class Initializer {
	constructor() {
		this.filesToCreate = [];
	}

	async init() {
		debug('Initializer starting');
		try {
			await this.createSiteConfig();
			await this.createFolderStructure();
			await this.prettier();
		} catch (error) {
			console.error(error);
		}
	}

	async createSiteConfig() {
		if (await fs.exists('./site.config.json')) {
			console.log(colors.yellow('A site.config.json already exists.'));
		} else {
			fs.writeJSON('./site.config.json', defaultSiteConfig, {spaces: 4});
		}
	}

	async createFolderStructure() {
		debug(`Start creating structure`);
		starterProject.folders.forEach( f => {
			this.processFolder(f, defaultOptions.sourceRoot);
		});
	}

	async processFolder(folder, parent) {
		if (folder.folders) {
			folder.folders.forEach(async f => {
				const parentPath = path.join(parent, folder.name);
				await this.processFolder(f, parentPath);
			});
		} else {
			folder.files.forEach(async file => {
				await this.processFile(file, path.join(parent, folder.name));
			});
		}
	}

	async processFile(file, folderpath) {
		debug(`Processing file: ${file.name}, path: ${folderpath}`);
		const filepath = path.join(folderpath, file.name);
		try {
			await fs.mkdirs(folderpath);
			await fs.writeFile(filepath, await this.prettier(file) );
		} catch (error) {
			console.error(error);
		}
	}

	async prettier(file) {
		if (!file) { return ''; }
		const isEJS = file.name.includes('.ejs');
		let result;
		try {
			result = isEJS
				? await prettier.format(file.content, { parser: 'html', printWidth: 120 })
				: await prettier.format(file.content, { filepath: file.name });

		} catch (error) {
			console.error(error);
		}

		return result;
	}
}

module.exports = new Initializer;
