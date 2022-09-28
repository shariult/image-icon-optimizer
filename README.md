# Image and Icon Optimizer

Tool for compressing images (jpg, jpeg, png, gif and SVG), generating custom icon fonts and SVG sprite.

## Features

1. Image compression to a lower size making it Website friendly.
2. Custom icon library.
3. SVG sprite keeps all SVG icons in one file which can be included in HTML.

## Installation

**Node.JS** is required. Install it then run following code one by one in terminal from project directory,

```bash
npm i -D gulp gulp-cli gulp-imagemin@7.1.0 gulp-svgstore svgtofont
```

## Usage

Create a folder for each project. This tool can work on multiple projects. Simply change the "projectDir" variable in "gulpfile.js".

Each project must have "img" and "icons" folder. Put all images in "img" folder and SVG icons in "icons" folder. All files will be exported in the "dist" folder. Run following command to process images and icons,

```bash
npm run build
```

"dist" folder will contain all compressed images.  
"dist/fonts" folder will contain the 'custom icon font' generated from the projects icon's folder.
"dist/sprite" will contain the SVG sprite generated from the SVG files in the icon's folder.

An Example build is already included with this package.

**Note:** SVG file's filename will become their SVG id in the SVG sprite, so never put spaces in the SVG filename. Also SVG pictures (not icons) should be in the "img" folder. Try to use the 'custom icon font' instead of SVG sprite.

### Build Different Project

By default project directory is set to "./project". To change the project/working directory, modify "gulpfile.js" file. As an example, if "project-1" is the new project directory then modify "projectDir" variable in "gulpfile.js" following way,

```JavaScript
// ======= Environment Setup ======= //

let projectDir = "project-1";
```

## SVG Icons Preparation in Illustrator for SVG Sprite

1. Design the vector arts in Illustrator
2. Select items to export > File > Export > Exports for Screens
3. Choose "SVG" format, then click on the gear icon above (to access the Export Settings).
4. Select "SVG" and set following values in illustrator,

```
Styling = Presentation Attributes
Font = SVG
Images = Link
Object IDs = Unique
Decimal = 2
Tick both "Minify" and "Responsive"
```

5. Export all icons.
6. Open Each icon in a text editor and carefully remove "fill" attribute from them (use CSS to fill later).
7. Now Generate the SVG sprite
8. After SVG sprite is generated, replace `<svg xmlns="http://www.w3.org/2000/svg">` with following,

```html
<svg
  style="position: absolute; width: 0; height: 0; overflow: hidden;"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
></svg>
```

## FAQ

No Frequently asked questions.
