Application template
====================

[![build status](https://img.shields.io/travis/stbsdk/boilerplate.svg?style=flat-square)](https://travis-ci.org/stbsdk/boilerplate)
[![dependencies status](https://img.shields.io/david/stbsdk/boilerplate.svg?style=flat-square)](https://david-dm.org/stbsdk/boilerplate)
[![devDependencies status](https://img.shields.io/david/dev/stbsdk/boilerplate.svg?style=flat-square)](https://david-dm.org/stbsdk/boilerplate?type=dev)
[![Gitter](https://img.shields.io/badge/gitter-join%20chat-blue.svg?style=flat-square)](https://gitter.im/DarkPark/stbsdk)


## Usage ##

Create a new project base:

```bash
git clone https://github.com/stbsdk/boilerplate.git my-project
```

Remove git metadata and install dependencies:

```bash
cd my-project
rm -rf .git
npm install
```

Quick start:

```bash
# create project directory structure
npm run init

# build everything
npm run build

# build and start all develop tasks
npm run start
```

### Development build ###

Execute main tasks:

```bash
# create project directory structure
npm run develop init

# start to execute all tasks
npm run develop
```

Execute individual tasks:

```bash
# build everything
npm run develop build

# monitor all file changes and rebuild
npm run develop watch

# start static, livereload and repl services
npm run develop serve

# start only one service
npm run develop repl:start

# show task configuration
npm run develop pug:config

# and so on
```

### Release version ###

Execute main tasks:

```bash
# create project directory structure
npm run release init

# start to execute all tasks
npm run release
```

Execute individual tasks:

```bash
# build everything
npm run release build

# monitor all file changes and rebuild
npm run release watch

# start static and repl services
npm run release serve

# start only one service
npm run release repl:start

# show task configuration
npm run release pug:config

# and so on
```

## Contribution ##

If you have any problem or suggestion please open an issue [here](https://github.com/stbsdk/boilerplate/issues).
Pull requests are welcomed with respect to the [JavaScript Code Style](https://github.com/DarkPark/jscs).


## License ##

`stb-boilerplate` is released under the [MIT License](license.md).
