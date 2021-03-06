let fs = require('fs');
let git = require('nodegit');
let ncp = require('ncp').ncp;
let rimraf = require('rimraf');

//
// Вспомогательные функции
//

// Функция для создания файла
function createFile(name, prefix, ext, directory) {
  let content = `${'/\/ ==========================================================================' +
    '\n/\/ '}${name
  }\n/\/ ==========================================================================`;
  let dir = `${directory}/${name}`;
  let file = `${dir}/${prefix}${name}.${ext}`;

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

//
// Основной функционал
//

// Тип команды
let commandType = null;

// Получаем имя команды
process.argv.forEach((val, index) => {
  if (index === 2) {
    commandType = val;
  }
});

if (commandType === 'block') {
  // Имя создаваемого блока из консоли
  let blockName = null;
  // Ссылки для создания элементов блока
  let dir = './src/blocks';

  // Получаем имя блока для создания
  process.argv.forEach((val, index) => {
    if (index === 3) {
      blockName = val;
    }
  });

  // Если имя блока было указано, создаем элементы блока
  if (blockName != null) {
    fs.mkdir(`${dir}/${blockName}`, (e) => {
      if (e === null) {
        // Создание директории с изображениями
        fs.mkdir(`${dir}/${blockName}/img`, () => {});

        createFile(blockName, '', 'pug', dir);
        createFile(`${blockName}`, '_', 'scss', dir);
        createFile(`${blockName}`, '$', 'js', dir);

        appendTextFile(`${dir}/app.scss`, `@import "${blockName}/${blockName}";`);
        appendTextFile(`${dir}/app.js`, `//@include('${blockName}/$${blockName}.js')`);
      } else {
        console.log(`Block "${blockName}" exists!`);
      }
    });
  }
}

if (commandType === 'update') {
  // Ветка из которой обновить
  let updateType = 'master';

  // Получаем имя блока для создания
  process.argv.forEach((val, index) => {
    if (index === 3) {
      updateType = val;
    }
  });

  // Клонирование репозитория
  let cloneOptions = new git.CloneOptions();

  cloneOptions.checkoutBranch = updateType;
  git.Clone('https://github.com/AlekseyPleshkov/hydra-webpack.git', './update', cloneOptions).then(() => {
    console.log('Репозиторий удачно склонирован.');

    // Удаление старых директорий
    rimraf('./src/components', () => {
      console.log('Старые компоненты успешно удалены.');
    });

    setTimeout(() => {
      // Копируем файлы для обновления пакета
      ncp('./update/src/components', './src/components', (err) => { if (err) return console.error(err); });
      ncp('./update/.csscomb.json', './.csscomb.json', (err) => { if (err) return console.error(err); });
      ncp('./update/.eslintrc.json', './.eslintrc.json', (err) => { if (err) return console.error(err); });
      ncp('./update/.pug-lintrc.json', './.pug-lintrc.json', (err) => { if (err) return console.error(err); });
      ncp('./update/gulpfile.js', './gulpfile.js', (err) => { if (err) return console.error(err); });

      ncp('./update/hydra.js', './hydra.js', (err) => { if (err) return console.error(err); });
      ncp('./update/package.json', './package.json', (err) => { if (err) return console.error(err); });

      ncp('./update/.gitlab-ci.yml', './.gitlab-ci.yml', (err) => { if (err) return console.error(err); });
      ncp('./update/.travis.yml', './.travis.yml', (err) => { if (err) return console.error(err); });

      setTimeout(() => {
        rimraf('./update', () => {
          console.log('Временная директория удалена.');
          console.log('Копирование файлов завершено.');
          console.log('Запустите "npm i && bower i".');
        });
      }, 500);
    }, 500);
  });
}
