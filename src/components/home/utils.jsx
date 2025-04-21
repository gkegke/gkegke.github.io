export default function getSortedKeywords(posts, n) {
  const keywordMap = posts.reduce((map, post) => {
    post.keywords.forEach(keyword => {
      const existingKeyword = map[keyword.text];
      if (existingKeyword) {
        existingKeyword.weight += keyword.weight;
      } else {
        map[keyword.text] = { text: keyword.text, weight: keyword.weight };
      }
    });
    return map;
  }, {});

  const sortedKeywords = Object.values(keywordMap).sort((a, b) => b.weight - a.weight);

  return sortedKeywords.slice(0,n);
}


