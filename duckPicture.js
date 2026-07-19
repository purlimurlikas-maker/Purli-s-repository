function getDuckImageUrl(data) {
  if (!data) return null;

  if (data.Image) {
    return data.Image;
  }

  const firstTopicWithIcon = Array.isArray(data.RelatedTopics)
    ? data.RelatedTopics.find((topic) => topic && topic.Icon && topic.Icon.URL)
    : null;

  if (firstTopicWithIcon && firstTopicWithIcon.Icon.URL) {
    const iconUrl = firstTopicWithIcon.Icon.URL;
    return iconUrl.startsWith('http')
      ? iconUrl
      : `https://duckduckgo.com${iconUrl}`;
  }

  return null;
}

module.exports = { getDuckImageUrl };
