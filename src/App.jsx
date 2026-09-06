import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './css/App.css';
import NavBar from './components/NavBar';
import Tuppy from './components/Tuppy';
import ground from './assets/ground.png';
import Home from './routes/Home';
import ProjectPage from './routes/ProjectPage';

function ScrollBehaviour() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) { el.scrollIntoView(); return; }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollBehaviour />
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="*" element={<Home />} />
      </Routes>

      <div className="scrim" />
      <div className="ground"><img src={ground} alt="" /></div>
      <Tuppy />
    </>
  );
}
