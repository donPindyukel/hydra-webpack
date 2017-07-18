let fs = require('fs');
let git = require("nodegit");
let ncp = require("ncp").ncp;
let rimraf = require('rimraf');

// Тип команды
let commandType = null;

// Получаем имя команды
process.argv.forEach((val, index, array) => {
	if (index == 2) {
		commandType = val;
	}
});

if (commandType == 'block') {
	// Имя создаваемого блока из консоли
	let blockName = null;
	// Ссылки для создания элементов блока
	let dir = './src/blocks';

	// Получаем имя блока для создания
	process.argv.forEach((val, index, array) => {
		if (index == 3) {
			blockName = val;
		}
	});

	// Если имя блока было указано, создаем элементы блока
	if (blockName != null) {
		fs.mkdir(`${dir}/${blockName}`, (e) => {
			if (e === null) {
				// Создание директории с изображениями
				fs.mkdir(`${dir}/${blockName}/` + 'img', (e) => {});

				createFile(blockName, 'pug', dir);
				createFile(blockName, 'scss', dir);
				createFile(blockName, 'js', dir);

				appendTextFile(`${dir}/app.scss`, `@import "${blockName}/${blockName}";`);
				appendTextFile(`${dir}/app.js`, `//@include('${blockName}/${blockName}.js')`);
			} else {
				console.log(`Block "${blockName}" exists!`);
			}
		});
	}
}

if (commandType == 'update') {
	// Ветка из которой обновить
	let updateType = 'master';

	// Получаем имя блока для создания
	process.argv.forEach((val, index, array) => {
		if (index == 3) {
			updateType = val;
		}
	});

	// Клонирование репозитория
	let cloneOptions = new git.CloneOptions();
	cloneOptions.checkoutBranch = updateType;
	git.Clone('https://github.com/AlekseyPleshkov/hydra-webpack.git', './update', cloneOptions).then(function(repository) {
		console.log('Репозиторий удачно склонирован.');

		// Копируем файлы для обновления пакета
		ncp('./update/src/components', './/src/components', function (err) {});
		ncp('./update/src/components/components.js', './src/components/components.js', function (err) {});
		ncp('./update/src/components/components.scss', './src/components/components.scss', function (err) {});
		
		ncp('./update/.csscomb.json', './.csscomb.json', function (err) {});
		ncp('./update/.eslintrc.json', './.eslintrc.json', function (err) {});
		ncp('./update/.flowconfig', './.flowconfig', function (err) {});
		ncp('./update/.pug-lintrc.json', './.pug-lintrc.json', function (err) {});
		ncp('./update/bower.json', './bower.json', function (err) {});
		ncp('./update/gulpfile.js', './gulpfile.js', function (err) {});
		
		ncp('./updatehydra.js', './hydra.js', function (err) {});
		ncp('./package.json', './package.json', function (err) {});

		rimraf('./update', function() {
			console.log('Временная директория удалена.');
		});
		
		console.log('Копирование файлов завершено.');
		console.log('Запустите "npm i && bower i".');
	});
};

// Функция для создания файла
function createFile(name, ext, directory) {
	let content = `${'/\/ ==========================================================================' +
		'\n/\/ '}${name
	}\n/\/ ==========================================================================`;
	let dir = `${directory}/${name}`;
	let file = `${dir}/${name}.${ext}`;

	fs.writeFile(file, content, (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log(`Файл ${file} успешно создан.`);
		}
	});
}

// Добавить текст в конец строки файла
function appendTextFile(file, text) {
	fs.appendFile(file, `\n${text}`, (err) => {
		if (err) {
			throw err;
		}
		console.log(`Файл ${file} дополнен ссылкой на блок.`);
	});
}
