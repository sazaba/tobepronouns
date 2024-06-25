import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './Nav';
import Quiz from './Quiz';
import Results from './Results'; // Asegúrate de importar el componente Results.jsx
import Timeout from './Timeout';


function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          <Route exact path="/" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
          <Route path="/timeout" element={<Timeout />} />

        </Routes>
      </div>
    </Router>
  );

}

export default App;
