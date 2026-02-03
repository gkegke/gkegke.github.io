/**
 * Centralizes application-wide path constants to make them easier to manage.
 * Uses import.meta.env.BASE_URL to align with Vite's 'base' config (e.g. './').
 */
const BASE = import.meta.env.BASE_URL;

export const PATHS = {
  // Appends 'posts/' to the base. If base is './', result is './posts/'
  POSTS_MARKDOWN: `${BASE}posts/`,
  PROJECT_IMAGES: `${BASE}project_imgs/`,
};