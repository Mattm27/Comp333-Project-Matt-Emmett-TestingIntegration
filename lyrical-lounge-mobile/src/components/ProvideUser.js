import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

//chat gpt essentially wrote this whole file it uses the context api to basically store the user and allows us to log the user out

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState('');

  const loginUser = (username) => {
    setUser(username);
  };

  const logoutUser = () => {
    setUser('');
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
