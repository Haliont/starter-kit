const fs = require('fs');

const typesActions = {
  'component': 'dosomething',
  'page': 'dosomething',
};

typesActions[process.argv[2]];
