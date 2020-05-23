# Gulp - Boilerplate

Style is SASS, HTML render is PUG and JavaScript is vanilla. There are CSS and JS files auto generated source map files current directory. 

You can change simple options like PORT number, compress js or css etc. at with `.env` file.

Same time, auto will copied your static files like `.svg`, `.css`, `.js` from `src/assets`.

## Project Structure

* **assets**: Your static files. Images, SVGs, Fonts. *And so you can create this dir/file on to this.*
* **css/js**: Your static CSS/JS files. Like Bootstrap, jQuery, Bulma or *If you move to new project set your files to this directory.* 
* **mechanics**: Your project's JS mechanics. *Will compiled JS file from this directory.*
* **styles**: Your SASS files.
  * **abstracts**: Or folder can be name is _utilities_
  * **base**: Reset/normalize and typography rules.
  * **components**: Like Buttons, Card, Slider etc..
  * **layout**:  Header, Footer, Sidebar, multi-purpose sections etc..
  * **pages**: 
  * **themes**: Colors. 
  * **_animations.scss**: Your `@keyframe` animations.
  * **main.scss**: Bundle SASS file. `main.css` will compiled from this file.
* **views**: PUG templates
  * **components**: Like Buttons, Card, Slider etc..
  * **master.pug**: Extendable layout.
 

## How to use

If you want just completely build run this;

```
npm run deploy
```

If you want develop via live reloading (browser-sync);

```
npm run dev
```


## Description .env

| KEY   |      Default Value     | Purpose |
|----------|:-------------:|------:|
| DEBUG |  true | SASS logError |
| PORT | 2424 | browser-sync localhost port number |
| SASS_OUTPUT | expanded | CSS output state. Can be values; `expanded`, `compact`, `compressed` |
| PREFIXER | true | CSS Auto Prefixer |
| MERGE_JS | true | Merged your static js file from `assets/js` with your compiled from `mechanic` files. |
| CLEAN_CSS | false | Cleaned your static css file from `assets/js` |
| COMPRESS_JS | true | Compress your static js file from `assets/js` |
 
## Package.json

```json
"browser-sync": "^2.26.7",
"del": "^5.1.0",
"dotenv": "^8.2.0",
"gulp": "^4.0.2",
"gulp-autoprefixer": "^7.0.1",
"gulp-clean-css": "^4.3.0",
"gulp-concat": "^2.6.1",
"gulp-contrib-copy": "^0.1.3",
"gulp-if": "^3.0.0",
"gulp-plumber": "^1.2.1",
"gulp-pug": "^4.0.1",
"gulp-sass": "^4.1.0",
"gulp-sourcemaps": "^2.6.5",
"gulp-uglify": "^3.0.2"
```


