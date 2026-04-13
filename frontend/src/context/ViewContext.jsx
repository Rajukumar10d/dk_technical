import React, { createContext, useContext, useState } from 'react';

const ViewContext = createContext();

export const ViewProvider = ({ children }) => {
  const [is3D, setIs3D] = useState(false);
  const toggleView = () => setIs3D(!is3D);

  return (
    <ViewContext.Provider value={{ is3D, toggleView }}>
      {children}
    </ViewContext.Provider>
  );
};

export const useView = () => useContext(ViewContext);
