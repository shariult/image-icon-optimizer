// ======= Environment Setup ======= //

let projectDir = "project";

// ======= Imports ======= //

const path = require("path"),
  fs = require("fs"),
  { task, src, dest, series, parallel, watch } = require("gulp"),
  imagemin = require("gulp-imagemin"),
  svgstore = require("gulp-svgstore"),
  svgtofont = require("svgtofont");

// ======= Variables ======= //

let buildDir = `${projectDir}/dist`;

// ======= Code ======= //

// Cleaning dist folder
function deleteFolderRecursive(path = buildDir) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function (file, index) {
      let curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}
deleteFolderRecursive();

// Compressing Images
const imgProduction = () => {
  return src(`${projectDir}/img/*`)
    .pipe(
      imagemin([
        imagemin.mozjpeg({ progressive: true, quality: 75 }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.gifsicle({ interlaced: true, optimizationLevel: 2 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest(buildDir));
};

// Creating SVG sprite
const SVG2Sprite = () => {
  return src(`${projectDir}/icons/*.svg`)
    .pipe(
      imagemin([
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(svgstore())
    .pipe(dest(`${buildDir}/sprite`));
};

// Converting SVG icons to font
svgtofont({
  src: path.resolve(process.cwd(), `${projectDir}/icons`), // svg path
  dist: path.resolve(process.cwd(), `${buildDir}/fonts`), // output path
  fontName: "iconfont-lib", // font name
  css: true, // Create CSS files.
}).then(() => {
  console.log("done!");
});

// ======= Exports ======= //
exports.default = series(imgProduction, SVG2Sprite);
