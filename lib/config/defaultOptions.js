const defaultOptions = {
	$schema: './node_modules/@dialoguetree/lareow-cli/lib/config/optionsSchema.json',
	version: 1,
	buildOutputDir: 'dist',
	tempDir: 'build',
	sourceRoot: 'src',
	siteConfigJsonFile: 'site.config.json',
	globs: {
		pages: '**/*.ejs'
	},
	locations: {
		assets: 'assets',
		pages: 'pages',
		layouts: 'layouts',
		partials: 'partials',
		data: 'data',
		defaultLayout: 'default.ejs'
	},
	templateLanguage: 'ejs',
	styleLanguage: 'css',
	scriptLanguage: 'js',
	scripts: {},
	styles: {}
};

module.exports = defaultOptions;
