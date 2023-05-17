import React from 'react';
import MainContainer from './src/containers/MainContainer/MainContainer.jsx';
import Welcome from './src/Welcome.jsx';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

const App = () => (
  <div id='app'>
    <Router>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/add' element={<MainContainer />} />
      </Routes>
    </Router>
  </div>
);

export default App;
