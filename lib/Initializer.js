const debug = require('debug')('Lareow:Initializer');
const path = require('path');
const colors = require('colors');
const fs = require('fs-extra');
const chokidar = require('chokidar');
const {promisify} = require('util');
const exec = promisify(require('child_process').exec);
const ora = require('ora');

const packageJson = require('../package.json');
const defaultOptions = require('./config/defaultOptions');
const defaultSiteConfig = require('./config/defaultSiteConfig');

class Initializer {
	constructor(projectPath = '') {
		if (!projectPath) {
			throw new Error('No project path given to Initializer');
		}
		this.projectPath = projectPath;
		this.projectRootPath = path.resolve(projectPath);
		this.spinner = new ora();
	}

	async init() {
		debug('Initializer starting');
		try {

			this.spinner.text = 'Creating folder';
			this.spinner.start();
			await this.createProjectFolder();
			this.spinner.succeed();

			this.spinner.text = 'Creating project file structure';
			this.spinner.start();
			await this.createFolderStructure();
			this.spinner.succeed();

			this.spinner.text = 'Adding site config';
			this.spinner.start();
			await this.createSiteConfig();
			this.spinner.succeed();

			this.spinner.text = 'Adding Lareow config';
			this.spinner.start();
			await this.createLareowConfig();
			this.spinner.succeed();

			this.spinner.text = 'Processing NPM packages';
			this.spinner.start();
			await this.updatePackageJsonAndInstall();
			this.spinner.succeed();
		} catch (error) {
			console.error(error);
			this.spinner.fail();
		}
	}

	async createLareowConfig() {
		try {
			const fpath = path.join(this.projectRootPath, './lareow.json');
			await fs.writeJSON( fpath, defaultOptions, { spaces: 2 });
		} catch (error) {
			debug('Failed to create Lareow config', error);
			throw new Error('Could not create Lareow config file');
		}
	}

	async updatePackageJsonAndInstall() {
		const pkgPath = path.join(this.projectRootPath, './package.json');

		try {
			const pkg = await fs.readJson(pkgPath);
			pkg.name = this.projectPath.toLowerCase().replace(/[^a-z0-9]/, '-');
			pkg.devDependencies['@dialoguetree/lareow-cli'] = '^' + packageJson.version;
			await fs.writeJSON( pkgPath, pkg, { spaces: 2 });
			debug('Wrote package.json');

			await exec('npm i', {cwd: this.projectRootPath});
			debug('Wrote package.json');

		} catch (error) {
			debug('Failed to process package.json', error);
			throw new Error('Could not process package.json');
		}
	}

	async createProjectFolder() {
		try {
			debug('Creating site folder');
			await fs.ensureDir(this.projectRootPath);
		} catch (error) {
			debug('Failed to create directory for project', error);
			throw new Error('Could not create new project folder');
		}
	}

	async createSiteConfig() {
		try {
			debug('Creating site config');
			const fpath = path.join(this.projectRootPath, defaultOptions.sourceRoot, './site.config.json');
			await fs.writeJSON( fpath, defaultSiteConfig, { spaces: 4 });
		} catch (error) {
			debug('Failed to create directory for project', error);
			throw new Error('Unable to create site.config.json');
		}
	}

	async createFolderStructure() {
		debug(`Start copying site structure`);
		try {
			const sourcePath = path.resolve(__dirname, '..', 'project');
			const destinationPath = path.join(this.projectRootPath);
			const finalProjectSourceRootPath = path.join(this.projectRootPath, defaultOptions.sourceRoot);
			debug(`Copying site structure from ${sourcePath} to ${destinationPath}.`);
			await fs.copy(sourcePath, destinationPath);
			await fs.rename(path.join(destinationPath, 'src'), finalProjectSourceRootPath);
		} catch (error) {
			debug('Error copying', error);
			throw new Error('Could not copy folder structure for project');
		}
	}
}

module.exports = Initializer;
