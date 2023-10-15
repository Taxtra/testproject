import React from 'react';
import Sidebar from '../components/Sidebar';
import RightCard from '../components/RightCard';
import NewRightModal from '../components/NewRightModal';

const getRights = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/getRights`, {
    cache: 'no-store',
  });

  if (!res.ok) return;

  const rights = await res?.json();
  return rights;
};

const Rights = async () => {
  const rights = await getRights();

  return (
    <main className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="absolute top-5 right-4">
        <NewRightModal />
      </div>
      <div className="flex items-center justify-center flex-1 h-screen ml-64">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rights.map(right => (
            <RightCard name={right.name} id={right.id} key={right.id} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Rights;
