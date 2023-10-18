'use client';

import React from 'react';
import GroupCard from '../components/GroupCard';
import { useEffect } from 'react';
import { useGlobalContext } from '../Context/data';

const GroupCardHandler = () => {
  const { groups, rights, setGroups, refetch } = useGlobalContext();

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      {groups?.map(group => (
        <GroupCard
          name={group.name}
          groupRights={group.rights}
          id={group.id}
          rights={rights}
          key={group.id}
        />
      ))}
    </>
  );
};

export default GroupCardHandler;
