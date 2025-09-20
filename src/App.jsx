import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout.jsx';
import BlogPage from './features/blog/BlogPage.jsx';
import ProjectsPage from './features/projects/ProjectsPage.jsx';
import { UIProvider } from './context/UIContext.jsx';

export default function App() {
  return (
    <UIProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/blog" replace />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:postId" element={<BlogPage />} />
            <Route path="projects" element={<ProjectsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UIProvider>
  );
}