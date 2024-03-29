import React from 'react';
import { LifebuoyIcon } from '@heroicons/react/24/outline';

const SearchHelpSection = () => {
  return (
    <div className='absolute z-50 overflow-hidden w-full rounded-b-xl bg-white shadow-lg'>
      <div className='px-6 py-14 text-center text-sm sm:px-14'>
        <LifebuoyIcon className='mx-auto h-6 w-6 text-gray-400' aria-hidden='true' />
        <p className='mt-4 font-semibold text-gray-900'>Help with searching</p>
        <p className='mt-2 text-gray-500'>
          Use this tool to quickly search for users and projects across our entire platform. You can also use the search
          modifiers found in the footer below to limit the results to just users or projects.
        </p>
      </div>
    </div>
  );
};

export default SearchHelpSection;
