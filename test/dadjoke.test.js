const test = require('node:test');
const assert = require('node:assert/strict');
const { formatDadJokeText } = require('../dadJoke');

test('formats a Slack-style dad joke response', () => {
  const result = formatDadJokeText({
    attachments: [{ text: 'Why did the scarecrow win an award? Because he was outstanding in his field.' }]
  });

  assert.equal(result, 'Why did the scarecrow win an award? Because he was outstanding in his field.');
});

test('formats a standard setup/punchline dad joke response', () => {
  const result = formatDadJokeText({
    setup: 'I used to be addicted to the hokey pokey.',
    punchline: 'But then I turned myself around.'
  });

  assert.equal(result, 'I used to be addicted to the hokey pokey.\n\nBut then I turned myself around.');
});

test('returns a plain-text dad joke when the API sends a string', () => {
  const result = formatDadJokeText('I stayed up all night to see where the sun went. Then it dawned on me.');

  assert.equal(result, 'I stayed up all night to see where the sun went. Then it dawned on me.');
});
