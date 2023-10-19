import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { api } from '../utils/api';
import '../styles/recipe.css';

const Recipe = () => {
  const location = useLocation();
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const url = location.state.recipe.url
        const response = await api.get(`/recipes/${id}?url=${url}`);
        const data = await response.data;
        const updatedRecipe = {
            ...location.state.recipe,
            ingredients: data.ingredients,
          };
  
        setRecipe(updatedRecipe);
      } catch (error) {
        console.error('Error fetching recipe data:', error);
      }
    };

    fetchRecipe();

  }, [id]);

  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
    <div className="recipe-card">
        <div className='recipe-card-content'>
            <img src={recipe.img} alt={recipe.title} />
            <h2>{recipe.title}</h2>
            <ul>
                {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient.trim()}</li>
                ))}
            </ul>
        </div>
      {/* Add more details as needed */}
    </div>
  );
  
};

export default Recipe;
