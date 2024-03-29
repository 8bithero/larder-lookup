import React from 'react';
import { Combobox } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

const SearchInput = ({ setRawQuery }) => {
  return (
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
  );
};

export default SearchInput;
