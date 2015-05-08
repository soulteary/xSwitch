'use strict';

var gulp = require('gulp');

var amdOptimize = require("amd-optimize");
var amdclean = require("gulp-amdclean");
var concat = require("gulp-concat");
var fs = require("fs");
var uglyfly = require("gulp-uglyfly");
var rename = require("gulp-rename");
var replace = require("gulp-replace");
var rm = require("gulp-rm");
var wrap = require("gulp-wrap");

gulp.task("default", ["demo:sync"], function () {});

gulp.task("scripts:build", function () {
    return gulp.src("./src/xSwitch.js")
        .pipe(concat("xSwitch.js"))
        .pipe(amdOptimize("xSwitch"))
        .pipe(amdclean.gulp({"prefixMode": "standard"}))
        .pipe(replace(/^;\(function\(\) \{\n/, ""))
        .pipe(replace(/\n\}\(\)\);$/, ""))
        .pipe(wrap(fs.readFileSync("./.build-wrapper.tpl", "utf8")))
        .pipe(concat("xSwitch.js"))
        .pipe(gulp.dest("./dist"))
        .pipe(uglyfly())
        .pipe(concat("xSwitch.min.js"))
        .pipe(gulp.dest("./dist"));
});

gulp.task("test:sync", ["scripts:build"], function () {
    return gulp.src("./dist/xSwitch.min.js")
        .pipe(gulp.dest("./tests/dist"));

});

gulp.task("demo:sync", ["test:sync"], function () {
    return gulp.src("./dist/xSwitch.min.js")
        .pipe(gulp.dest("./demo/dist"));
});

gulp.task("test:mocha", ["test:sync"], function () {
    return gulp
        .src("./tests/phantomjs.html")
        .pipe(mochaPhantomJS());
});