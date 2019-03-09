# Static-gen

Dialogue tree static site generator CLI.

## Usage

Install globally with `npm install -g @dialoguetree/static-gen` or run with `npx` like in examples below.

### New site
Create new site with `npx @dialoguetree/static-gen init` (or `static-gen init` if installed globally). This will create a folder structure and a site.config.json to get starts. Careful, this can and will overwrite files if they already exist.

### Building
Build your site with `npx @dialoguetree/static-gen build <site.config.json>`. You only need to provide the file path if it is different from the default.
