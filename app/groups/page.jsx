import React from 'react';
import Sidebar from '../components/Sidebar';
import GroupCard from '../components/GroupCard';
import NewGroupModal from '../components/NewGroupModal';

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

    const rights = await res.json();
    return rights;
  } catch (err) {
    console.error(err);
  }
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
          {groups?.map(group => (
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
