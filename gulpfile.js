var gulp = require("gulp");
var del = require("del");
var main = require("main-bower-files");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");

gulp.task("clean",function(cb){
    del(["public/javascript/libs","bower_components"],cb);
});
gulp.task("addLibs",function(){
	return gulp.src(main())
		.pipe(gulp.dest("public/javascript/libs"));
});

gulp.task("uglify",function(){
	return gulp.src(["public/**/*.js"])
		.pipe(uglify())
		//.pipe(concat("all.js"))
		//.pipe(rename({"extname":".min.js"}))
		.pipe(gulp.dest("public/dest"));
})
