const test = require('node:test');
const assert = require('node:assert/strict');
const { getDuckImageUrl } = require('../duckPicture');

test('uses the DuckDuckGo icon URL when the main image field is empty', () => {
  const result = getDuckImageUrl({
    Image: '',
    RelatedTopics: [
      {
        Icon: {
          URL: '/i/764237a0.jpg'
        }
      }
    ]
  });

  assert.equal(result, 'https://duckduckgo.com/i/764237a0.jpg');
});

test('returns a direct image URL when present', () => {
  const result = getDuckImageUrl({ Image: 'https://example.com/duck.png' });

  assert.equal(result, 'https://example.com/duck.png');
});

test('returns null when no usable image is available', () => {
  const result = getDuckImageUrl({ Image: '', RelatedTopics: [] });

  assert.equal(result, null);
});
