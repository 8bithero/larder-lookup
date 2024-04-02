import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { decimalToFractions } from '../../utils';

function RecipeCard({ recipe }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleIngredients = () => setIsExpanded(!isExpanded);

  return (
    <li
      key={recipe.id}
      className='col-span-1 flex flex-col divide-y divide-peach-cream rounded-lg bg-ivory-silk text-center shadow overflow-hidden relative'
    >
      <div className='flex flex-1 flex-col p-8'>
        <img
          className='mx-auto h-48 w-48 flex-shrink-0 rounded-full ring-2 ring-peach-cream'
          src={recipe.image_url}
          alt=''
        />
        <h3 className='mt-6 text-md font-madeMirage font-bold text-gray-900'>{recipe.title}</h3>
        <dl className='mt-1 flex flex-grow flex-col justify-between'>
          <dt className='sr-only'>Title</dt>
          <dd className='text-sm text-gray-500'>{recipe.author}</dd>
        </dl>
      </div>
      <div>
        <div className='-mt-px flex divide-x divide-peach-cream'>
          <div className='flex w-0 flex-1'>
            <div className='relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-3 text-sm font-semibold text-gray-900'>
              <div className='flex flex-col items-center'>
                <span className='text-gray-700 text-lg font-bold'>{recipe.cook_time}</span>
                <span className='leading-6 text-gray-400 text-sm'>Cook</span>
              </div>
            </div>
          </div>
          <div className='-ml-px flex w-0 flex-1'>
            <div className='relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-3 text-sm font-semibold text-gray-900'>
              <div className='flex flex-col items-center'>
                <span className='text-gray-700 text-lg font-bold'>{recipe.prep_time}</span>
                <span className='leading-6 text-gray-400 text-sm'>Prep</span>
              </div>
            </div>
          </div>
          <div className='-ml-px flex w-0 flex-1'>
            <div className='relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-3 text-sm font-semibold text-gray-900'>
              <div className='flex flex-col items-center'>
                <span className='text-gray-700 text-lg font-bold'>{recipe.rating}</span>
                <span className='leading-6 text-gray-400 text-sm'>Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        onClick={toggleIngredients}
        className={`transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-screen' : 'max-h-60'
        } relative cursor-pointer`}
      >
        <dl className={`divide-y divide-gray-100 px-6 py-4 text-sm leading-6`}>
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index} className='flex justify-between gap-x-4 py-3'>
              <dt className='text-gray-500'>{ingredient.name}</dt>
              <dd className='flex items-start gap-x-2'>
                <div className='font-medium text-gray-900'>{decimalToFractions(ingredient.amount)}</div>
                <div className='unit-label text-gray-600 bg-gray-50 ring-peach-cream rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset'>
                  {ingredient.unit}
                </div>
              </dd>
            </div>
          ))}
        </dl>
        {!isExpanded && recipe.ingredients.length > 5 && (
          <>
            <div className='absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent'></div>
            <div className='absolute bottom-0 left-0 right-0 flex justify-center items-center pb-2'>
              <ChevronDownIcon className='h-5 w-5 text-gray-500' aria-hidden='true' />
            </div>
          </>
        )}
      </div>
    </li>
  );
}

export default RecipeCard;
