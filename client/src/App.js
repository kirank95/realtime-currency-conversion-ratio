import React from 'react';
import {Navbar} from './components'
import Dashboard from './containers/Dashboard';
import './styles/App.css';

/**
* @Component
* App -  main component of the application.
**/
function App() {
  return (
    <>
      <Navbar />
      <Dashboard />
    </>
  );
}

export default App;
