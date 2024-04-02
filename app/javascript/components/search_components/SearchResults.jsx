import React from 'react';
import { Combobox } from '@headlessui/react';
import { TagIcon, BoltIcon } from '@heroicons/react/24/outline';
import SearchResultsOptionList from './SearchResultsOptionList';

const SearchResults = ({ filteredFoodItems, filteredPresets, isFilterActive }) => {
  return (
    <Combobox.Options
      static
      className='max-h-80 transform-gpu scroll-py-10 scroll-pb-2 space-y-4 overflow-y-auto p-4 pb-2'
    >
      {filteredFoodItems.length > 0 &&
        <SearchResultsOptionList
          title={'Ingredients'}
          items={filteredFoodItems}
          type={'foodItem'}
          isActive={isFilterActive}
          Icon={TagIcon}
        />
        }
      {filteredPresets.length > 0 &&
        <SearchResultsOptionList
          title={'Presets'}
          items={filteredPresets}
          type={'preset'}
          isActive={isFilterActive}
          Icon={BoltIcon}
        />
        }
    </Combobox.Options>
  );
};

export default SearchResults;
