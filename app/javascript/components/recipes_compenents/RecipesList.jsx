import React from "react";
import RecipeCard from "./RecipeCard";
function RecipesList({ recipes }) {
  return (
    <ul role='list' className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {recipes.map((recipe) => (
        <div key={recipe.id} className='auto-rows-auto'>
          <RecipeCard recipe={recipe} />
        </div>
      ))}
    </ul>
  );
}

export default RecipesList;
