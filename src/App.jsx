import { useCallback, useState, useEffect } from "react";
import { getUsers } from "./api/usersApi";
import { initialUsers } from "./data/users";
import Dashboard from "./components/Dashboard";
import SearchInput from "./components/SearchInput";
import UserList from "./components/UserList";
import ActiveUsersCounter from "./components/ActiveUsersCounter";

function TeamMembers() {
  const [show, setShow] = useState(true);

  return (
    <>
      <button onClick={() => setShow(!show)}>
        Toggle Team Members
      </button>

      {show && <OnlineStatus />}
    </>
  );
}

 function OnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    console.log("EFFECT: adding listeners");

    const handleOnline = () => {
      console.log("ONLINE EVENT");
      setIsOnline(true);
    };

    const handleOffline = () => {
      console.log("OFFLINE EVENT");
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      console.log("CLEANUP: removing listeners");

      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return <h2>{isOnline ? "🟢 Online" : "🔴 Offline"}</h2>;
}

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


  useEffect(() => {
    console.log("Effect executed");
  }, [search]);

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
        <TeamMembers />


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