import React, { useEffect, useState } from 'react';
import { Combobox } from '@headlessui/react';
import { useApi } from '../hooks';
import { filterItems, SPECIAL_CHARS } from '../utils';
import {
  SearchInput,
  SearchResults,
  SearchNoResultsSection,
  SearchHelpSection,
  SearchModifiers,
} from './search_components';

const presets = [
  {
    id: 'top_100_rated',
    name: '100 Top Rated Recipes',
  },
  {
    id: 'quick_meals',
    name: 'Quick Meals: Less than 35 minutes',
  },
];

function Search({ foodItemFilters, presetFilters, updateFilters }) {
  const { fetchData } = useApi();
  const [foodItems, setFoodItems] = useState([]);
  const [rawQuery, setRawQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const specialCharRegex = new RegExp(`^[${SPECIAL_CHARS.join('')}]`);
  const query = rawQuery.toLowerCase().replace(specialCharRegex, '');

  const filteredFoodItems = filterItems(rawQuery, foodItems, '#', query);
  const filteredPresets = filterItems(rawQuery, presets, '>', query);

  const shouldShowNoResults = () => {
    return query !== '' && rawQuery !== '?' && filteredFoodItems.length === 0 && filteredPresets.length === 0;
  };

  const shouldShowResults = (open) => {
    return open && (filteredFoodItems.length > 0 || filteredPresets.length > 0);
  };

  const isFilterActive = ({ type, item }) => {
    const activeFilters = type === 'foodItem' ? foodItemFilters : presetFilters;
    return activeFilters.some((filter) => filter.id === item.id);
  };

  useEffect(() => {
    if (selectedItem) {
      updateFilters(selectedItem);
    }
  }, [selectedItem]);

  const loadFoodItems = async (searchQuery) => {
    fetchData('food_items', { q: searchQuery }, setFoodItems);
  };

  useEffect(() => {
    if (query.length >= 3) {
      const handler = setTimeout(() => {
        loadFoodItems(query);
      }, 300);

      return () => {
        clearTimeout(handler);
      };
    }

  }, [query]);

  return (
    <>
      <div className='relative z-10'>
        <div className='mx-auto max-w-xl transform divide-y divide-gray-100  rounded-xl bg-soft-alabaster shadow-2xl ring-1 ring-stone-500 ring-opacity-5 transition-all'>
          <Combobox value={selectedItem} onChange={setSelectedItem}>
            {({ open }) => (
              <>
                <SearchInput setRawQuery={setRawQuery} />
                <div className='absolute z-50 overflow-hidden w-full rounded-b-xl bg-soft-alabaster shadow-lg'>
                  {shouldShowResults(open) && (
                    <SearchResults
                      filteredFoodItems={filteredFoodItems}
                      filteredPresets={filteredPresets}
                      isFilterActive={isFilterActive}
                    />
                  )}
                  {rawQuery === '?' && <SearchHelpSection />}
                  {shouldShowNoResults() && <SearchNoResultsSection />}
                </div>
                <SearchModifiers rawQuery={rawQuery} />
              </>
            )}
          </Combobox>
        </div>
      </div>
    </>
  );
}

export default Search;
