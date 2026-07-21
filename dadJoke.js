function formatDadJokeText(payload) {
  if (typeof payload === 'string') {
    return payload.trim();
  }

  if (!payload || typeof payload !== 'object') {
    return "Couldn't fetch a dad joke.";
  }

  if (typeof payload.joke === 'string' && payload.joke.trim()) {
    return payload.joke.trim();
  }

  if (typeof payload.text === 'string' && payload.text.trim()) {
    return payload.text.trim();
  }

  if (Array.isArray(payload.attachments) && payload.attachments[0] && typeof payload.attachments[0].text === 'string') {
    return payload.attachments[0].text.trim();
  }

  const setup = typeof payload.setup === 'string' ? payload.setup.trim() : '';
  const punchline = typeof payload.punchline === 'string' ? payload.punchline.trim() : '';

  if (setup || punchline) {
    return [setup, punchline].filter(Boolean).join('\n\n');
  }

  return "Couldn't fetch a dad joke.";
}
 

module.exports = { formatDadJokeText };
