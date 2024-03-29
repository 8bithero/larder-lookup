import React, { useEffect, useState } from 'react';
import { Combobox } from '@headlessui/react';

import { fetchData } from '../utils';
import {
  SearchInput,
  SearchResults,
  SearchNoResultsSection,
  SearchHelpSection,
  SearchModifiers,
} from './search_components';

const users = [
  {
    id: 1,
    name: 'Leslie Alexander',
    url: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 2,
    name: 'Joe Alexander',
    url: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

const presets = [
  {
    id: 'top_rated_100',
    text: 'Top 100 rated recipes',
  },
  {
    id: 'quick_meals',
    text: 'Quick Meals: Less than 35 minutes',
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Search({ foodItemFilters, presetFilters, activeFilters, updateActiveFilters }) {
  const [foodItems, setFoodItems] = useState([]);
  // const [open, setOpen] = useState(true);
  const [rawQuery, setRawQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const SPECIAL_CHARS = ['#', '>', '@'];
  const specialCharRegex = new RegExp(`^[${SPECIAL_CHARS.join('')}]`);
  const query = rawQuery.toLowerCase().replace(specialCharRegex, '');

  function filterItems(items, specialChar) {
    const otherSpecialChars = SPECIAL_CHARS.filter((char) => char !== specialChar);
    return rawQuery === specialChar
      ? items
      : query === '' || otherSpecialChars.some((char) => rawQuery.startsWith(char))
      ? []
      : items.filter((item) => item.name.toLowerCase().includes(query));
  }

  const filteredFoodItems = filterItems(foodItems, '#');
  const filteredUsers = filterItems(users, '>');

  const shouldShowNoResults = () => {
    return query !== '' && rawQuery !== '?' && filteredFoodItems.length === 0 && filteredUsers.length === 0;
  };

  const shouldShowResults = (open) => {
    return open && (filteredFoodItems.length > 0 || filteredUsers.length > 0);
  };

  const isFilterActive = (obj) => {
    return activeFilters.some((item) => item.id === obj.id);
  };

  const handleChange = (obj) => {
    updateActiveFilters(obj);
  };

  useEffect(() => {
    if (selectedItem) {
      handleChange(selectedItem);
      // setOpen(false);
    }
  }, [selectedItem]);

  const loadFoodItems = () => {
    fetchData('food_items', null, setFoodItems);
  };

  useEffect(() => {
    loadFoodItems();
  }, []);

  return (
    <>
      <div className='relative z-10'>
        <div className='mx-auto max-w-xl transform divide-y divide-gray-100  rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all'>
          <Combobox value={selectedItem} onChange={setSelectedItem}>
            {({ open }) => (
              <>
                <SearchInput setRawQuery={setRawQuery} />
                <div className='absolute z-50 overflow-hidden w-full rounded-b-xl bg-white shadow-lg'>
                  {shouldShowResults(open) && (
                    <SearchResults
                      filteredFoodItems={filteredFoodItems}
                      filteredUsers={filteredUsers}
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
