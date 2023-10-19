import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RecipeList from './views/RecipesList';
import Recipe from './views/Recipe';

function App() {
  return (
    <Router>
      <main>
        <Link to="/">
          <h1>Recipe List</h1>
        </Link>
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipes/:id" element={<Recipe />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

