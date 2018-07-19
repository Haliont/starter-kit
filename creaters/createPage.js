const fs = require('fs');

module.exports = (name) => {
  const pagePath = `./src/pages/`;
  const body = `extends ../layout.pug\n\nblock pageInfo\n  -\n    const page = {\n      title: 'Страница ${name}',\n      name: '${name}',\n    }\n\nblock content\n  |${name}`;

  // TODO: сделать проверку на существование файла.
  const filePath = `${pagePath}/${name}.pug`;
  fs.writeFile(filePath, body, (err) => {
    if (err) {
      console.log('Не удалось создать страницу');
      console.log(err);
      return;
    }
    console.log(`Страница ${name} создана в ${pagePath}`);
  });
};