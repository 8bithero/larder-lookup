import { useState } from 'react';
import { updateObjectArray } from '../utils';

const useFilters = () => {
  const [foodItemFilters, setFoodItemFilters] = useState([]);
  const [presetFilters, setPresetFilters] = useState([]);

  const updateFilters = ({ type, item }) => {
    const mapTypeToState = {
      foodItem: setFoodItemFilters,
      preset: setPresetFilters,
    };

    const setFilters = mapTypeToState[type];

    if (setFilters) {
      setFilters((prevFilters) => updateObjectArray(prevFilters, item));
    } else {
      console.warn(`Unknown filter type: ${type}`);
    }
  };

  return { foodItemFilters, presetFilters, updateFilters };
};

export default useFilters;
