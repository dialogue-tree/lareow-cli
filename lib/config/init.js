const defaultSiteConfig = require('./defaultSiteConfig');
const defaultOptions = require('./defaultOptions');

const starterProject = {
	folders: [
		{
			name: 'pages',
			files: [
				{
					name: 'index.ejs',
					content: `
					<h1>Index page</h1>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>`
				},
				{
					name: 'about.ejs',
					content: `
					<h2>About</h2>
					<p>This is the about page</p>`
				}
			],
		},
		{
			name: 'layouts',
			files: [{
				name: 'default.ejs',
				content: `
				<!DOCTYPE html>
				<html lang="en">
					<head>
						<%- include('../partials/head') %>
					</head>
					<body>
						<%- body -%>

						<%- include('../partials/footer') %>
						<%- include('../partials/bodyscripts') %>
					</body>
				</html>
				`
			}]
		},
		{
			name: 'partials',
			files: [{
				name: 'head.ejs',
				content: `
				<meta charset="utf-8">
				<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<meta name="description" content="<%= site.siteDescription %>">
				<title><%= site.siteName %></title>
				`
			},
			{
				name: 'footer.ejs',
				content: `
				<footer>
					<p>I am a footer on a page</p>
				</footer>`
			},
			{
				name: 'bodyscripts.ejs',
				content: `<script src="assets/js/index.js"></script>`
			}]
		},
		{
			name: 'assets',
			folders: [
				{
					name: 'css',
					files: [{
						name: 'style.css',
						content: `
						body {
							margin: 0 15px;
						}`
					}]
				},
				{
					name: 'js',
					files: [{
						name: 'index.js',
						content: `console.log('foo');`
					}]
				},
			]
		}
	]
};

module.exports = {
	starterProject,
	defaultOptions,
	defaultSiteConfig
};
