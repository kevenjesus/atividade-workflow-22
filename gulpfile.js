/*
	VARIÁVEIS
*/

//Chamada dos plugins
var gulp 	= require('gulp');
var sass 	= require('gulp-sass');
var rename 	= require('gulp-rename');

//Arquivos a serem compilado/Minificado
var scssArq	= './source/scss/*.scss';
var indexArq	= './source/index.html';

//Local para onde será enviado
var cssDest	= './dist/css';
var indexDest	= './dist';

//Informações referentes ao Desenvolvimento
var devOptions = {
	outputStyle: 'expanded'
}

//Informações referentes a Produção
var prodOptions = {
	outputStyle: 'compressed'
}

/*
	TAREFAS
*/

//Compilar a parte de desenvolvimento
//Executar comando 'gulp sassdev'
gulp.task('sassdev', function(){
	return gulp.src(scssArq)
		.pipe(sass(devOptions).on('error', sass.logError))
		.pipe(gulp.dest(cssDest));

});

//Compilar a parte de produção
//Executar comando 'gulp sassprod'
gulp.task('sassprod', function(){
	return gulp.src(scssArq)
		.pipe(sass(prodOptions).on('error',sass.logError))
		.pipe(rename(minify.min.css))
		.pipe(gulp.dest(cssDest));
});

//Minificar e renomear o index.html
gulp.task('minifyhtml', function(){
    gulp.src(indexArq)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(rename(index.min.html))
        .pipe(gulp.dest(indexDest))
});

//Tarefa Watch
gulp.task('watch', function(){
	gulp.watch(scssArq, indexArq, ['sassprod', 'sassdev', 'minifyhtml']);
});

//Tarefa padrão para o comando 'gulp'
gulp.task('default', ['sassdev','sassprod', 'minifyhtml','watch']);