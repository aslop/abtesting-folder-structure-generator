# A/B Testing | Structure generator

## How to install:

    - clone repo
    - npm install -g
    
## How to use:

    - `cd` to your directory
    - Run: `makeWAB`
    - Type name of your new folder
    - cd into that folder
    - Run: `npm run build`
    - webpack starts watching files and on save it will generate /dist/bundle.js with the code.
    
## Includes:
    - ab.js | Some functions i constantly reuse
    - .editorconfig and .prettierrc files to customize
    
## Folder Structure
    dist
        bundle.js // The generator code goes here
    src
        html // add your .html files here
        lib // add your js modules here
        scss // add your .scss files here
        index.js // main file
    .babelrc // basic babel configuration
    .editorconfig // my editorconfig configuration
    .gitignore // basic git ignore
    .prettierrc // my prettier configuration
    webpack.config.js // basic webpack configuration
