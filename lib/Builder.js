const debug = require('debug')('Lareow:Builder');
const { promisify } = require('util');
const path = require('path');
const fs = require('fs-extra');
const ejs = require('ejs');
const glob = promisify(require('glob'));

const defaultOptions = require('./config/defaultOptions');
const defaultSiteConfig = require('./config/defaultSiteConfig');

// --------------

class Builder {

	/**
	 * pass in client options
	 * @param {any} siteConfig - site config for templates
	 * @param {any} options - options for builder
	 */
	constructor(siteConfig, options) {
		options = options || {};

		this.options = Object.assign({}, defaultOptions, options);
		this.siteConfig = siteConfig || defaultSiteConfig;
	}

	async build() {
		await this.emptyOutputDir();
		await this.copyAssets();
		await this.compileTemplates();
	}

	async emptyOutputDir() {
		debug(`Emptying ${this.options.buildOutputDir}`);
		return fs.emptyDir(this.options.buildOutputDir);
	}

	async copyAssets() {
		debug(`Copying assets from ${this.options.sourceRoot}/assets to ${this.options.buildOutputDir}/assets`);
		if (await fs.exists(path.join(this.options.sourceRoot, 'assets'))) {
			return fs.copy(`${this.options.sourceRoot}/assets`, `${this.options.buildOutputDir}/assets`);
		} else {
			return Promise.resolve();
		}
	}

	async getGlobbedPages() {
		debug(`Globbing pages with pattern: ${this.options.globs.pages}`);
		const pages = glob(this.options.globs.pages, { cwd: `${this.options.sourceRoot}/pages` });
		return pages;
	}

	async compileTemplates() {
		const opt = this.options;
		const pages = this.getGlobbedPages();

		pages
			.then(files => {
				files.forEach(file => {
					// get file data and destination path for all pages
					const fdata = path.parse(file);
					const dpath = path.join(opt.buildOutputDir, fdata.dir);

					// create folder structure in build output
					fs.mkdirs(dpath)
						.then(() => {
							// then render pages
							const pagedata = Object.assign({}, this.siteConfig);
							const filepath = path.join(opt.sourceRoot, opt.locations.pages, file);

							debug(`Rendering page ${filepath} with config`);
							return ejs.renderFile(filepath, pagedata);
						})
						.then(async (pageContent) => {
							// render page with layout
							const pagedata = Object.assign({}, this.siteConfig, { body: pageContent });
							const filepath = path.join(opt.sourceRoot, opt.locations.layouts, opt.locations.defaultLayout);
							debug(`Rendering layout ${filepath} with config`);
							return ejs.renderFile(filepath, pagedata);
						})
						.then( async (htmlFileContent) => {
							// write page to location
							const filepath = path.join(opt.buildOutputDir, `${fdata.name}.html`);
							debug(`Writing html file`, filepath);
							fs.writeFile(filepath, htmlFileContent);
						})
						.catch((err) => console.error(err))
						.finally(() => {
							// do cleanup?
						});
				});
			})
			.catch((err) => console.error(err))
			.finally(() => {
				// do cleanup if required
			});
	}
}

module.exports = Builder;
