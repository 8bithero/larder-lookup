import React from 'react';
import { Combobox } from '@headlessui/react';
import { classNames } from '../../utils';

const SearchResultsOptionList = ({ title, items, type, isActive, Icon }) => {
  return (
    <li>
      <h2 className='text-xs font-semibold text-gray-900'>{title}</h2>
      <ul className='-mx-4 mt-2 text-sm text-gray-700'>
        {items.map((item) => (
          <Combobox.Option
            key={item.id}
            value={{ type, item }}
            disabled={isActive({ type, item })}
            className={({ active, disabled }) =>
              classNames(
                'flex cursor-default select-none items-center px-4 py-2',
                active && 'bg-apricot-glow cursor-pointer',
                disabled && 'bg-apricot-glow/50 text-gray-300'
              )
            }
          >
            {({ active }) => (
              <>
                <Icon
                  className={classNames('h-6 w-6 flex-none', active ? 'text-gray-400' : 'text-gray-400')}
                  aria-hidden='true'
                />
                <span className='ml-3 flex-auto truncate'>{item.name}</span>
              </>
            )}
          </Combobox.Option>
        ))}
      </ul>
    </li>
  );
};

export default SearchResultsOptionList;
