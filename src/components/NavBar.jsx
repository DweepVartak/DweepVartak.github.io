import { useRef } from 'react';
import { Link } from 'react-router-dom';
import '../css/NavBar.css';
import { site } from '../data/content';
import { burstFromElement } from '../lib/doodleBurst';

const SCRIBBLES = {
  about: (
    <svg className="scribble" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">

      <path pathLength="1" className="s-teal"
        d="M52 4C28 3 7 8 6 19c-1 12 22 18 45 17 21-1 42-6 42-16C93 9 74 4 55 4c-15 0-30 3-37 8" />
    </svg>
  ),
  projects: (
    <svg className="scribble" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">

      <path pathLength="1" className="s-brick" d="M3 33C22 30 44 34 62 31s25-1 35-3" />
      <path pathLength="1" className="s-brick" d="M6 37C26 34 46 38 65 35s21 0 29-2" />
    </svg>
  ),
  experience: (
    <svg className="scribble" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">

      <path pathLength="1" className="s-ochre"
        d="M56 4C31 3 8 9 7 20c-1 12 23 17 46 16 20-1 40-6 40-16 0-9-14-15-31-17-10-1-20 0-28 2" />
    </svg>
  ),
  contact: (
    <svg className="scribble" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">

      <path pathLength="1" className="s-blue"
        d="M3 34c6-5 12 4 18 0s12-5 18 0 12 4 18 0 12-5 18 0 10 3 14-6" />
    </svg>
  ),
};

export default function NavBar() {
  const logoRef = useRef(null);
  const fire = () => burstFromElement(logoRef.current);

  return (
    <nav className="NavBar">
      <Link to="/" className="logo-link">
        <span
          className="logo"
          ref={logoRef}
          onClick={fire}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fire(); }
          }}
        >
          {site.brand}<span className="dot">.</span>
        </span>
      </Link>

      <ul className="NavBar-links">
        <li><Link to="/#about">About{SCRIBBLES.about}</Link></li>
        <li><Link to="/#projects">Projects{SCRIBBLES.projects}</Link></li>
        <li><Link to="/#experience">Experience{SCRIBBLES.experience}</Link></li>
        <li><Link to="/#contact">Contact{SCRIBBLES.contact}</Link></li>
      </ul>
    </nav>
  );
}
