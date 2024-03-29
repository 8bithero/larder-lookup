import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const SearchNoResultsSection = () => {
  return (
    <div className='px-6 py-14 text-center text-sm sm:px-14'>
      <ExclamationTriangleIcon className='mx-auto h-6 w-6 text-gray-400' aria-hidden='true' />
      <p className='mt-4 font-semibold text-gray-900'>No results found</p>
      <p className='mt-2 text-gray-500'>We couldn’t find anything with that term. Please try again.</p>
    </div>
  );
};

export default SearchNoResultsSection;
