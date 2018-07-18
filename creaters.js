const fs = require('fs');

const createComponent = (name) => {
  console.log(`Компонент ${name} создан`);
};

const createPage = (name) => {
  console.log(`Страница ${name} создана`);
};

const creaters = {
  '--component': createComponent,
  '--page': createPage,
  '-c': createComponent,
  '-p': createPage,
}

module.exports = (type) => {
  const creater = creaters[type];
  if (!creater) {
    const message = `\nТип ${type} не определен. Выберите из этих:\n--component -c - компонент\n--page      -p - страница`;
    throw new Error(message);
  }
  return creater;
};