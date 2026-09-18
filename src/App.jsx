import { useState, useCallback } from "react";

import Dashboard from "./components/Dashboard";
import SearchInput from "./components/SearchInput";
import UserList from "./components/UserList";
import ActiveUsersCounter from "./components/ActiveUsersCounter";
import OnlineStatus from "./components/OnlineStatus";
import useUsers from "./hooks/useUsers";


export default function App() {
  const [search, setSearch] = useState("");
  const [showDashboard, setShowDashboard] = useState(true);


  //This is for practicing stale closure issue in React. Uncomment the below code to see the effect of stale closure in React.
  // const [count, setCount] = useState(0);

  // useEffect(() => {
  //   console.log("Effect ran with count:", count);
  //   const timer = setTimeout(() => {
  //     console.log("Timer callback count:", count);
  //   }, 5000);

  //   return () => clearTimeout(timer);
  // }, []);

  const {
    users,
    loading,
    error,
    refetch,
    updateUser,
  } = useUsers(search);



  const handleSearch = useCallback((value) => {
    setSearch(value);
  }, []);

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return (
      <div>
        <p>Unable to load users.</p>
        <button onClick={refetch}>Try Again</button>
      </div>
    );
  }

  if (users.length === 0) {
    return <p>No team members found.</p>;
  }


  return (
    <main className="container">
      <header>
        {/* <p>Current count: {count}</p>

        <button onClick={() => setCount(count + 1)}>
          Increment
        </button> */}

        <h1>Team Members</h1>
        <p>
          Search team members and manage their active status.
        </p>
        <button onClick={() => setShowDashboard(prev => !prev)}>
          {showDashboard ? "Remove Dashboard" : "Show Dashboard"}
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
        users={users}
        onToggle={updateUser}
      />
    </main>
  );
}