import React from 'react';
import { Combobox } from '@headlessui/react';
import { TagIcon } from '@heroicons/react/24/outline';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

  // const hasActiveFilter = (activeFilters, obj) => {
  //   return activeFilters.some((item) => item.id === obj.id);
  // };

const SearchResults = ({ filteredFoodItems, filteredUsers, isFilterActive }) => {
  return (
    <Combobox.Options
      static
      className='max-h-80 transform-gpu scroll-py-10 scroll-pb-2 space-y-4 overflow-y-auto p-4 pb-2'
    >
      {filteredFoodItems.length > 0 && (
        <li>
          <h2 className='text-xs font-semibold text-gray-900'>Ingredients</h2>
          <ul className='-mx-4 mt-2 text-sm text-gray-700'>
            {filteredFoodItems.map((item) => (
              <Combobox.Option
                key={item.id}
                value={item}
                disabled={isFilterActive(item)}
                className={({ active, disabled }) =>
                  classNames(
                    'flex cursor-default select-none items-center px-4 py-2',
                    active && 'bg-indigo-600 text-white',
                    disabled && 'bg-gray-100 text-gray-300'
                  )
                }
              >
                {({ active }) => (
                  <>
                    <TagIcon
                      className={classNames('h-6 w-6 flex-none', active ? 'text-white' : 'text-gray-400')}
                      aria-hidden='true'
                    />
                    <span className='ml-3 flex-auto truncate'>{item.name}</span>
                  </>
                )}
              </Combobox.Option>
            ))}
          </ul>
        </li>
      )}
      {filteredUsers.length > 0 && (
        <li>
          <h2 className='text-xs font-semibold text-gray-900'>Users</h2>
          <ul className='-mx-4 mt-2 text-sm text-gray-700'>
            {filteredUsers.map((user) => (
              <Combobox.Option
                key={user.id}
                value={user}
                className={({ active }) =>
                  classNames(
                    'flex cursor-default select-none items-center px-4 py-2',
                    active && 'bg-indigo-600 text-white'
                  )
                }
              >
                <img src={user.imageUrl} alt='' className='h-6 w-6 flex-none rounded-full' />
                <span className='ml-3 flex-auto truncate'>{user.name}</span>
              </Combobox.Option>
            ))}
          </ul>
        </li>
      )}
    </Combobox.Options>
  );
};

export default SearchResults;
