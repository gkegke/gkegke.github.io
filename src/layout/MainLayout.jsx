import { Outlet } from 'react-router-dom';
import Header from './Header';
import { useUI } from '../context/UIContext';

export default function MainLayout() {
  const { isFocusMode } = useUI();

  return (
    <div
      id="content"
      className="w-full h-full"
    >
      {!isFocusMode && <Header />}
      <main>
        <Outlet />
      </main>
    </div>
  );
}