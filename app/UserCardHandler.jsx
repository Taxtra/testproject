'use client';

import React from 'react';
import UserCard from './components/UserCard';
import { useEffect } from 'react';
import { useGlobalContext } from './Context/data';
import LoadingSkeleton from './components/LoadingSkeleton';

const GroupCardHandler = () => {
  const { groups, rights, users, setGroups, refetch } = useGlobalContext();

  useEffect(() => {
    refetch();
  }, []);

  if (users.length !== 0) {
    return (
      <>
        {users?.map(user => (
          <UserCard
            key={user.id}
            name={user.username}
            userRights={user.rights}
            id={user.id}
            group={groups?.find(group => group.id === user.groupId)}
            groups={groups}
            rights={rights}
          />
        ))}
      </>
    );
  } else {
    return (
      <>
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
      </>
    );
  }
};

export default GroupCardHandler;
