const defaultOptions = {
	buildOutputDir: 'dist',
	sourceRoot: 'src',
	siteConfigJsonFile: 'site.config.json',
	globs: {
		pages: '**/*.ejs'
	},
	locations: {
		pages: 'pages',
		layouts: 'layouts',
		partials: 'partials',
		data: 'data',
		defaultLayout: 'default.ejs'
	}
};

module.exports = defaultOptions;
