import { useCallback, useState, useEffect } from "react";
import {
  getUsers,
  searchUsers,
  updateUserStatus,
} from "./api/usersApi";
import { initialUsers } from "./data/users";
import Dashboard from "./components/Dashboard";
import SearchInput from "./components/SearchInput";
import UserList from "./components/UserList";
import ActiveUsersCounter from "./components/ActiveUsersCounter";
import OnlineStatus from "./components/OnlineStatus";



export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [showDashboard, setShowDashboard] = useState(true);




  function fetchUsers() {
    setLoading(true);
    setError(null);

    getUsers()
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }

  //use effect to fetch users from the API when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

   //use effect to search users when the search state changes
  function handleSearch(value) {
    setSearch(value);
  }

  const handleToggle = useCallback((userId) => {
  const user = users.find((user) => user.id === userId);

  if (!user) {
    return;
  }

  const previousStatus = user.active;
  const newStatus = !previousStatus;

  // 1. Optimistically update UI
  setUsers((currentUsers) =>
    currentUsers.map((user) =>
      user.id === userId
        ? { ...user, active: newStatus }
        : user
    )
  );

  // 2. Send API request
  updateUserStatus(userId, newStatus)
    .then(() => {
      console.log("Status update successful");
    })
    .catch((error) => {
      console.error(error);

      // 3. Rollback
      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === userId
            ? { ...user, active: previousStatus }
            : user
        )
      );
    });
}, [users]);

  useEffect(() => {
  if (!search.trim()) {
    setUsers(initialUsers);
    return;
  }

  const controller = new AbortController();

  console.log("Search request started:", search);

  searchUsers(search, controller.signal)
    .then((data) => {
      console.log("Search request completed:", search);

      setUsers(data);
    })
    .catch((error) => {
      if (error.name === "AbortError") {
        console.log("Search request aborted:", search);
        return;
      }

      console.error(error);
    });

  return () => {
    console.log("Aborting request:", search);

    controller.abort();
  };
}, [search]);
 const filteredUsers = users;

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return (
      <div>
        <p>Unable to load users.</p>
        <button onClick={fetchUsers}>Try Again</button>
      </div>
    );
  }

  if (users.length === 0) {
    return <p>No team members found.</p>;
  }


  return (
    <main className="container">
      <header>
        <h1>Team Members</h1>
        <p>
          Search team members and manage their active status.
        </p>
        <button onClick={() => setShowDashboard(false)}>
          Remove Dashboard
        </button>

        {showDashboard && <Dashboard />}
        
        <div>
          <OnlineStatus />
        </div>
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