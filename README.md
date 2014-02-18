# grunt-todo-server

> Grunt todo server.

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-todo-server --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-todo-server');
```

## The "todo_server_extract" task
In your project's Gruntfile, add a section named `todo_server_extract` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  todo_server_extract: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.folder
Type: `String`
Default value: `todo_server`

The folder used when generating static files and todo data.

## The "todo_server_start" task
In your project's Gruntfile, add a section named `todo_server_start` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  todo_server_start: {
    options: {
      // Task-specific options go here.
    }
  },
});
```

### Options

#### options.hostname
Type: `String`
Default value: `localhost`

The hostname used by the webserver.

#### options.port
Type: `Integer`
Default value: `9000`

The port used by the webserver. The task will fail if the specified port is already in use.

### options.open
Type: `Boolean`
Default value: `false`

Opens a new page in your browser when the webserver is ready.

### options.folder
Type: `String`
Default value: `todo_server`

The folder used by the webserver.

## Examples

#### Default Options
In this example, `todo_server_extract` will parse all the files in `src/*.*` and outputs todo data and static files to `todo_server`. You can then use `todo_server_start` to start a webserver and access this data at `http://localhost:9000`.

```js
grunt.initConfig({
  todo_server_start: { },
  
  todo_server_extract: {
    files: {
      src: [
        'styles/*.css',
        'scripts/*.js'
      ]
    }
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Todo
- Simplify options, merge tasks(?)
- Add an option to control the regex used during extraction
- Refresh the page automatically when `todo_server_extract` finishes
- Polish UI
- Improve default theme
- Add more themes
- Tests

## Release History
_(Nothing yet)_
