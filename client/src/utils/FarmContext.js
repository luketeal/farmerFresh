import React, { createContext, useContext, useState } from 'react';

// Initialize new context for students
const FarmContext = createContext();

// We create a custom hook to provide immediate usage of the student context value (students) in other components
export const useFarmContext = () => useContext(FarmContext);

// The provider is responsible for holding our state, updating the state, and persisting values to the children
export const FarmProvider = ({ children }) => {
  const [search, setSearch] = useState();
  const [farmId, setFarmId] = useState();

  const searchFarm = (id) => {
    // Check if the user forgot to enter a name
    if (!id) {
      return;
    }

    // Update state with the search array with the newStudent
    setFarmId(id);
  };

  // Function to seat a student
  const searchFarms = (searchState) => {
    // Check if the user forgot to enter a name
    if (!searchState) {
      return;
    }

    // Update state with the search array with the newStudent
    setSearch(searchState);
  };

  // The value prop expects an initial state object
  return (
    <FarmContext.Provider
      value={{ search, searchFarms, farmId, searchFarm }}
    >
      {/* We render children in our component so that any descendent can access the value from the provider */}
      {children}
    </FarmContext.Provider>
  );
};
