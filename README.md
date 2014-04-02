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
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-jekyll-ghpages --save-dev
```

Once the plugin has been installed **update your gruntfile** to something like this:

```js
var extend = require('extend'),
    jgh = require('grunt-jekyll-ghpages');

module.exports = function(grunt) {
  grunt.initConfig(extend(jgh.config, {
    pkg: grunt.file.readJSON('package.json'),
    // ...
  });

  // Load all available grunt tasks with loadNpmTask
  // so you don't have to do grunt.loadNpmTask(...)
  // for each plugin you use
  require('load-grunt-tasks')(grunt);

  // Shortcuts to jekyll_ghpages tasks (optional, but recommended)
  grunt.registerTask('default', ['jekyll_ghpages_dev',]);
  grunt.registerTask('serve', ['jekyll_ghpages_serve',]);
  grunt.registerTask('deploy', ['jekyll_ghpages_deploy',]);
};
```

Update your ```package.json``` properties to include the settings (below).

## Settings

All settings defined here are required.

Any variables required by Jekyll and/or you need accessible under ```{{ site }}``` define it here.

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

* Specify the ```baseurl``` property to be the domain name of your choice to **//[subdomain.]example.com**. 
* Specify the domain in the ```CNAME``` file.

Update your DNS records following the instructions [provided by Github](https://help.github.com/articles/setting-up-a-custom-domain-with-pages).

---

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
