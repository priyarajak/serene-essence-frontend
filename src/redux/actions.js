export const addToCart = (product) => ({
    type: 'ADD_TO_CART',
    payload: product,
  });
  
export const removeFromCart = (product) => ({
    type: 'REMOVE_FROM_CART',
    payload: product
  });

export const setUser = (user) => ({
    type: 'SET_USER',
    payload: user,
  });
  