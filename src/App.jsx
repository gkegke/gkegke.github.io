import { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LazyMotion, domAnimation } from 'framer-motion';
import MainLayout from './layout/MainLayout.jsx';
import { UIProvider } from './context/UIContext.jsx';
import PageLoader from './components/PageLoader.jsx';

// Lazy load route components to split code chunks
const BlogPage = lazy(() => import('./features/blog/BlogPage.jsx'));
const ProjectsPage = lazy(() => import('./features/projects/ProjectsPage.jsx'));

export default function App() {
  return (
    <HelmetProvider>
      <UIProvider>
        {/* Reduce framer-motion bundle size by using domAnimation feature set */}
        <LazyMotion features={domAnimation}>
          <HashRouter>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Navigate to="/blog" replace />} />
                
                <Route 
                  path="blog" 
                  element={
                    <Suspense fallback={<PageLoader />}>
                      <BlogPage />
                    </Suspense>
                  } 
                />
                
                <Route 
                  path="blog/:postId" 
                  element={
                    <Suspense fallback={<PageLoader />}>
                      <BlogPage />
                    </Suspense>
                  } 
                />
                
                <Route 
                  path="projects" 
                  element={
                    <Suspense fallback={<PageLoader />}>
                      <ProjectsPage />
                    </Suspense>
                  } 
                />
              </Route>
            </Routes>
          </HashRouter>
        </LazyMotion>
      </UIProvider>
    </HelmetProvider>
  );
}