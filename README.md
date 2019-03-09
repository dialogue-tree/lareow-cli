# Lareow-cli

Lareow static site generator CLI.

## Usage

Install globally with `npm install -g @dialoguetree/lareow` or run with `npx` like in examples below.

### New site
Create new site with `npx @dialoguetree/lareow init` (or `lareow init` if installed globally). This will create a folder structure and a site.config.json to get starts. Careful, this can and will overwrite files if they already exist.

### Building
Build your site with `npx @dialoguetree/lareow build [site.config.json]`. You only need to provide the file if it is different from the default.

## Templates
Currently templating is supported via EJS (https://ejs.co/).

