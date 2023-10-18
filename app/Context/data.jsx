'use client';

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from 'react';

const getUsers = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/getUser`,
      {
        cache: 'no-store',
      }
    );

    const users = await res?.json();
    return users;
  } catch (err) {
    console.error(err);
  }
};

const getGroups = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/getGroups`,
      {
        cache: 'no-store',
      }
    );

    const groups = await res?.json();
    return groups;
  } catch (err) {
    console.error(err);
  }
};

const getRights = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/getRights`,
      {
        cache: 'no-store',
      }
    );

    const rights = await res?.json();
    return rights;
  } catch (err) {
    console.error(err);
  }
};

const GlobalContext = createContext({
  user: '',
  groups: '',
  rights: '',
});

export const GlobalContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [rights, setRights] = useState([]);

  const refetch = async () => {
    const fetchedUsers = await getUsers();
    const fetchedGroups = await getGroups();
    const fetchedRights = await getRights();
    setUsers(fetchedUsers);
    setGroups(fetchedGroups);
    setRights(fetchedRights);
  };

  return (
    <GlobalContext.Provider
      value={{
        users,
        setUsers,
        groups,
        setGroups,
        rights,
        setRights,
        refetch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
