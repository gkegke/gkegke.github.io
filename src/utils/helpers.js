export function handleError(error) {
  console.error(error);
}

export function getSortedKeywords(posts, n) {
  const keywordMap = posts.reduce((map, post) => {
    if (post.keywords) {
      post.keywords.forEach(keyword => {
        const existingKeyword = map.get(keyword.text);
        if (existingKeyword) {
          existingKeyword.weight += keyword.weight;
        } else {
          map.set(keyword.text, { text: keyword.text, weight: keyword.weight });
        }
      });
    }
    return map;
  }, new Map());

  const sortedKeywords = Array.from(keywordMap.values()).sort((a, b) => b.weight - a.weight);

  return sortedKeywords.slice(0, n);
}

export function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function (...args) {
    const context = this;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}