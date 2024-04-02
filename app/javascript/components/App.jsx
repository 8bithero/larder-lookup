import React, { useEffect, useState, useCallback } from 'react';
import Search from "./Search";
import { useApi, useFilters } from '../hooks';
import FilterTags from "./FilterTags";
import logo from '../images/logo.png';
import Content from './Content';

function App() {
  const { buildPayload, fetchData, isLoading } = useApi();
  const { foodItemFilters, presetFilters, updateFilters } = useFilters();
  const [recipes, setRecipes] = useState([]);

  const loadFilteredRecipes = useCallback(() => {
    const filters = {
      ...buildPayload('food_item_ids', foodItemFilters),
      ...buildPayload('presets', presetFilters),
    };

    fetchData('recipes', filters, setRecipes);
  }, [foodItemFilters, presetFilters]);

  const hasFilters = () => foodItemFilters.length === 0 && presetFilters.length === 0;

  useEffect(() => {
    hasFilters() ? setRecipes([]) : loadFilteredRecipes();
  }, [foodItemFilters, presetFilters]);

  return (
    <>
      <div className='bg-peach-sorbet'>
        <div className='relative mx-auto max-w-8xl sm:px-2 lg:px-8 xl:px-12'>
          <div className='px-4 flex justify-center'>
            <div className='flex items-center gap-4'>
              <div className='flex-shrink-0'>
                <img src={logo} alt='Logo' />
              </div>
              <h1 className='text-6xl font-pacifico'>Larder Lookup</h1>
            </div>
          </div>

          <div className='px-4 mt-4 mb-12 pb-16'>
            <Search foodItemFilters={foodItemFilters} presetFilters={presetFilters} updateFilters={updateFilters} />
          </div>
        </div>
      </div>

      <div className='bg-peach-cream'>
        <div className='container relative mx-auto max-w-8xl sm:px-2 lg:px-8 xl:px-12'>
          <div className='px-4'>
            <div className='mb-6 flex gap-x-1'>
              <FilterTags type={'foodItem'} filters={foodItemFilters} onUpdate={updateFilters} />
              <FilterTags type={'preset'} filters={presetFilters} onUpdate={updateFilters} />
            </div>
            <Content recipes={recipes} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </>
  );

}

export default App;
