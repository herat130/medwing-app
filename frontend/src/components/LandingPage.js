import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/App.scss';

/**
 * below component it just application landing page
 */
export default function LandingPage({ props }) {
  return (
    <div className="App">
      <header className="App-header">
        <p>Welcome , Search your places</p>
        <Link className="launch-app" to={'/findplaces'}>
          Search Places
        </Link>
      </header>
    </div>
  );
}
