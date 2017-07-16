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
    var pugDirectory = "./src/blocks";
    var scssDirectory = "./src/blocks";
    var jsDirectory = "./src/blocks";

    // Получаем имя блока для создания
    process.argv.forEach(function (val, index, array) {
        if (index == 3) {
            blockName = val;
        }
    });

    // Если имя блока было указано, создаем элементы блока
    if (blockName != null) {
        createFile(blockName, 'pug', pugDirectory);
        createFile(blockName, 'scss', scssDirectory);
        createFile(blockName, 'js', jsDirectory);

        appendTextFile('./src/blocks/blocks.scss', '@import "' + blockName + "/" + blockName + '";');
        appendTextFile('./src/blocks/blocks.js', "//@include('" + blockName + "/" + blockName + ".js')");
    }
}

// Функция для создания файла
function createFile(name, ext, directory) {
    var content = "/\/ ==========================================================================" +
        "\n/\/ " + name +
        "\n/\/ ==========================================================================";
    var dir = directory + "/" + name;
    var file = dir + "/" + name + "." + ext;

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    
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