import React, { useEffect, useState } from 'react';
import { Combobox } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { ExclamationTriangleIcon, TagIcon, LifebuoyIcon } from '@heroicons/react/24/outline';

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

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Search({ activeFilters, updateActiveFilters }) {
  const [foodItems, setFoodItems] = useState([]);
  const [open, setOpen] = useState(true);
  const [rawQuery, setRawQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  // const query = rawQuery.toLowerCase().replace(/^[#>]/, '');

  // const filteredFoodItems =
  //   rawQuery === '#'
  //     ? foodItems
  //     : query === '' || rawQuery.startsWith('>')
  //     ? []
  //     : foodItems.filter((foodItem) => foodItem.name.toLowerCase().includes(query));

  // const filteredUsers =
  //   rawQuery === '>'
  //     ? users
  //     : query === '' || rawQuery.startsWith('#')
  //     ? []
  //     : users.filter((user) => user.name.toLowerCase().includes(query));

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

  const hasActiveFilter = (obj) => {
    const index = activeFilters.findIndex((element) => JSON.stringify(element) === JSON.stringify(obj));
    return index !== -1;
  };
  const handleChange = (obj) => {
    updateActiveFilters(obj);
  };

  useEffect(() => {
    if (selectedItem) {
      handleChange(selectedItem);
      setOpen(false); // Add this line to close the dropdown
    }
  }, [selectedItem]);

  const loadFoodItems = () => {
    const url = '/api/v1/food_items/index';
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((res) => setFoodItems(res))
      .catch((err) => message.error('Error: ' + err));
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
                <div className='relative'>
                  <MagnifyingGlassIcon
                    className='pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400'
                    aria-hidden='true'
                  />
                  <Combobox.Input
                    className='h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm'
                    placeholder='Search...'
                    onChange={(event) => setRawQuery(event.target.value)}
                  />
                </div>
                <div className='absolute z-50  overflow-hidden w-full rounded-b-xl bg-white shadow-lg'>
                  {open && (filteredFoodItems.length > 0 || filteredUsers.length > 0) && (
                    <Combobox.Options
                      static
                      className='max-h-80 transform-gpu scroll-py-10 scroll-pb-2 space-y-4 overflow-y-auto p-4 pb-2'
                    >
                      {filteredFoodItems.length > 0 && (
                        <li>
                          <h2 className='text-xs font-semibold text-gray-900'>Ingredients</h2>
                          <ul className='-mx-4 mt-2 text-sm text-gray-700'>
                            {filteredFoodItems.map((foodItem) => (
                              <Combobox.Option
                                key={foodItem.id}
                                value={foodItem}
                                disabled={hasActiveFilter(foodItem)}
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
                                      className={classNames(
                                        'h-6 w-6 flex-none',
                                        active ? 'text-white' : 'text-gray-400'
                                      )}
                                      aria-hidden='true'
                                    />
                                    <span className='ml-3 flex-auto truncate'>{foodItem.name}</span>
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
                  )}

                  {rawQuery === '?' && (
                    <div className='px-6 py-14 text-center text-sm sm:px-14'>
                      <LifebuoyIcon className='mx-auto h-6 w-6 text-gray-400' aria-hidden='true' />
                      <p className='mt-4 font-semibold text-gray-900'>Help with searching</p>
                      <p className='mt-2 text-gray-500'>
                        Use this tool to quickly search for users and projects across our entire platform. You can also
                        use the search modifiers found in the footer below to limit the results to just users or
                        projects.
                      </p>
                    </div>
                  )}

                  {query !== '' && rawQuery !== '?' && filteredFoodItems.length === 0 && filteredUsers.length === 0 && (
                    <div className='px-6 py-14 text-center text-sm sm:px-14'>
                      <ExclamationTriangleIcon className='mx-auto h-6 w-6 text-gray-400' aria-hidden='true' />
                      <p className='mt-4 font-semibold text-gray-900'>No results found</p>
                      <p className='mt-2 text-gray-500'>We couldn’t find anything with that term. Please try again.</p>
                    </div>
                  )}
                </div>
                <div className='flex flex-wrap items-center bg-gray-50 px-4 py-2.5 text-xs text-gray-700 rounded-b-xl shadow-2xl '>
                  Type{' '}
                  <kbd
                    className={classNames(
                      'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2',
                      rawQuery.startsWith('#') ? 'border-indigo-600 text-indigo-600' : 'border-gray-400 text-gray-900'
                    )}
                  >
                    #
                  </kbd>{' '}
                  <span className='sm:hidden'>for projects,</span>
                  <span className='hidden sm:inline'>to access projects,</span>
                  <kbd
                    className={classNames(
                      'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2',
                      rawQuery.startsWith('>') ? 'border-indigo-600 text-indigo-600' : 'border-gray-400 text-gray-900'
                    )}
                  >
                    &gt;
                  </kbd>{' '}
                  for users, and{' '}
                  <kbd
                    className={classNames(
                      'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2',
                      rawQuery === '?' ? 'border-indigo-600 text-indigo-600' : 'border-gray-400 text-gray-900'
                    )}
                  >
                    ?
                  </kbd>{' '}
                  for help.
                </div>
              </>
            )}
          </Combobox>
        </div>
      </div>
    </>
  );
}

export default Search;
