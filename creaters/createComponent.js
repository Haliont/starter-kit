const fs = require('fs');

module.exports = (name) => {
  const componentPath = `./src/components/${name}`;
  const pugBody = `mixin ${name}(data)\n  .${name}&attributes(attributes)\n    |${name}`;
  const cssBody = `.${name} {\n  background-color: transparent;\n}`;
  const jsBody  = `export default class ${[name[0].toUpperCase(), name.slice(1)].join('')} {\n  \n}`;

  fs.mkdir(componentPath, (err) => {
    if (err) {
      console.log('Не удалось создать компонент');
      console.log(err);
      return;
    }
    const filePath = `${componentPath}/${name}`;
    fs.writeFileSync(`${filePath}.pug`, pugBody);
    fs.writeFileSync(`${filePath}.css`, cssBody);
    fs.writeFileSync(`${filePath}.js`, jsBody);
    console.log(`Компонент ${name} создан в ${componentPath}`);
  });
};