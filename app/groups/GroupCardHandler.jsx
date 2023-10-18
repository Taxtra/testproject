'use client';

import React from 'react';
import GroupCard from '../components/GroupCard';
import { useEffect } from 'react';
import { useGlobalContext } from '../Context/data';
import LoadingSkeleton from '../components/LoadingSkeleton';

const GroupCardHandler = () => {
  const { groups, rights, refetch } = useGlobalContext();

  useEffect(() => {
    if (groups.length === 0) refetch();
  }, []);

  if (groups.length !== 0) {
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
