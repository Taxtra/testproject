'use client';

import React from 'react';
import RightCard from '../components/RightCard';
import { useEffect } from 'react';
import { useGlobalContext } from '../Context/data';
import LoadingSkeleton from '../components/LoadingSkeleton';

const RightCardHandler = () => {
  const { rights, refetch } = useGlobalContext();

  useEffect(() => {
    refetch();
  }, []);

  if (rights.length != 0) {
    return (
      <>
        {rights?.map(right => (
          <RightCard name={right.name} id={right.id} key={right.id} />
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

export default RightCardHandler;
