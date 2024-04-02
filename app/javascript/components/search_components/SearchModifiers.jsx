import React from 'react';
import { classNames } from '../../utils';

const SearchModifiers = ({ rawQuery }) => {
  return (
    <div className='flex flex-wrap items-center bg-apricot-glow px-4 py-2.5 text-xs text-gray-700 rounded-b-xl'>
      Type{' '}
      <kbd
        className={classNames(
          'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-apricot-glow font-semibold sm:mx-2',
          rawQuery.startsWith('#') ? 'border-charcoal-slate text-charcoal-slate' : 'border-gray-400 text-gray-900'
        )}
      >
        #
      </kbd>
      for ingredients,
      <kbd
        className={classNames(
          'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-apricot-glow font-semibold sm:mx-2',
          rawQuery.startsWith('>') ? 'border-charcoal-slate text-charcoal-slate' : 'border-gray-400 text-gray-900'
        )}
      >
        &gt;
      </kbd>{' '}
      for presets, and{' '}
      <kbd
        className={classNames(
          'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-apricot-glow font-semibold sm:mx-2',
          rawQuery === '?' ? 'border-charcoal-slate text-charcoal-slate' : 'border-gray-400 text-gray-900'
        )}
      >
        ?
      </kbd>{' '}
      for help.
    </div>
  );
};

export default SearchModifiers;
