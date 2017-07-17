var fs = require('fs');

// Тип команды
var commandType = null;
// Имя создаваемого блока из консоли
var blockName = null;

// Получаем имя команды
process.argv.forEach(function (val, index, array) {
    if (index == 2) {
        commandType = val;
    }
});

if (commandType == "block") {
    // Ссылки для создания элементов блока
    var dir = "./src/blocks";

    // Получаем имя блока для создания
    process.argv.forEach(function (val, index, array) {
        if (index == 3) {
            blockName = val;
        }
    });

    // Если имя блока было указано, создаем элементы блока
    if (blockName != null) {
        fs.mkdir(dir + '/' + blockName, function (e) {
            if (e === null) {
                // Создание директории с изображениями
                fs.mkdir(dir + '/' + blockName + '/' + 'img', function (e) {});

                createFile(blockName, 'pug', dir);
                createFile(blockName, 'scss', dir);
                createFile(blockName, 'js', dir);

                appendTextFile(dir + '/blocks.scss', '@import "' + blockName + "/" + blockName + '";');
                appendTextFile(dir + '/blocks.js', "//@include('" + blockName + "/" + blockName + ".js')");
            }
            else {
                console.log('Block "' + blockName + '" exists!');
            }
        });

    }
}

// Функция для создания файла
function createFile(name, ext, directory) {
    var content = "/\/ ==========================================================================" +
        "\n/\/ " + name +
        "\n/\/ ==========================================================================";
    var dir = directory + "/" + name;
    var file = dir + "/" + name + "." + ext;

    fs.writeFile(file, content, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("The " + file + " was saved!");
        }
    });
}

// Добавить текст в конец строки файла
function appendTextFile(file, text) {
    fs.appendFile(file, '\n' + text, function (err) {
        if (err) throw err;
        console.log('Modify ' + file + ' success');
    });
}