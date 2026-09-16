import { useCallback, useState } from "react";
import { initialUsers } from "./data/users";

import SearchInput from "./components/SearchInput";
import UserList from "./components/UserList";
import ActiveUsersCounter from "./components/ActiveUsersCounter";

export default function App() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");

  function handleSearch(value) {
    setSearch(value);
  }

  const handleToggle = useCallback((userId) => {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === userId
          ? { ...user, active: !user.active }
          : user
      )
    );
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="container">
      <header>
        <h1>Team Members</h1>
        <p>
          Search team members and manage their active status.
        </p>
      </header>

      <SearchInput
        search={search}
        onSearch={handleSearch}
      />

      <ActiveUsersCounter users={users} />

      <UserList
        users={filteredUsers}
        onToggle={handleToggle}
      />
    </main>
  );
}