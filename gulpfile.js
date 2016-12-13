var gulp = require("gulp");
var del = require("del");
var main = require("main-bower-files");

var gulpLoadPlugins = require('gulp-load-plugins'),
plugins = gulpLoadPlugins();

//var rev = require('gulp-rev');//- 对文件名加MD5后缀
//var revCollector = require('gulp-rev-collector');  

var gulpSequence = require('gulp-sequence')
//var sass = require("gulp-sass");
gulp.task("clean", function(cb) {
	del(["js",'css'], cb);
});

//清除合并后的scss文件
gulp.task("cleanscss", function(cb) {
	del(["public/scss/style.scss"], cb);
});

gulp.task("addLibs", function() {
	return gulp.src(main())
		.pipe(gulp.dest("public/js/libs"));
});

gulp.task("copylibs", function() {
	return gulp.src(["public/js/libs/**/*"])
		.pipe(gulp.dest("js/libs"));
});
//压缩libs下的js文件
//gulp.task("minlibs",  function() {
//	var options = {
//		mangle: true,//类型：Boolean 默认：true 是否修改变量名
//      compress: true,//类型：Boolean 默认：true 是否完全压缩
//      preserveComments: 'no' //'all'保留所有注释
//	}
//	return gulp.src(["js/libs/**/*.js"])
//		.pipe(uglify(options))
//		//.pipe(rev())	//- 文件名加MD5后缀	
//		//.pipe(concat("all.js"))
//		//.pipe(rename({"extname":".min.js"}))
//		.pipe(gulp.dest("js/libs"))//- 输出文件本地
//		//.pipe(rev.manifest())//- 生成一个rev-manifest.json
//		//.pipe(gulp.dest('./rev'));	
//})

gulp.task("minappjs",  function() {
	var options = {
		mangle: false,//类型：Boolean 默认：true 是否修改变量名
        compress: false,//类型：Boolean 默认：true 是否完全压缩
        preserveComments: 'no' //'all'保留所有注释
	}
	return gulp.src(["public/**/app.js"])
		.pipe(plugins.uglify(options))
		.pipe(gulp.dest(""))//- 输出文件本地
})

gulp.task("minjs",  function() {
	var options = {
		mangle: true,//类型：Boolean 默认：true 是否修改变量名
        compress: true,//类型：Boolean 默认：true 是否完全压缩
        preserveComments: 'no' //'all'保留所有注释
	}
	return gulp.src(["public/**/*.js"])
		.pipe(plugins.uglify(options))
		//.pipe(rev())	//- 文件名加MD5后缀	
		.pipe(gulp.dest(""))//- 输出文件本地
		//.pipe(rev.manifest())//- 生成一个rev-manifest.json
		//.pipe(gulp.dest('./rev'));	
})

//压缩html文件
gulp.task('minhtml', function() {
	var options = {
		collapseWhitespace: true,//清除空格，压缩html
		collapseBooleanAttributes: true,//省略布尔属性的值，比如：<input checked="checked"/>,那么设置这个属性后，就会变成 <input checked/>;
		removeComments: true,//清除html中注释的部分
		removeEmptyAttributes: false,//removeEmptyAttributes
		removeScriptTypeAttributes: true,//清除所有script标签中的type="text/js"属性
		removeStyleLinkTypeAttributes: true,//清楚所有Link标签上的type属性
		minifyJS: true,//压缩html中的js代码
		minifyCSS: true//压缩html中的css代码
	};
	return gulp.src('public/**/*.html')
		.pipe(plugins.htmlmin(options))
		.pipe(gulp.dest(''));
});
//合并sass文件
gulp.task('concatsass', ['cleanscss'], function() {
	return gulp.src(["public/scss/*.scss"])
		.pipe(plugins.concat('style.scss'))
		.pipe(gulp.dest('public/scss/'));
});

//编译sass文件
gulp.task('compcss', ['concatsass'], function() {
	return gulp.src(["public/scss/style.scss"])
		.pipe(plugins.sass())
		.pipe(gulp.dest('css'));
});

//压缩css
gulp.task('mincss', ['compcss'], function() {
	return gulp.src(["css/style.css"])
		.pipe(plugins.minifyCss())
		.pipe(plugins.rename({"extname":".min.css"}))
		.pipe(gulp.dest('css'));
});

//不进行任何处理，调试使用
gulp.task("copyall", function() {
	return gulp.src(["public/js/**/*"])
		.pipe(gulp.dest("js"));
});

//全部打包
gulp.task('build', function (cb) {
	plugins.sequence('clean', 'minjs', 'minappjs', 'copylibs', 'minhtml', 'mincss', cb)
})

//实时监听任务
//监听app文件下的业务逻辑代码
gulp.task("anyjs",  function() {
	var options = {
		mangle: true,//类型：Boolean 默认：true 是否修改变量名
        compress: true,//类型：Boolean 默认：true 是否完全压缩
        preserveComments: 'no' //'all'保留所有注释
	}
	return gulp.src(["public/*/*/*/*.js"])
		.pipe(plugins.uglify(options))
		//.pipe(rev())	//- 文件名加MD5后缀	
		.pipe(gulp.dest(""))//- 输出文件本地
		//.pipe(rev.manifest())//- 生成一个rev-manifest.json
		//.pipe(gulp.dest('./rev'));	
})
gulp.task('watch', function (cb) {
	gulp.watch("public/*/*/*/*.js", ['anyjs']);
	gulp.watch("public/**/*.scss", ['mincss']);
	gulp.watch("public/**/*.html", ['minhtml']);
})

