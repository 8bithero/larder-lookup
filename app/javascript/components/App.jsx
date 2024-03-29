import React, { useEffect, useState } from "react";
import Search from "./Search";
import RecipeCard from "./RecipeCard";
import { fetchData } from "../utils";


function App() {
  const [count, setCount] = useState(0);
  const [recipes, setRecipes] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);
  // const [foodItemFilters, setFoodItemFilters] = useState({ 'foodItems': [], 'presets': [] });
  const [foodItemFilters, setFoodItemFilters] = useState([]);
  const [presetFilters, setPresetFilters] = useState([]);

  const updateActiveFilters = (obj) => {
    const newActiveFilters = [...activeFilters];
    const index = activeFilters.findIndex((element) => JSON.stringify(element) === JSON.stringify(obj));

    index !== -1 ? newActiveFilters.splice(index, 1) : newActiveFilters.push(obj);

    setActiveFilters(newActiveFilters);
  }

  const loadFilteredRecipes = () => {
    const filters = {
      food_item_ids: activeFilters.map((item) => item.id),
      presets: presetFilters,
    };

    fetchData('recipes', filters, setRecipes);
  };

  useEffect(() => {
      loadFilteredRecipes();
  }, []);

  useEffect(() => {
    loadFilteredRecipes();
  }, [activeFilters, foodItemFilters, presetFilters]);

  const allRecipes = (
    <ul role='list' className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {recipes.map((recipe) => (
        <div key={recipe.id} className='auto-rows-auto'>
          <RecipeCard recipe={recipe} />
        </div>
      ))}
    </ul>
  );

  const renderActiveFilters = activeFilters.map((filter, index) => (
    <span
      key={index}
      className='inline-flex items-center gap-x-0.5 rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10'
    >
      {filter.name}
      <button
        type='button'
        className='group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-gray-500/20'
        onClick={() => updateActiveFilters(filter)}
      >
        <span className='sr-only'>Remove</span>
        <svg viewBox='0 0 14 14' className='h-3.5 w-3.5 stroke-gray-600/50 group-hover:stroke-gray-600/75'>
          <path d='M4 4l6 6m0-6l-6 6' />
        </svg>
        <span className='absolute -inset-1' />
      </button>
    </span>
  ));

  const noRecipe = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No recipes yet.
      </h4>
    </div>
  );

  return (
    <>
      <div className='bg-gray-100'>
        <p>You clicked {count} times!</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>
      </div>
      <hr />
      <h1 className='text-6xl	font-madeMirage font-bold text-center'>Larder Lookup</h1>
      <div className='mt-8 mb-12'>
        <Search activeFilters={activeFilters} updateActiveFilters={updateActiveFilters} />
      </div>
      <div>{activeFilters.length > 0 ? renderActiveFilters : null}</div>

      <div className=''>{recipes.length > 0 ? allRecipes : noRecipe}</div>
    </>
  );
}

export default App;
