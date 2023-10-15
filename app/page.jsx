import Sidebar from './components/Sidebar';
import UserCard from './components/UserCard';
import NewUserModal from './components/NewUserModal';

const getUsers = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/getUser`, {
    cache: 'no-store',
  });

  const users = await res?.json();
  return users;
};

const getGroups = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/getGroups`, {
    cache: 'no-store',
  });

  const groups = await res?.json();
  return groups;
};

const getRights = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/getRights`, {
    cache: 'no-store',
  });

  const rights = await res?.json();
  return rights;
};

export default async function Home() {
  const users = await getUsers();
  const groups = await getGroups();
  const rights = await getRights();

  return (
    <main className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="absolute top-5 right-4">
        <NewUserModal groups={groups} rights={rights} />
      </div>
      <div className="flex items-center justify-center flex-1 h-screen ml-64">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map(user => (
            <UserCard
              key={user.id}
              name={user.username}
              userRights={user.rights}
              id={user.id}
              group={groups.find(group => group.id === user.groupId)}
              groups={groups}
              rights={rights}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
