const defaultOptions = {
	buildOutputDir: './dist',
	sourceRoot: './src',
	siteConfigJsonFile: './site.config.json',
	globs: {
		pages: '**/*.ejs'
	},
	locations: {
		pages: 'pages',
		layouts: 'layouts',
		partials: 'partials',
		data: 'data',
		defaultLayout: 'index.ejs'
	}
};

module.exports = defaultOptions;
