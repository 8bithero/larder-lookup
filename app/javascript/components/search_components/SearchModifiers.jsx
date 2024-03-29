import React from 'react';

// Assuming classNames is either imported or defined in the same file
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const SearchModifiers = ({ rawQuery }) => {
  return (
    <div className='flex flex-wrap items-center bg-gray-50 px-4 py-2.5 text-xs text-gray-700 rounded-b-xl'>
      Type{' '}
      <kbd
        className={classNames(
          'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2',
          rawQuery.startsWith('#') ? 'border-indigo-600 text-indigo-600' : 'border-gray-400 text-gray-900'
        )}
      >
        #
      </kbd>
      for ingredients,
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
  );
};

export default SearchModifiers;
