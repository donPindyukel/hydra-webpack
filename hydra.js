var fs = require('fs');

// Тип команды
var commandType = null;
// Имя создаваемого блока из консоли
var blockName = null;

// Получаем имя команды
process.argv.forEach(function(val, index, array) {
    if (index == 2) {
        commandType = val;
    }
});

if (commandType == "block") {
    // Ссылки для создания элементов блока
    var pugDirectory = "./src/pages/blocks";
    var scssDirectory = "./src/scss/blocks";
    var jsDirectory = "./src/js/blocks";

    // Получаем имя блока для создания
    process.argv.forEach(function(val, index, array) {
        if (index == 3) {
            blockName = val;
        }
    });

    // Если имя блока было указано, создаем элементы блока
    if (blockName != null) {
        createFile(blockName, 'pug', pugDirectory);
        createFile(blockName, 'scss', scssDirectory);
        createFile(blockName, 'js', jsDirectory);

        appendTextFile('./src/scss/app.scss', '@import "blocks/'+ blockName +'";');
        appendTextFile('./src/js/app.js', "//@include('blocks/"+ blockName +".js')");
    }
}

// Функция для создания файла
function createFile(name, ext, directory) {
    var content = "/\/ ==========================================================================" +
        "\n/\/ " + name +
        "\n/\/ ==========================================================================";

    var file = directory + "/" + name + "." + ext;
    fs.writeFile(file, content, function(err) {
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
