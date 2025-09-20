import postData from '../data/posts.json';
import { PATHS } from '../../../config/paths';

/**
 * Parses a date string like "25th March 2023" into a format
 * that the Date constructor can reliably handle.
 * @param {string} dateString The date string from the JSON file.
 * @returns {string} A cleaned-up date string.
 */
const parseDateString = (dateString) => {
  // Removes ordinal suffixes (st, nd, rd, th) from the day
  return dateString.replace(/(\d+)(st|nd|rd|th)/, '$1');
};

/**
 * Fetches and returns the list of blog posts, sorted by date descending.
 * It also ensures that post IDs are numbers for consistent handling throughout the app.
 */
export const getPosts = () => {
  // Coerce string IDs from JSON to numbers to prevent type mismatches,
  // especially when comparing with IDs from URL parameters.
  const typedPosts = postData.map(post => ({
    ...post,
    id: parseInt(post.id, 10),
  }));

  return typedPosts.sort((a, b) => {
    const dateA = new Date(parseDateString(a.date));
    const dateB = new Date(parseDateString(b.date));
    return dateB - dateA; // Sort descending (newest first)
  });
};

/**
 * Fetches the markdown content for a specific post.
 * @param {number|string} postId The ID of the post to fetch.
 * @returns {Promise<string>} The markdown content as a string.
 */
export const getPostContent = async (postId) => {
  try {
    const response = await fetch(`${PATHS.POSTS_MARKDOWN}${postId}.md`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.text();
    return data;
  } catch (error) {
    console.error(`Failed to fetch post ${postId}:`, error);
    return "Failed to load post content.";
  }
};