import React, { useState } from 'react';

const cartContext = React.createContext();

export default cartContext;

export const CartContextProvider = (props) => {
  const [cartState, setCartState] = useState([]);

  return (
    <cartContext.Provider value={[cartState, setCartState]}>
      {props.children}
    </cartContext.Provider>
  );
};
