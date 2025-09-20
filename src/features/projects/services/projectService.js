import projectData from '../data/projects.json';

/**
 * Fetches and returns the list of projects.
 * This service centralizes data fetching for projects.
 */
export const getProjects = () => {
  return projectData;
};