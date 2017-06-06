'use strict';

const argv = require(`yargs`).argv;
const lipsum = require(`lorem-ipsum`);

function getText() {
  return lipsum({
    count: argv.n || 1,
    units: argv.u || `paragraphs`,
    format: argv.f || `plain`,
    copy: argv.c || false,
    sentenceLowerBound: 8,
    sentenceUpperBound: 20,
    paragraphLowerBound: 4,
    paragraphUpperBound: 10
  });
}

try {
  argv.n = argv.n || 1;

  let text = getText();

  // check if we have a character limit
  if (argv.l) {
    // check the current text is long enough
    while (text.length < argv.l) {
      argv.n++;
      text += getText();
    }

    text = text.substring(0, argv.l);
  }

  // use substring to remove final return char
  console.log(text.substring(0, text.length - 1));
} catch (err) {
  console.error(err);
}
