import React from 'react';
import Sidebar from '../components/Sidebar';
import GroupCard from '../components/GroupCard';
import NewGroupModal from '../components/NewGroupModal';

const getGroups = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/getGroups`, {
    cache: 'no-store',
  });
  if (!res.ok) return;

  const groups = await res?.json();
  return groups;
};

const getRights = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/getRights`, {
    cache: 'no-store',
  });
  if (!res.ok) return;

  const rights = await res.json();
  return rights;
};

const Groups = async () => {
  const groups = await getGroups();
  const rights = await getRights();

  return (
    <main className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="absolute top-5 right-4">
        <NewGroupModal rights={rights} />
      </div>
      <div className="flex items-center justify-center flex-1 h-screen ml-64">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map(group => (
            <GroupCard
              name={group.name}
              groupRights={group.rights}
              id={group.id}
              rights={rights}
              key={group.id}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Groups;
