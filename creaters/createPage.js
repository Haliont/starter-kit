const fs = require('fs');

module.exports = (name) => {
  const pagePath = `./src/pages/${name}`;

  fs.mkdir(pagePath, (err) => {
    if (err) {
      console.log('Не удалось создать страницу');
      console.log(err);
      return;
    }
    const filePath = `${pagePath}/${name}.pug`;
    const body = `extends ../../layouts/main.pug\n//- include ../../components/blockName/blockName\n\nblock pageData\n  include ./data.pug\n\nblock content\n  |${name}`;

    fs.writeFileSync(`${pagePath}/data.pug`, `-\n  const pageTitle = 'Страница ${name}'\n  const pageMod = '${name}'`);
    fs.writeFileSync(filePath, body);
    console.log(`Страница ${name} создана в ${pagePath}`);
  });
};