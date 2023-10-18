import React, { Suspense } from 'react';
import Sidebar from '../components/Sidebar';
import NewGroupModal from '../components/NewGroupModal';
import GroupCardHandler from './GroupCardHandler';

const Groups = async () => {
  //

  return (
    <main className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="absolute top-5 right-4">
        <NewGroupModal />
      </div>
      <div className="flex items-center justify-center flex-1 h-screen ml-64">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Suspense fallback={<h1>Loading</h1>}>
            <GroupCardHandler />
          </Suspense>
        </div>
      </div>
    </main>
  );
};

export default Groups;
