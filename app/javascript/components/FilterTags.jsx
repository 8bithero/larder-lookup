import React from 'react';

function FilterTags({ type, filters, onUpdate }) {
  if (filters.length === 0) {
    return null;
  }

  return (
    <>
      {filters.map((filter, index) => (
        <span
          key={index}
          className='inline-flex items-center gap-x-0.5 rounded-md bg-charcoal-slate px-4 py-3 text-md font-medium text-white ring-1 ring-inset ring-gray-500/10'
        >
          {filter.name}
          <button
            type='button'
            className='group relative -mr-1 h-5 w-5 rounded-sm hover:bg-white/20'
            onClick={() => onUpdate({ type: type, item: filter })}
          >
            <span className='sr-only'>Remove</span>
            <svg viewBox='0 0 14 14' className='h-5 w-5 stroke-white/50 group-hover:stroke-white/75'>
              <path d='M4 4l6 6m0-6l-6 6' />
            </svg>
            <span className='absolute -inset-1' />
          </button>
        </span>
      ))}
    </>
  );
}

export default FilterTags;
