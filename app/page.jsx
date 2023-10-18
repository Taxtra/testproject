import Sidebar from './components/Sidebar';
import NewUserModal from './components/NewUserModal';
import UserCardHandler from './UserCardHandler';

export default async function Home() {
  return (
    <main className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="absolute top-5 right-4">
        <NewUserModal />
      </div>
      <div className="flex items-center justify-center flex-1 h-screen ml-64">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <UserCardHandler />
        </div>
      </div>
    </main>
  );
}
