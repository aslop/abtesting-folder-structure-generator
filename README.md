# A/B Testing | Structure generator

## How to install:

`git clone` this repo
`npm install -g`

## How to use:

`cd` to your directory
Run: `makeWAB`
Type name of your new folder
`cd` into that folder
Run: `npm run build`
webpack starts watching files and on save it will generate `dist/bundle.js` with the code.

## Includes:

ab.js, Some functions i constantly reuse
`.editorconfig` and `.prettierrc` files to customize

## Folder Structure

```
project
└───dist
│   bundle.js #Generated code goes here
└───src
    └───html #Your .html goes here
    └───lib Your .js goes here
    └───scss #Your .scss goes here
    |   index.js # main file
│   .babelrc // basic babel configuration
|   .editorconfig // my editorconfig configuration
|   .gitignore // basic git ignore
|   .prettierrc // my prettier configuration
|   webpack.config.js // basic webpack configuration
```
