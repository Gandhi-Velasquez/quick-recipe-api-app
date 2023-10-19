import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../utils/api';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/recipes');
        const data = await response.data;
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="card-container">
      {recipes.map((recipe, index) => (
        <Link 
          to={`/recipes/${index}`} 
          state={{ recipe: recipe }}
          className="card"
          key={index}
        >
          <img src={recipe.img} alt={recipe.title} />
          <p>{recipe.title}</p>
        </Link>


      ))}
    </div>
  );
};

export default RecipeList;
