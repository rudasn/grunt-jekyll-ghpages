# grunt-jekyll-ghpages

A collection of grunt tasks for simplifying development and deployment of Jekyll-powered sites on GitHub pages.

* [Jekyll](http://jekyllrb.com/) - [Docs](http://jekyllrb.com/docs/home)
* [GitHub Pages](http://pages.github.com/) - [Docs](https://help.github.com/categories/20/articles) and [GitHub Pages Docs](http://jekyllrb.com/docs/github-pages/)
* [Grunt](http://gruntjs.com/) - [Docs](http://gruntjs.com/getting-started)

Follows best practices for **fast development**, **easy maintenance**, and **high performance** websites. Google Page Speed, YSlow, your users, and you will be very happy with the end result.

* Lints your CSS and JavaScripts (using JSList and CSSList)
* Concatenates and minifies CSS and JavaScript files (using Uglify)
* Optimizes images (OptiPNG, pngquant, jpegtran and gifsicle)
* Minifies HTML pages (using html-minifier)
* Cache busting of static files
* Easy local development workflow
* Easy deployment to GitHub Pages


## Getting Started

In a nutshell:

1. Update [`Gruntfile.js`](#gruntfilejs) to use this plugin.
2. Update [`package.json`](#packagejson) with the required [settings](#settings).
3. Use `package.json` instead of `_config.yml`.

This plugin requires:

* Jekyll
* node & npm
* Grunt `~0.4.1`
* GitHub account

### Jekyll

If you haven't used Jekyll before, be sure to checkout the [Quick-start guide](http://jekyllrb.com/docs/quickstart/) and the [Documents](http://jekyllrb.com/docs/home/).

As you know, Jekyll requires a `_config.yml` file which defines project settings and site variables.

**This plugin creates and overrides this file by converting `package.json` to `_config.yml`.** If you already have a `_config.yml` file be sure to define these settings in `package.json` before you proceed.

### package.json

**`package.json` holds all your project settings, Jekyll config values, and site variables.** See [Settings](#settings) for settings required by this plugin and the [Jekyll docs on configuration](http://jekyllrb.com/docs/configuration/). 

If you don't have a `package.json` file in your root directory go ahead and create one. If you are not familiar with this kind of file, be sure to checkout this [introduction](http://docs.nodejitsu.com/articles/getting-started/npm/what-is-the-file-package-json).

You can see an example under [`examples/package.json`](https://github.com/rudasn/grunt-jekyll-ghpages/blob/master/examples/package.json).

### Grunt

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may **install this plugin** with this command:

```shell
npm install grunt-jekyll-ghpages --save-dev
```

### Gruntfile.js

This plugin provides a set of tasks based on other grunt plugins so all you have to do is make sure you extend your grunt configuration to include these tasks.

Once the plugin has been installed **update your gruntfile** to something like this.

```js
var extend = require('extend'),
    jgh = require('grunt-jekyll-ghpages');

module.exports = function(grunt) {
  grunt.initConfig(extend(jgh.config, {
    pkg: grunt.file.readJSON('package.json'),
    // your grunt config here
  });

  // Load all available grunt tasks at once
  // so you don't have to do grunt.loadNpmTask(...)
  // for each plugin you use.
  require('load-grunt-tasks')(grunt);

  // Shortcuts to jekyll_ghpages tasks (optional, but recommended)
  grunt.registerTask('default', ['jekyll_ghpages_dev',]);
  grunt.registerTask('serve', ['jekyll_ghpages_serve',]);
  grunt.registerTask('deploy', ['jekyll_ghpages_deploy',]);
};
```

You can see and modify these tasks in `node_modules/grunt-jekyll-pages/tasks/jekyll_ghpages.js` line 11.

## Settings

Specify these settings in your `package.json` file.

### version

The current release version of the website. A git tag is created with the version of your site when you ```deploy```.

### name

The name of the project (string, no whitespace).

### baseurl

The root directory of the website (string, no trailing slash).

If only hosting on GitHub pages this should be your project's name, eg **/jekyll-template**.

If using a custom domain this should be the domain name in the following format: **//[subdomain.]example.com**.

### build_dir

The name of the folder in which Jekyll will build the site.

Default: ```_site```

### serve_dir

The name of the folder in which to build the site when serving locally (via ```grunt serve```) prior to deploying.

Default: ```.serve```

### assets_dir

The name of the folder were your static assets will live.

Default: ```static```

### assets

A dictionary specifying the directories for images, styles, and scripts.

Default:

```
"assets": {
    "images": "/static/images/",
    "css": "/static/css/",
    "js": "/static/js/"
}
```

---

## Available Tasks

Normally you would only need to use the ```jekyll_ghpages_dev```, ```jekyll_ghpages_serve```, and ```jekyll_ghpages_deploy``` tasks (in that order).

You can also call tasks using the format `grunt jekyll_ghpages:[task]` (eg. `grunt jekyll_ghpages:dev` or `grunt jekyll_ghpages:deploy`).

### jekyll_ghpages_dev

Prepares your Jekyll site for development and serves it from http://127.0.0.1:4000.

It also watches for changes and rebuilds the site.

### jekyll_ghpages_serve

Prepares your Jekyll site for deployment and runs it from http://127.0.0.1:9001 so that you can make sure everything works as expected. 

Internally it calls the ```build```, ```lint```, and ```static``` tasks.

### jekyll_ghpages_deploy

Deploys the site on GitHub (gh-pages branch). Internally it calls the ```build```, ```lint```, and ```static``` tasks.

### jekyll_ghpages_build

Calls ```config``` task and builds the site with ```jekyll build```.

### jekyll_ghpages_config

Converts ```package.json``` to ```_config.yml``` for Jekyll. 

### jekyll_ghpages_lint

Runs JSList and CSSList on your static assets.

### jekyll_ghpages_static

Prepares your static assets for release.

* Runs JSList and CSSList on your static assets
* Concatenates and minifies CSS and JavaScript files
* Optimizes images
* Updates references to static assets to break the cache
* Minifies HTML pages

---

## How to

### Use a Custom Domain

* Specify the `baseurl` property in `package.json` to be the domain name of your choice to **`//[subdomain.]example.com`**. 
* Specify the domain in the `CNAME` file (eg. `[subdomain.]example.com`).

Update your DNS records following the instructions [provided by Github](https://help.github.com/articles/setting-up-a-custom-domain-with-pages).

---

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
