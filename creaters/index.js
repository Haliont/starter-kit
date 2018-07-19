const createComponent = require('./createComponent');
const createPage = require('./createPage');

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